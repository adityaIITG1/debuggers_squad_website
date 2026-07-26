-- NeuroPulseAI App Pages Database Schema

CREATE TABLE app_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version_name TEXT NOT NULL,
  version_code INTEGER NOT NULL,
  android_min_version TEXT,
  file_size_bytes BIGINT,
  apk_storage_url TEXT NOT NULL,
  sha256_checksum TEXT,
  signing_fingerprint TEXT,
  release_notes TEXT,
  release_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active', -- active, inactive, deprecated
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE app_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT NOT NULL,
  display_name TEXT NOT NULL,
  reviewer_email_hash TEXT NOT NULL,
  user_category TEXT,
  app_version TEXT,
  screenshot_path TEXT,
  moderation_status TEXT DEFAULT 'pending', -- pending, approved, rejected
  verified_download BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  developer_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES app_reviews(id) ON DELETE CASCADE,
  anonymous_user_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(review_id, anonymous_user_hash)
);

CREATE TABLE review_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES app_reviews(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  reporter_hash TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE download_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES app_releases(id) ON DELETE SET NULL,
  anonymous_session_id TEXT,
  referrer TEXT,
  device_category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE app_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active releases" ON app_releases FOR SELECT USING (status = 'active');
CREATE POLICY "Public read approved reviews" ON app_reviews FOR SELECT USING (moderation_status = 'approved');
CREATE POLICY "Public insert review" ON app_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert vote" ON review_votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert report" ON review_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert download_event" ON download_events FOR INSERT WITH CHECK (true);

-- Insert placeholder latest release
INSERT INTO app_releases (version_name, version_code, android_min_version, file_size_bytes, apk_storage_url, sha256_checksum, release_notes, is_latest)
VALUES ('1.0.0', 1, '8.0 (Oreo)', 15500000, 'https://example.com/NeuroPulseAI_App.apk', 'pending', 'Initial Release.', true);
