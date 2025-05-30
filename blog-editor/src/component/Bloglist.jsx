import React, {useState,useEffect} from 'react';
import { fetchAll } from '../api/blog';
import BlogItem from './BlogItem';

export default function BlogList({ onEdit }) {
  const [drafts, setDrafts]     = useState([]);
  const [published, setPublished] = useState([]);

  useEffect(()=>{
    fetchAll().then(res=>{
      const all = res.data;
      setDrafts(all.filter(b=>b.status==='draft'));
      setPublished(all.filter(b=>b.status==='published'));
    });
  },[]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {['drafts','published'].map((sect,idx)=>(
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold capitalize mb-4">{sect}</h2>
          <div className="space-y-4">
            {(sect==='drafts'?drafts:published).map(b=>
              <BlogItem key={b.id} blog={b} onClick={()=>onEdit(b)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
