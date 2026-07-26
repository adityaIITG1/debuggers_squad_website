import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Fetch the latest active release
    const { data, error } = await supabase
      .from('app_releases')
      .select('version_name, version_code, file_size_bytes, android_min_version, release_date, release_notes, sha256_checksum, signing_fingerprint')
      .eq('status', 'active')
      .eq('is_latest', true)
      .order('release_date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching latest release:', error);
      return NextResponse.json({ error: 'Failed to fetch release' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'No active release found' }, { status: 404 });
    }

    // Also get stats (reviews count and average)
    const { data: reviewData } = await supabase
      .from('app_reviews')
      .select('rating')
      .eq('moderation_status', 'approved');

    const totalReviews = reviewData?.length || 0;
    const averageRating = totalReviews > 0 
      ? reviewData!.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews 
      : 0;

    return NextResponse.json({ 
        release: data,
        stats: {
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10
        }
    });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
