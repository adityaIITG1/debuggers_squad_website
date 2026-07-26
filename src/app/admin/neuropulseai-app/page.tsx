'use client';
import { useState, useEffect } from 'react';

type AdminRelease = {
  id?: string;
  version_name: string;
  version_code: number;
};

type AdminReview = {
  id: string;
  rating: number;
  title?: string | null;
  review_text: string;
  display_name: string;
};

export default function NeuroPulseAdminPage() {
  const [releases, setReleases] = useState<AdminRelease[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  
  useEffect(() => {
    // In a real application, you would fetch these from an admin-only API
    fetch('/api/neuropulseai/releases/latest')
      .then(res => res.json())
      .then(data => {
        if(data.release) setReleases([data.release]);
      });
      
    fetch('/api/neuropulseai/reviews?limit=50')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setReviews(data);
      });
  }, []);

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#062B5B]">NeuroPulseAI Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Manage Releases</h2>
          <button className="bg-[#0866E8] text-white px-4 py-2 rounded-lg font-medium mb-4 hover:bg-blue-700 transition">
            + New Release
          </button>
          
          <div className="space-y-4">
            {releases.map(release => (
              <div key={release.id || '1'} className="p-4 border rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold">Version {release.version_name}</div>
                  <div className="text-sm text-slate-500">Code: {release.version_code}</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Moderate Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-slate-500">No reviews pending moderation.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="p-4 border rounded-xl">
                  <div className="flex justify-between">
                    <div className="font-bold">{review.title || 'Untitled'}</div>
                    <div className="text-yellow-500 font-bold">{review.rating} ★</div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{review.review_text}</p>
                  <div className="text-xs text-slate-400 mt-2">By {review.display_name}</div>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded font-medium text-sm">Approve</button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded font-medium text-sm">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
