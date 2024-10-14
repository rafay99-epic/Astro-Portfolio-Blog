// import BlogSectionLogic from "./BlogPostLogic"; // Adjust the import path based on your project structure
// import BlogSectionUI from "./BlogPostUI"; // Adjust the import path based on your project structure

// interface Post {
//   id: string;
//   slug: string;
//   body: string;
//   collection: string;
//   data: {
//     title: string;
//     description: string;
//     pubDate: Date;
//     updatedDate?: Date;
//     heroImage?: string;
//     draft: boolean;
//     authorName: string;
//     authorAvatar?: string;
//   };
// }

// interface BlogSectionProps {
//   posts: Post[];
// }

// const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
//   return (
//     <BlogSectionLogic posts={posts}>
//       {(currentPosts, totalPages, currentPage, handlePageChange) => (
//         <BlogSectionUI
//           currentPosts={currentPosts}
//           totalPages={totalPages}
//           currentPage={currentPage}
//           handlePageChange={handlePageChange}
//         />
//       )}
//     </BlogSectionLogic>
//   );
// };

// export default BlogSection;

import { useEffect, useState } from "react";
import BlogSectionLogic from "./BlogPostLogic";
import BlogSectionUI from "./BlogPostUI";

interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    draft: boolean;
    authorName: string;
    authorAvatar?: string;
  };
}

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <BlogSectionLogic posts={posts}>
      {(currentPosts, totalPages, currentPage, handlePageChange) => (
        <BlogSectionUI
          currentPosts={currentPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </BlogSectionLogic>
  );
};

export default BlogSection;
