import React from "react";
import { useTagFilter } from "./useTagFilter";

type Post = {
  data: {
    title: string;
    tags: string[];
    date: string;
    draft?: boolean;
  };
  slug: string;
};

interface TagFilterProps {
  posts: Post[];
}

const TagFilter: React.FC<TagFilterProps> = ({ posts }) => {
  const { tags, filteredPosts, fade, selectedTag, handleTagClick } =
    useTagFilter(posts);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className={` bg-gray-600 rounded-lg py-2 px-3 transition duration-300 transform cursor-pointer hover:bg-[#7aa2f7] hover:scale-105`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-3xl">Articles:</h2>
        <ul
          className={`transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {filteredPosts.map((post) => (
            <li key={post.slug} className="mt-2">
              <a
                href={`/blog/${post.slug}`}
                className="text-white hover:underline"
              >
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagFilter;
