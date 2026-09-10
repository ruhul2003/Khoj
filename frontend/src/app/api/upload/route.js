import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const headerKey = req.headers.get('x-imgbb-key');
    const apiKey = headerKey || process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: 'ImgBB API key is missing. Please set NEXT_PUBLIC_IMGBB_API_KEY in your .env or enter it in the seller settings.'
      }, { status: 400 });
    }

    // Prepare ImgBB upload payload
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', image);

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const data = await imgbbRes.json();

    if (!imgbbRes.ok || !data.success) {
      const errorMsg = data?.error?.message || 'Failed to upload image to ImgBB';
      return NextResponse.json({ error: errorMsg }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      url: data.data.display_url || data.data.url,
      delete_url: data.data.delete_url,
      thumb: data.data.thumb?.url || data.data.url
    });
  } catch (err) {
    console.error('ImgBB upload error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error while uploading image' }, { status: 500 });
  }
}
