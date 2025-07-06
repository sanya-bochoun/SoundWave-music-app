'use client'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfilePage() {
  const { user, logout, loading } = useAuth()

  if (loading) return <div className="text-center mt-10">Loading data...</div>
  if (!user) return <div className="text-center mt-10">Please login first</div>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="mb-2">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-4">
        <strong>User ID:</strong> {user.id}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Log out
      </button>
    </div>
  )
} 