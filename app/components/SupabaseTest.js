import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SupabaseTest() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      const { data, error } = await supabase.from("songs").select("*").limit(1);
      if (error) setError(error.message);
      else setTracks(data);
    }
    fetchTracks();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="font-bold mb-2">Supabase Test</h2>
      {error && <div className="text-red-500">Error: {error}</div>}
      <pre className="text-xs bg-white p-2 rounded overflow-x-auto">{JSON.stringify(tracks, null, 2)}</pre>
    </div>
  );
} 