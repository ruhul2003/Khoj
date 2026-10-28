"use client";

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { uploadToImgbb } from '@/lib/imgbb';

export function AdminImageManager({ images = [], onChange }) {
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleAddUrl = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) return;
    const newImages = [...images, urlInput.trim()];
    onChange(newImages);
    setUrlInput('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const uploadedUrl = await uploadToImgbb(file);
      onChange([...images, uploadedUrl]);
    } catch (err) {
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    const target = images[index];
    const remaining = images.filter((_, i) => i !== index);
    onChange([target, ...remaining]);
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold text-slate-700 dark:text-slate-300">
          Product Gallery ({images.length} images)
        </label>
        <span className="text-[11px] text-slate-400">First image is primary thumbnail</span>
      </div>

      {/* Grid of Existing Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className={`group relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 transition-all ${
                idx === 0 
                  ? 'border-amber-500 shadow-xs' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80';
                }}
              />

              {/* Primary Label */}
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                  Primary
                </span>
              )}

              {/* Floating Action Overlay */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                <div className="flex items-center gap-1 text-white">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMove(idx, -1)}
                      title="Move left"
                      className="p-1 rounded hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      title="Set as Cover"
                      className="p-1 rounded hover:bg-amber-500 hover:text-slate-950 transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 1)}
                      title="Move right"
                      className="p-1 rounded hover:bg-white/20 transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="px-2 py-1 rounded bg-rose-500/80 hover:bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Image Controls */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Paste URL */}
        <div className="relative flex-1">
          <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image URL (https://...)"
            className="w-full pl-9 pr-16 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddUrl}
            disabled={!urlInput.trim()}
            className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-[11px] font-bold transition-colors disabled:opacity-40 cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Upload File to ImgBB */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Upload to ImgBB</span>
            </>
          )}
        </button>
      </div>

      {uploadError && (
        <p className="text-[11px] text-rose-500">{uploadError}</p>
      )}
    </div>
  );
}
