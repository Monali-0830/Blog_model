import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveDraft, publish } from '../api/blog';
import { debounce } from '../utils/debounce';
import TagInput from './Taginput';
import Notification from './Notification';

export default function Editor({ initial = {}, onSaved }) {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [tags, setTags] = useState(initial.tags || []);
  const [notice, setNotice] = useState('');
  const [blogId, setBlogId] = useState(initial._id || initial.id || null);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const save = useCallback(async () => {
    const data = { id: blogId, title, content, tags };
    setIsSaving(true);
    try {
      const res = await saveDraft(data);
      if (res?.blog?._id) setBlogId(res.blog._id);
      const time = new Date().toLocaleTimeString();
      setNotice(`Auto-saved at ${time}`);
    } catch (err) {
      console.error('Auto-save failed', err);
    }
    setIsSaving(false);
  }, [title, content, tags, blogId]);

  const debouncedSave = useCallback(debounce(() => {
    if (title || content || tags.length) save();
  }, 5000), [save]);

  // Watch for changes and debounce save
  useEffect(() => {
    debouncedSave();
  }, [title, content, tags, debouncedSave]);


  // Regular interval for autosaving every 30 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isSaving && (title || content || tags.length)) {
        save();
      }
    }, 30000);

    return () => clearInterval(intervalRef.current);
  }, [save, isSaving, title, content, tags]);

  // Clear interval when manually saving/publishing
  const clearAutoSaveInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleSave = async () => {
    clearAutoSaveInterval();
    await save();
    onSaved?.();
    reset();
  };

  const handlePublish = async () => {
    clearAutoSaveInterval();
    await publish({ title, content, tags });
    onSaved?.();
    reset();
  };

  const reset = () => {
    setTitle('');
    setContent('');
    setTags([]);
    setNotice('');
    setBlogId(null);
  };

  return (
    <div className="container my-5">
      {notice && <Notification message={notice} className="mb-3" />}
      <div className="card shadow-lg">
        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your thoughts here..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <TagInput tags={tags} onChange={setTags} />
          </div>

          <div className="d-flex flex-wrap justify-content-between gap-2">
            <div>
              <button
                onClick={handleSave}
                className="btn btn-outline-primary me-2"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="btn btn-success"
              >
                Publish
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate('/drafts')}
                className="btn btn-outline-secondary me-2"
              >
                View Drafts
              </button>
              <button
                onClick={() => navigate('/published')}
                className="btn btn-outline-secondary"
              >
                View Published
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
