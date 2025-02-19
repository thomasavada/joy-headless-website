require('dotenv').config({ path: './../.env' });
const GhostAdminAPI = require('@tryghost/admin-api');
const axios = require('axios');
const xml2js = require('xml2js');
const { getPosts, getPages } = require('../lib/ghost');

console.log('Environment Variables:');
console.log('NEXT_PUBLIC_GHOST_URL:', process.env.NEXT_PUBLIC_GHOST_URL);
console.log('GHOST_ADMIN_KEY:', process.env.GHOST_ADMIN_KEY);

// Initialize Ghost Admin API
const adminApi = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v5.0'
});

// Function to fetch and parse sitemap
async function getSitemapUrls() {
  try {
    const response = await axios.get('https://joy.so/post-sitemap.xml');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    // Extract URLs and create a map of slugs
    const urls = result.urlset.url.map(url => {
      const fullUrl = url.loc[0];
      // Extract slug from URL
      const slug = fullUrl.replace('https://joy.so/', '').replace(/\/$/, '');
      return {
        slug,
        lastmod: url.lastmod ? url.lastmod[0] : null
      };
    });

    return urls;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    throw error;
  }
}

// Function to find the best matching post using Ghost search
async function findBestMatch(sitemapSlug) {
  try {
    // Convert slug to search terms by replacing hyphens with spaces
    const searchTerm = sitemapSlug.replace(/-/g, ' ');

    // Search posts using Ghost API by title
    const searchResults = await adminApi.posts.browse({
      limit: 5, // Limit to top 5 matches
      fields: ['id', 'title', 'slug', 'updated_at'],
      filter: `title:~'${searchTerm}'`
    });

    // Log all found matches for debugging
    if (searchResults.length > 0) {
      // console.log('\nPotential matches:');
      searchResults.forEach(post => {
        // console.log(`- "${post.title}" (${post.slug})`);
      });
    }

    return searchResults[0] || null;
  } catch (error) {
    console.error('Error searching for post:', error);
    return null;
  }
}

// Function to update post slug
async function updatePostSlug(post, newSlug) {
  try {
    await adminApi.posts.edit({
      id: post.id,
      slug: newSlug,
      updated_at: post.updated_at
    });
    console.log(`✅ Updated post "${post.title}" slug to "${newSlug}"`);
    return true;
  } catch (error) {
    if (error.type === 'UpdateCollisionError') {
      console.log(`⚠️ Retrying update for "${post.title}" after collision...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return updatePostSlug(post, newSlug);
    }
    console.error(`❌ Error updating post "${post.title}":`, error);
    return false;
  }
}

async function syncSlugs() {
  try {
    // Get all posts and pages
    const [posts, pages] = await Promise.all([
      getPosts(),
      getPages()
    ]);

    // Combine slugs from both posts and pages
    const slugs = [
      ...posts.map(post => post.slug),
      ...pages.map(page => page.slug)
    ];

    // Get all sitemap URLs
    console.log('Fetching sitemap...');
    const sitemapUrls = await getSitemapUrls();
    console.log(`Found ${sitemapUrls.length} URLs in sitemap`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each sitemap URL
    for (const { slug: sitemapSlug } of sitemapUrls) {
      // console.log(`\nSearching for match for: ${sitemapSlug}`);
      const matchingPost = await findBestMatch(sitemapSlug);
      // console.log(matchingPost);
      // if (!matchingPost) {
      //   console.log('No matching post found, skipping...', sitemapSlug);
      //   skippedCount++;
      //   continue;
      // }

      if (matchingPost) {
        console.log(`Found matching post: "${matchingPost.title}" (${matchingPost.slug})`);

        if (matchingPost.slug !== sitemapSlug) {
          console.log(`Updating slug to: ${sitemapSlug}`);
          const success = await updatePostSlug(matchingPost, sitemapSlug);
          if (success) {
            updatedCount++;
          }
        } else {
          console.log('Slug already matches, skipping...');
          skippedCount++;
        }
      } else {
        console.log('No matching post found, skipping...');
        skippedCount++;
      }

      // Add a small delay between operations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\nSync completed!');
    console.log(`Updated ${updatedCount} posts`);
    console.log(`Skipped ${skippedCount} posts (no match or already correct)`);

  } catch (error) {
    console.error('Error syncing slugs:', error);
    if (error.response) {
      console.error('Error details:', error.response.body);
    }
    process.exit(1);
  }
}

// Run the script
syncSlugs().then(() => {
  console.log('Script finished executing.');
});
