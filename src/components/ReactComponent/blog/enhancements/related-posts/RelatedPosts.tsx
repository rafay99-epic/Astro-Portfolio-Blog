import React from 'react';
import type { Post } from 'types/articles';

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPost, 
  allPosts, 
  maxPosts = 3 
}) => {
  // Find related posts based on tags and keywords
  const getRelatedPosts = () => {
    const currentTags = currentPost.data.tags || [];
    const currentKeywords = currentPost.data.keywords || [];
    
    const relatedPosts = allPosts
      .filter(post => post.slug !== currentPost.slug && !post.data.draft)
      .map(post => {
        const postTags = post.data.tags || [];
        const postKeywords = post.data.keywords || [];
        
        // Calculate relevance score
        let score = 0;
        
        // Tag matching
        currentTags.forEach(tag => {
          if (postTags.includes(tag)) score += 3;
        });
        
        // Keyword matching
        currentKeywords.forEach(keyword => {
          if (postKeywords.includes(keyword)) score += 2;
        });
        
        // Title similarity
        const titleWords = currentPost.data.title.toLowerCase().split(' ');
        const postTitleWords = post.data.title.toLowerCase().split(' ');
        const commonWords = titleWords.filter(word => 
          postTitleWords.includes(word) && word.length > 3
        );
        score += commonWords.length;
        
        return { post, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPosts)
      .map(item => item.post);
    
    return relatedPosts;
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="related-posts mt-12 p-6 bg-gradient-to-r from-[#1a1b26]/60 to-[#1a1b26]/60 backdrop-blur-20 border border-[#565f89]/20 rounded-20">
      <h3 className="text-xl font-semibold text-[#a9b1d6] mb-4">
        Related Articles
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 bg-[#1a1b26]/80 border border-[#565f89]/20 rounded-12 hover:border-[#7aa2f7]/40 transition-all duration-200 hover:transform hover:scale-105"
          >
            <h4 className="text-[#a9b1d6] font-medium mb-2 line-clamp-2">
              {post.data.title}
            </h4>
            <p className="text-[#565f89] text-sm line-clamp-2">
              {post.data.description}
            </p>
            <div className="flex items-center mt-3 text-xs text-[#565f89]">
              <span>{new Date(post.data.pubDate).toLocaleDateString()}</span>
              {post.data.readTime && (
                <span className="ml-2">• {post.data.readTime}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts; 