import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const { data, error } = await supabase
      .from('app_reviews')
      .select('id, rating, title, review_text, display_name, user_category, app_version, created_at, helpful_count, developer_response, verified_download')
      .eq('moderation_status', 'approved')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { rating, title, review_text, display_name, email, user_category, app_version } = body;

    if (!rating || !review_text || !display_name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hash email for privacy
    const emailHash = crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');

    const { error } = await supabase.from('app_reviews').insert({
      rating,
      title,
      review_text,
      display_name,
      reviewer_email_hash: emailHash,
      user_category,
      app_version,
      moderation_status: 'pending'
    });

    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Review submitted for moderation' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
