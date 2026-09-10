"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Star, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Key, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { uploadToImgbb, getStoredImgbbKey, setStoredImgbbKey } from '@/lib/imgbb';

export default function ImageUploader({ images = [], onChange }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const key = getStoredImgbbKey();
    setApiKey(key);
    setTempKey(key);
    if (!key) {
      setShowKeyInput(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (!tempKey.trim()) {
      setErrorMsg('Please enter a valid ImgBB API key.');
      return;
    }
    setStoredImgbbKey(tempKey.trim());
    setApiKey(tempKey.trim());
    setShowKeyInput(false);
    setErrorMsg('');
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setErrorMsg('');

    const key = getStoredImgbbKey();
    if (!key) {
      setShowKeyInput(true);
      setErrorMsg('Please enter your ImgBB API key first so we can upload your photos.');
      return;
    }

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
        const uploadedUrl = await uploadToImgbb(file, key);
        onChange([...images, uploadedUrl]);
        setUploadingFiles(prev => prev.filter(item => item.id !== uploadId));
      } catch (err) {
        console.error('Upload failed:', err);
        setErrorMsg(err.message || `Failed to upload ${file.name} to ImgBB.`);
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
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-widest">
            Product Photos (Direct Upload via ImgBB) *
          </label>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Select or drag & drop high-resolution photos of your item.
          </p>
        </div>

        {/* ImgBB API Key Status & Toggle */}
        <button
          type="button"
          onClick={() => setShowKeyInput(!showKeyInput)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
            apiKey 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
          }`}
        >
          <Key className="w-3 h-3" />
          <span>{apiKey ? 'ImgBB Key Configured' : 'Configure ImgBB Key'}</span>
          {showKeyInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* API Key Drawer / Input Banner */}
      {showKeyInput && (
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-[#0c9096]" />
              ImgBB API Key Setup
            </span>
            <a
              href="https://api.imgbb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#0c9096] hover:underline flex items-center gap-1"
            >
              Get free key at api.imgbb.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              placeholder="Paste your ImgBB API key here..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-zinc-950 text-white rounded-xl border border-zinc-700 text-xs focus:outline-none focus:border-[#0c9096]"
            />
            <button
              type="button"
              onClick={handleSaveKey}
              className="px-4 py-2 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors"
            >
              Save Key
            </button>
          </div>
          <p className="text-[10px] text-zinc-400">
            Keys are safely stored locally in your browser session or can be configured via <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">NEXT_PUBLIC_IMGBB_API_KEY</code> in <code className="text-zinc-300 bg-zinc-800 px-1 py-0.5 rounded">frontend/.env.local</code>.
          </p>
        </div>
      )}

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
            <Upload className="w-7 h-7 animate-bounce-slow" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              Click to select or drag & drop photos
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Supports JPG, PNG, WEBP & GIF up to 32MB directly to ImgBB
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
                <span className="text-[10px] font-bold text-white truncate max-w-full">Uploading...</span>
                <span className="text-[9px] text-[#0c9096] font-medium">To ImgBB</span>
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
              <CheckCircle2 className="w-3.5 h-3.5" /> Hosted on ImgBB
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
