/**
 * ImgBB Image Upload Service for Khoj Marketplace
 */

export const getStoredImgbbKey = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('khoj_imgbb_key');
    if (saved && saved.trim()) return saved.trim();
  }
  return process.env.NEXT_PUBLIC_IMGBB_API_KEY || '';
};

export const setStoredImgbbKey = (key) => {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('khoj_imgbb_key', key.trim());
    } else {
      localStorage.removeItem('khoj_imgbb_key');
    }
  }
};

/**
 * Upload an image file directly to ImgBB
 * @param {File} file - Browser File object
 * @param {string} [customApiKey] - Optional API key override
 * @returns {Promise<string>} Direct image URL on ImgBB
 */
export async function uploadToImgbb(file, customApiKey = '') {
  if (!file) {
    throw new Error('Please select an image file to upload.');
  }

  const apiKey = (customApiKey || getStoredImgbbKey()).trim();

  // Try direct upload to ImgBB first if key is available
  if (apiKey) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result && result.success && result.data) {
        return result.data.display_url || result.data.url;
      }

      if (result?.error?.message) {
        throw new Error(`ImgBB: ${result.error.message}`);
      }
    } catch (err) {
      // If direct upload encounters an issue (e.g. CORS or network), try Next.js internal route as fallback
      console.warn('Direct ImgBB upload failed, attempting Next.js proxy route...', err);
    }
  }

  // Fallback to Next.js API route (/api/upload)
  const proxyForm = new FormData();
  proxyForm.append('image', file);

  const headers = {};
  if (apiKey) {
    headers['x-imgbb-key'] = apiKey;
  }

  const proxyRes = await fetch('/api/upload', {
    method: 'POST',
    headers,
    body: proxyForm
  });

  const proxyData = await proxyRes.json();

  if (!proxyRes.ok || !proxyData.success) {
    throw new Error(proxyData.error || 'Failed to upload image to ImgBB. Check your API key.');
  }

  return proxyData.url;
}
