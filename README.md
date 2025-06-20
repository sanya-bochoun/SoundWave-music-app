# 🎵 SoundWave - Music Discovery App

แอปค้นหาและฟังเพลงที่สร้างด้วย Next.js และ Tailwind CSS

## ✨ Features

- 🎶 ค้นหาเพลงและศิลปิน
- 📋 สร้างและจัดการ Playlist
- 📈 เพลงยอดนิยม Trending
- 💫 UI/UX ที่สวยงามและ Responsive
- 🎨 Animated background และ Modern design

## 🚀 Technology Stack

- **Frontend:** Next.js 14, React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## 📦 Installation

1. Clone repository
\`\`\`bash
git clone <your-repo-url>
cd soundwave
\`\`\`

2. ติดตั้ง dependencies
\`\`\`bash
npm install
\`\`\`

3. ตั้งค่า environment variables
\`\`\`bash
cp env.example .env.local
\`\`\`

4. รันโปรเจค
\`\`\`bash
npm run dev
\`\`\`

## 🗄️ Database Setup (Supabase)

### 1. สร้าง Supabase Project
- ไปที่ [supabase.com](https://supabase.com)
- สร้าง account และ project ใหม่
- คัดลอก URL และ Anon Key

### 2. Database Schema
รัน SQL commands ใน Supabase SQL Editor:

\`\`\`sql
-- สร้างตาราง songs
CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  duration INTEGER, -- seconds
  plays INTEGER DEFAULT 0,
  cover_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- สร้างตาราง playlists
CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- สร้างตาราง playlist_songs (many-to-many)
CREATE TABLE playlist_songs (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW()
);

-- สร้างตาราง favorites
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- Insert sample data
INSERT INTO songs (title, artist, album, duration, plays, cover_url) VALUES
  ('Electric Dreams', 'Neon Pulse', 'Cosmic Echoes', 204, 2400000, 'https://example.com/cover1.jpg'),
  ('Midnight Vibes', 'Luna Sound', 'Electric Nights', 252, 1800000, 'https://example.com/cover2.jpg'),
  ('Digital Love', 'Cyber Hearts', 'Natural Elements', 225, 3100000, 'https://example.com/cover3.jpg'),
  ('Starlight Symphony', 'Luna Waves', 'Cosmic Echoes', 222, 2400000, 'https://example.com/cover4.jpg'),
  ('Ocean Breeze', 'Aqua Sound', 'Natural Elements', 208, 3100000, 'https://example.com/cover5.jpg');

INSERT INTO playlists (name, description, cover_url) VALUES
  ('Chill Vibes', 'Perfect for relaxing and unwinding', 'https://example.com/playlist1.jpg'),
  ('Workout Beats', 'High-energy tracks to fuel your workout', 'https://example.com/playlist2.jpg'),
  ('Indie Discoveries', 'Hidden gems from independent artists', 'https://example.com/playlist3.jpg');
\`\`\`

## 🚀 Deployment

### Deploy บน Vercel (แนะนำ)

1. **Push ขึ้น GitHub:**
\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

2. **Deploy บน Vercel:**
- ไปที่ [vercel.com](https://vercel.com)
- เลือก "Import Project"
- เชื่อมต่อ GitHub repository
- ตั้งค่า Environment Variables:
  - \`NEXT_PUBLIC_SUPABASE_URL\`
  - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
- คลิก Deploy!

### หรือใช้ Vercel CLI:
\`\`\`bash
npm install -g vercel
vercel login
vercel --prod
\`\`\`

## 🔧 Environment Variables

สร้างไฟล์ \`.env.local\`:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## 📝 License

MIT License - ดูไฟล์ LICENSE สำหรับรายละเอียด

---

Made with ❤️ และ 🎵 โดย [Your Name]
