import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Fetch the latest active release
    const { data: release, error } = await supabase
      .from('app_releases')
      .select('id, apk_storage_url')
      .eq('status', 'active')
      .eq('is_latest', true)
      .order('release_date', { ascending: false })
      .limit(1)
      .single();

    if (error || !release) {
      return NextResponse.json({ error: 'No active release found' }, { status: 404 });
    }

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer') || 'unknown';
    
    // Log download event anonymously
    await supabase.from('download_events').insert({
      release_id: release.id,
      referrer: referrer,
      device_category: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
    });

    // Redirect to the actual APK URL
    return NextResponse.redirect(release.apk_storage_url);

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
