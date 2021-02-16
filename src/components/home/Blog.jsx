import React from "react";
import BlogCard from "./BlogCard";
export default function Blog() {
  const posts = [
    {
      title: "Blog 1",
      author: "clone1",
      description: "Eating berries",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <BlogCard post={post} />
      ))}
    </div>
  );
}
