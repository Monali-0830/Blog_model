import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PublishedList() {
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPublished() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await fetch('/api/blogs/published', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch published blogs');
        }

        const data = await res.json();
        setPublished(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchPublished();
  }, []);

  if (loading) {
    return <div className="text-center mt-5 text-muted">Loading published blogs...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Published Blogs</h2>

      {published.length === 0 ? (
        <p className="text-center text-muted">No published blogs found.</p>
      ) : (
        <div className="row row-cols-1 g-4">
          {published.map((blog) => (
            <div className="col" key={blog._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/blog/${blog._id}`} className="text-decoration-none text-primary">
                      {blog.title || 'Untitled Blog'}
                    </Link>
                  </h5>

                  <p className="card-text mt-2">
                    {blog.content
                      ? blog.content.slice(0, 300) + (blog.content.length > 300 ? '...' : '')
                      : 'No content available.'}
                  </p>

                  <p className="card-text text-muted">
                    <strong>Tags:</strong> {blog.tags?.join(', ') || 'No tags'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
