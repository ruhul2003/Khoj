"use client";

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle2, Send, ThumbsUp, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export function ProductReviews({ productId, sellerId }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews', { params: { productId } });
      setReviews(res.data || []);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      addToast('Please write a review before submitting', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        productId,
        sellerId,
        reviewerId: user?.id || 'guest_' + Date.now(),
        reviewerName: user?.name || 'Verified Buyer',
        reviewerAvatar: user?.avatar || '',
        rating,
        comment: comment.trim()
      };

      const res = await api.post('/reviews', payload);
      setReviews([res.data, ...reviews]);
      setComment('');
      setShowForm(false);
      addToast('Thank you! Your verified review has been posted.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to post review. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map(starVal => {
    const count = reviews.filter(r => Math.round(r.rating) === starVal).length;
    const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
    return { starVal, count, pct };
  });

  return (
    <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-8 font-['Bai_Jamjuree']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-[#0c9096]" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Buyer Feedback & Ratings
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Real feedback from verified Khoj marketplace buyers
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-gradient-to-r from-[#0a6c71] to-[#0c9096] hover:from-[#0c9096] hover:to-[#13a7ad] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#0c9096]/20 self-start sm:self-auto"
        >
          {showForm ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {/* Review Breakdown Scoreboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800/80">
        <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-zinc-800/80 pb-6 md:pb-0 md:pr-6">
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {avgRating}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(Number(avgRating)) ? 'fill-current' : 'text-zinc-700'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-400">
            Based on {reviews.length} buyer {reviews.length === 1 ? 'rating' : 'ratings'}
          </p>
        </div>

        <div className="md:col-span-8 space-y-2">
          {starCounts.map(({ starVal, count, pct }) => (
            <div key={starVal} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-bold flex items-center gap-1">
                {starVal} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
              <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-[#0c9096] to-[#38d4dc] rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-zinc-500 text-[11px]">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-zinc-950 border border-[#0c9096]/50 space-y-4 animate-in fade-in">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            Share Your Experience
          </h4>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 block font-medium">Select Star Rating:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-zinc-300">
                {hoverRating || rating} / 5 Stars
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 block font-medium">Your Review:</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe condition, seller communication, handover experience..."
              className="w-full p-3 bg-zinc-900 border border-zinc-800 focus:border-[#0c9096] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none resize-none font-medium"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#0c9096] hover:bg-[#0a6c71] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Post Review'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 text-xs">
            No reviews yet for this product. Be the first to share your experience!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id || rev.id}
              className="p-5 rounded-2xl bg-zinc-950/50 border border-zinc-800/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.reviewerAvatar ? (
                    <img
                      src={rev.reviewerAvatar}
                      alt={rev.reviewerName}
                      className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#0c9096]/20 text-[#38d4dc] font-bold text-xs flex items-center justify-center border border-[#0c9096]/30">
                      {rev.reviewerName?.charAt(0) || 'B'}
                    </div>
                  )}
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {rev.reviewerName}
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </h5>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(rev.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-current' : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
