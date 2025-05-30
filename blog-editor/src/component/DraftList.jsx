import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DraftsList() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDrafts() {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch('/api/blogs?status=draft', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch drafts');
        }

        const data = await res.json();
        setDrafts(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchDrafts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5 text-muted">Loading drafts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Drafts</h2>

      {drafts.length === 0 ? (
        <p className="text-center text-muted">No drafts found.</p>
      ) : (
        <div className="row row-cols-1 g-4">
          {drafts.map((draft) => (
            <div className="col" key={draft._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/editor/${draft._id}`} className="text-decoration-none text-primary">
                      {draft.title || 'Untitled Draft'}
                    </Link>
                  </h5>
                  <p className="card-text mt-2">
                    {draft.content ? draft.content.slice(0, 300) + (draft.content.length > 300 ? '...' : '') : 'No content available.'}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Tags:</strong> {draft.tags?.join(', ') || 'No tags'}
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
