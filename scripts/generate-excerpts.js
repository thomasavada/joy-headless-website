require('dotenv').config({ path: './../.env' });
const GhostAdminAPI = require('@tryghost/admin-api');
const path = require('path');
const OpenAI = require('openai');

// Debug environment variables
console.log('Environment Variables:');
console.log('NEXT_PUBLIC_GHOST_URL:', process.env.NEXT_PUBLIC_GHOST_URL);
console.log('GHOST_ADMIN_KEY:', process.env.GHOST_ADMIN_KEY);
console.log('Current working directory:', process.cwd());
console.log('Env file path:', path.resolve(process.cwd(), '.env'));

// Initialize Ghost Admin API
const adminApi = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'v5.0'
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const transformImageUrl = (url) => {
  // First handle the domain replacement
  if (url.startsWith('https://joy.so/wp-content/uploads/')) {
    url = url.replace(
      'https://joy.so/wp-content/uploads/',
      'https://cdn-web.joy.so/cdn/image/'
    )
  }
  
  // Remove size suffix if present
  return url.replace(/-\d+x\d+\.webp$/, '.webp')
}

async function generateExcerpt(title, content) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates concise blog post excerpts. Keep the excerpt around 145 characters and make it engaging."
        },
        {
          role: "user",
          content: `Generate a concise excerpt (around 145 characters) for a blog post with the following title and content:\n\nTitle: ${title}\n\nContent: ${content}`
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating excerpt:', error);
    return null;
  }
}

async function updatePost(post, excerpt) {
  try {
    // Get the latest version of the post
    const latestPost = await adminApi.posts.read({ id: post.id });
    
    // Transform image URLs in HTML content
    const doc = new DOMParser().parseFromString(latestPost.html, 'text/html');
    const images = doc.querySelectorAll('img');
    
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (src) {
        const transformedSrc = transformImageUrl(src);
        img.setAttribute('src', transformedSrc);
        
        // Add responsive attributes
        img.setAttribute('loading', 'lazy');
        img.setAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px');
        img.classList.add('w-full', 'h-auto', 'object-cover', 'rounded-lg');
      }
    });

    // Transform feature image if exists
    const featureImage = latestPost.feature_image ? 
      transformImageUrl(latestPost.feature_image) : null;

    // Update post with transformed content
    await adminApi.posts.edit({
      id: post.id,
      custom_excerpt: excerpt,
      html: doc.body.innerHTML,
      feature_image: featureImage,
      updated_at: latestPost.updated_at
    });
    
    console.log(`✅ Updated post "${post.title}" with new excerpt and transformed images`);
    return true;
  } catch (error) {
    if (error.type === 'UpdateCollisionError') {
      console.log(`⚠️ Retrying update for "${post.title}" after collision...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return updatePost(post, excerpt);
    }
    console.error(`❌ Error updating post "${post.title}":`, error);
    return false;
  }
}

async function processAllPosts() {
  try {
    // Get all posts using Admin API
    const posts = await adminApi.posts.browse({
      limit: 'all',
      include: ['title', 'html', 'excerpt']
    });

    console.log(`Found ${posts.length} posts total.`);

    // Log first post for debugging
    if (posts.length > 0) {
      console.log('First post title:', posts[0].title);
      // console.log('First post data:', posts[0]);
    }

    let updatedCount = 0;

    // Process each post
    for (const post of posts) {
      if (!post.custom_excerpt) {
        console.log(`Processing post: ${post.title}`);

        // Generate excerpt using ChatGPT
        const excerpt = await generateExcerpt(post.title, post.html);
        console.log("Generated excerpt:", excerpt);

        if (excerpt) {
          const success = await updatePost(post, excerpt);
          if (success) {
            updatedCount++;
          }
        }

        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`\nProcess completed!`);
    console.log(`Updated ${updatedCount} posts with new excerpts.`);

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
