"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import GoogleIcon from "./icons/GoogleIcon";
import FacebookIcon from "./icons/FacebookIcon";
import AppleIcon from "./icons/AppleIcon";
import AppLogo from "./icons/AppLogo";


export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    let result;
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) setError(result.error.message);
    else if (result.data?.user) {
      router.push("/");
    }
  };

  // OAuth login function
  const handleOAuthLogin = async (provider) => {
    setError(null);
    try {
      await supabase.auth.signInWithOAuth({ provider });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-[734px] h-auto mx-auto p-6 rounded-xl mt-[-80px]">
      <div className="flex flex-col items-center gap-0">
        <AppLogo
          showText={false}
          className="w-20 h-20 mx-auto block !mb-0 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <h2 className="text-3xl font-bold !mb-8 !mt-[-10px] text-center">{isLogin ? "Sign in to SoundWave" : "Sign Up to Start Listening"}</h2>
      </div>
      {/* OAuth Buttons (เฉพาะ Sign Up) */}
      {!isLogin && (
        <>
          <div className="space-y-2 mb-4 flex flex-col items-center">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full px-9 mb-1 hover:bg-white/10 transition-all"
            >
              <GoogleIcon className="mr-3 text-2xl" />
              <span className="flex-1 text-center text-lg">Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuthLogin('facebook')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full px-9 !mb-1 hover:bg-white/10 transition-all"
            >
              <FacebookIcon className="mr-3 text-2xl" />
              <span className="flex-1 text-center text-lg">Continue with Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuthLogin('apple')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full pl-6 pr-11 !mb-1 hover:bg-white/10 transition-all"
            >
              <AppleIcon className="mr-2 text-[38px]" />
              <span className="flex-1 text-center text-lg">Continue with Apple</span>
            </button>
          </div>
          {/* Modern Divider */}
          <div className="flex items-center justify-center w-full max-w-[600px] !mt-10 !mb-10 mx-auto">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="mx-2 text-white/60 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
        </>
      )}
      {/* ฟอร์ม */}
      <div className="flex flex-col items-center space-y-4 mb-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-[324px] h-[56px] p-2 rounded text-gray-700"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-[324px] h-[56px] p-2 rounded text-gray-700"
        />
        {error && <div className="text-red-500 w-[324px]">{error}</div>}
        <button type="submit" className="btn-primary w-[324px] h-[56px]">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-[324px]  text-sm text-purple-400 mt-2"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
      {/* OAuth Buttons (เฉพาะ Sign in) */}
      {isLogin && (
        <>
          {/* Modern Divider */}
          <div className="flex items-center justify-center w-full max-w-[600px] !mt-10 !mb-10 mx-auto">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="mx-2 text-white/60 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>
          <div className="space-y-2 mt-8 flex flex-col items-center">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full px-9 mb-1 hover:bg-white/10 transition-all"
            >
              <GoogleIcon className="mr-3 text-2xl" />
              <span className="flex-1 text-center text-lg">Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuthLogin('facebook')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full px-9 !mb-1 hover:bg-white/10 transition-all"
            >
              <FacebookIcon className="mr-3 text-2xl" />
              <span className="flex-1 text-center text-lg">Continue with Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => handleOAuthLogin('apple')}
              className="w-[324px] h-[56px] flex items-center border border-white text-white font-semibold rounded-full pl-6 pr-11 !mb-1 hover:bg-white/10 transition-all"
            >
              <AppleIcon className="mr-2 text-[38px]" />
              <span className="flex-1 text-center text-lg">Continue with Apple</span>
            </button>
          </div>
        </>
      )}
    </form>
  );
}