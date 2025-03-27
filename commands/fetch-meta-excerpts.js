const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const GhostAdminAPI = require('@tryghost/admin-api');
const axios = require('axios');
const cheerio = require('cheerio');

// Debug environment variables
console.log('Environment Variables:');
console.log('NEXT_PUBLIC_GHOST_URL:', process.env.NEXT_PUBLIC_GHOST_URL);
console.log('GHOST_ADMIN_KEY:', process.env.GHOST_ADMIN_KEY);
console.log('Current working directory:', process.cwd());
console.log('Env file path:', path.resolve(process.cwd(), '.env'));

// Add these checks after dotenv config
if (!process.env.NEXT_PUBLIC_GHOST_URL || !process.env.GHOST_ADMIN_KEY) {
  console.error('❌ Required environment variables are missing!');
  console.error('Make sure your .env file exists and contains:');
  console.error('NEXT_PUBLIC_GHOST_URL=your_ghost_url');
  console.error('GHOST_ADMIN_KEY=your_admin_key');
  process.exit(1);
}

console.log("Fetching meta excerpts...", process.env.NEXT_PUBLIC_GHOST_URL);

// Initialize Ghost Admin API
const adminApi = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v5.0'
});

async function fetchMetaDescription(slug) {
  try {
    const url = `https://joy.so/${slug}/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const metaDescription = $('meta[name="description"]').attr('content');

    if (!metaDescription) {
      console.log(`⚠️ No meta description found for ${url}`);
      return null;
    }

    return metaDescription.trim();
  } catch (error) {
    console.error(`Error fetching meta description for ${slug}:`, error.message);
    return null;
  }
}

async function updatePostExcerpt(post, excerpt) {
  try {
    await adminApi.posts.edit({
      id: post.id,
      custom_excerpt: excerpt,
      updated_at: post.updated_at
    });

    console.log(`✅ Updated excerpt for "${post.title}"`);
    return true;
  } catch (error) {
    if (error.type === 'UpdateCollisionError') {
      console.log(`⚠️ Retrying update for "${post.title}" after collision...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return updatePostExcerpt(post, excerpt);
    }
    console.error(`❌ Error updating excerpt for "${post.title}":`, error);
    return false;
  }
}

async function processAllPosts() {
  try {
    // Get all posts using Admin API
    const posts = await adminApi.posts.browse({
      limit: 'all',
      include: ['title', 'excerpt', 'slug']
    });

    console.log(`Found ${posts.length} posts total.`);
    let updatedCount = 0;

    // Process each post
    for (const post of posts) {
      console.log(`Processing post: ${post.title} (${post.slug})`);

        const excerpt = await fetchMetaDescription(post.slug);

        if (excerpt) {
          console.log("Found meta description:", excerpt);
          const success = await updatePostExcerpt(post, excerpt);
          if (success) updatedCount++;
        }

        // Add a delay between requests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`\nProcess completed! Updated ${updatedCount} posts with new excerpts.`);

  } catch (error) {
    console.error('Error processing posts:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.body);
    }
  }
}

// Run the script
processAllPosts().then(() => {
  console.log('Script finished executing.');
});