require('dotenv').config({ path: './../.env' });
const GhostAdminAPI = require('@tryghost/admin-api');
const path = require('path');

// Debug environment variables
console.log('Environment Variables:');
console.log('NEXT_PUBLIC_GHOST_URL:', process.env.NEXT_PUBLIC_GHOST_URL);
console.log('GHOST_ADMIN_KEY:', process.env.GHOST_ADMIN_KEY);
console.log('Current working directory:', process.cwd());

// Initialize Ghost Admin API
const adminApi = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v5.0'
});

const transformImageUrl = (url) => {
  if (!url) return url;

  // Handle the domain replacement
  if (url.startsWith('https://joy.so/wp-content/uploads/')) {
    url = url.replace(
      'https://joy.so/wp-content/uploads/',
      'https://cdn-web.joy.so/cdn/image/'
    );
  }

  // Remove size suffix if present (e.g., -300x200.webp)
  return url.replace(/-\d+x\d+\.webp$/, '.webp');
};

const processLexicalContent = (lexical) => {
  if (!lexical) return { lexical, hasChanges: false };

  const oldContent = lexical;
  let newContent = lexical;
  let foundMatches = [];

  // Simple string replacement for all occurrences
  if (lexical.includes('https://joy.so/wp-content/uploads/')) {
    newContent = lexical.replace(
      /https:\/\/joy\.so\/wp-content\/uploads\/[^"]+/g,
      (match) => {
        foundMatches.push({
          old: match,
          new: transformImageUrl(match)
        });
        return transformImageUrl(match);
      }
    );

    // Log all found matches
    foundMatches.forEach(match => {
      console.log('Found image URL to replace:', match.old);
      console.log('Replaced with:', match.new);
    });
  }

  const hasChanges = oldContent !== newContent;
  return { lexical: newContent, hasChanges };
};

async function updatePost(post) {
  try {
    // Get the latest version of the post
    const latestPost = await adminApi.posts.read({ id: post.id });

    // Process lexical content
    const { lexical, hasChanges: lexicalChanged } = processLexicalContent(latestPost.lexical);

    // Transform feature image if exists
    const oldFeatureImage = latestPost.feature_image;
    const newFeatureImage = oldFeatureImage ? transformImageUrl(oldFeatureImage) : null;
    const featureImageChanged = oldFeatureImage !== newFeatureImage;

    // Only update if there are changes
    if (lexicalChanged || featureImageChanged) {
      const updateData = {
        id: post.id,
        updated_at: latestPost.updated_at
      };

      if (lexicalChanged) {
        // console.log('Content before:', latestPost.lexical);
        // console.log('Content after:', lexical);
        updateData.lexical = lexical;
      }

      if (featureImageChanged) {
        console.log('Feature image before:', oldFeatureImage);
        console.log('Feature image after:', newFeatureImage);
        updateData.feature_image = newFeatureImage;
      }

      await adminApi.posts.edit(updateData);

      console.log(`✅ Updated images in post "${post.title}"`);
      if (lexicalChanged) console.log('  - Updated content images');
      if (featureImageChanged) console.log('  - Updated feature image');
      return true;
    } else {
      console.log(`ℹ️ No image updates needed for "${post.title}"`);
      return false;
    }
  } catch (error) {
    if (error.type === 'UpdateCollisionError') {
      console.log(`⚠️ Retrying update for "${post.title}" after collision...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return updatePost(post);
    }
    console.error(`❌ Error updating post "${post.title}":`, error);
    console.error('Error details:', error);
    return false;
  }
}

async function processAllPosts() {
  try {
    // Get all posts using Admin API
    const posts = await adminApi.posts.browse({
      limit: 'all',
      include: ['title', 'lexical', 'feature_image']
    });

    console.log(`Found ${posts.length} posts total.`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each post
    for (const post of posts) {
      console.log(`\nProcessing post: ${post.title}`);
      const success = await updatePost(post);

      if (success) {
        updatedCount++;
      } else {
        skippedCount++;
      }

      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`\nProcess completed!`);
    console.log(`Updated ${updatedCount} posts with new image URLs`);
    console.log(`Skipped ${skippedCount} posts (no changes needed)`);

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