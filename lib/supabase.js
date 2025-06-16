import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for music app
export const musicAPI = {
  // Get all songs
  async getSongs() {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get trending songs
  async getTrendingSongs() {
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
  }
} 