'use client';

import { useRouter } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0";
    
    localStorage.removeItem('user_email');
    
    showToast.info("You have been logged out.", {
        duration: 3000,
        position: "top-center",
    });

    router.push('/login');
    router.refresh(); 
  };

  return (
    <button
      onClick={handleLogout}
      className="text-slate-300 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
    >
      Logout
    </button>
  );
}
