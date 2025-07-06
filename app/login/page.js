import AuthForm from "../components/AuthForm";

export const metadata = {
  title: 'Login',
  description: 'เข้าสู่ระบบ SoundWave',
  // ห้ามใส่ themeColor หรือ viewport ในนี้!
};

export const viewport = {
  themeColor: '#8b5cf6',
  width: 'device-width',
  initialScale: 1,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <AuthForm />
    </div>
  );
} 