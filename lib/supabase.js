import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// ตรวจสอบว่ามี Environment Variables หรือไม่
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not configured')
  console.warn('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper functions for music app
export const musicAPI = {
  // Get all songs
  async getSongs() {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get trending songs
  async getTrendingSongs() {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }
    
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('plays', { ascending: false })
      .limit(10)
    
    if (error) throw error
    return data
  },

  // Get playlists
  async getPlaylists() {
    const { data, error } = await supabase
      .from('playlists')
      .select(`
        *,
        songs (*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Search songs
  async searchSongs(query) {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .or(`title.ilike.%${query}%,artist.ilike.%${query}%,album.ilike.%${query}%`)
    
    if (error) throw error
    return data
  },

  // Add song to favorites
  async addToFavorites(userId, songId) {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id: userId, song_id: songId }
      ])
    
    if (error) throw error
    return data
  },

  // Add sample audio URLs to existing songs (for demo purposes)
  async updateSampleAudioUrls() {
    // Sample audio URLs (you can replace with actual music files)
    const sampleAudioUrls = [
      'https://www.soundjay.com/misc/sounds/page-flip-01a.mp3',
      'https://www.soundjay.com/misc/sounds/page-flip-02a.mp3',
      'https://www.soundjay.com/misc/sounds/page-flip-03a.mp3',
      'https://www.soundjay.com/misc/sounds/page-flip-01a.mp3',
      'https://www.soundjay.com/misc/sounds/page-flip-02a.mp3',
      'https://www.soundjay.com/misc/sounds/page-flip-03a.mp3',
    ]

    const songs = await this.getSongs()
    
    for (let i = 0; i < songs.length && i < sampleAudioUrls.length; i++) {
      const { error } = await supabase
        .from('songs')
        .update({ audio_url: sampleAudioUrls[i] })
        .eq('id', songs[i].id)
      
      if (error) console.error('Error updating audio URL:', error)
    }
    
    return 'Sample audio URLs updated'
  }
} 