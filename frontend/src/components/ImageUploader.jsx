"use client";

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Star, 
  Loader2, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { uploadToImgbb } from '@/lib/imgbb';

export default function ImageUploader({ images = [], onChange }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setErrorMsg('');

    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Only image files (JPG, PNG, WEBP, GIF) are allowed.');
        return false;
      }
      if (file.size > 32 * 1024 * 1024) {
        setErrorMsg('Image file size must be less than 32MB.');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    for (const file of validFiles) {
      const uploadId = Math.random().toString(36).substring(7);
      const previewUrl = URL.createObjectURL(file);

      setUploadingFiles(prev => [...prev, { id: uploadId, name: file.name, preview: previewUrl }]);

      try {
        const uploadedUrl = await uploadToImgbb(file);
        onChange([...images, uploadedUrl]);
        setUploadingFiles(prev => prev.filter(item => item.id !== uploadId));
      } catch (err) {
        console.error('Upload failed:', err);
        setErrorMsg(err.message || `Failed to upload ${file.name}.`);
        setUploadingFiles(prev => prev.filter(item => item.id !== uploadId));
      } finally {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetPrimary = (indexToPrimary) => {
    if (indexToPrimary === 0) return;
    const selected = images[indexToPrimary];
    const rest = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([selected, ...rest]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest">
          Product Photos *
        </label>
        <p className="text-[11px] text-zinc-400 mt-0.5">
          Select or drag & drop clear photos of your item.
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-[#0c9096] bg-[#0c9096]/10 scale-[1.01]'
            : 'border-zinc-800 hover:border-[#0c9096]/50 bg-zinc-950/50 hover:bg-zinc-950'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0c9096]/10 text-[#0c9096] flex items-center justify-center shadow-lg border border-[#0c9096]/20">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              Click to select or drag & drop photos
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Supports JPG, PNG, WEBP & GIF up to 32MB
            </p>
          </div>
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Browse Device Files
          </button>
        </div>
      </div>

      {/* Uploading In-Progress Queue */}
      {uploadingFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {uploadingFiles.map(file => (
            <div key={file.id} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
              <img src={file.preview} alt="" className="w-full h-full object-cover opacity-50 blur-[1px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center bg-black/60">
                <Loader2 className="w-6 h-6 text-[#0c9096] animate-spin mb-1" />
                <span className="text-[10px] font-bold text-white truncate max-w-full">Uploading photo...</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Photos Gallery */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold uppercase tracking-wider">Uploaded Photos ({images.length})</span>
            <span className="text-[11px] text-[#0c9096] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded successfully
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, idx) => (
              <div 
                key={url + idx} 
                className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 group shadow-md"
              >
                <img 
                  src={url} 
                  alt={`Product photo ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Primary Cover Badge */}
                {idx === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#0c9096] text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-white" />
                    Cover Photo
                  </div>
                )}

                {/* Hover Action Controls */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white shadow transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      className="w-full py-1.5 bg-[#0c9096]/90 hover:bg-[#0c9096] text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                    >
                      <Star className="w-3 h-3" />
                      Set as Cover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
