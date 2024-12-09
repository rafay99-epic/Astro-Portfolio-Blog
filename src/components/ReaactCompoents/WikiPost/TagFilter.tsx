import React from "react";

interface TagFilterProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  uniqueTags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({
  selectedTag,
  onTagSelect,
  uniqueTags,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => onTagSelect(null)}
        className={`rounded-lg py-2 px-3 transition duration-300 transform cursor-pointer 
        ${selectedTag === null ? "bg-[#7aa2f7] text-white" : "bg-gray-600 text-gray-200 hover:bg-[#7aa2f7] hover:text-white"}`}
      >
        All
      </button>
      {uniqueTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`rounded-lg py-2 px-3 transition duration-300 transform cursor-pointer 
          ${selectedTag === tag ? "bg-[#7aa2f7] text-white" : "bg-gray-600 text-gray-200 hover:bg-[#7aa2f7] hover:text-white"}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
