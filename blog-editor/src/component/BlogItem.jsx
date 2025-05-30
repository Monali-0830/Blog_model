import React from 'react';
export default function BlogItem({ blog, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:shadow-md"
    >
      <h3 className="text-lg font-medium">{blog.title}</h3>
      <p className="text-sm text-gray-500">{new Date(blog.updated_at).toLocaleString()}</p>
    </div>
  );
}