'use client';

import { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton'; 

export default function UserNavbarDisplay() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setUserName(storedEmail.split('@')[0] || '');
      } else {
        setUserName(''); 
      }
    }
  }, []);  

  if (!userName) {
    return null; 
  }

  return (
    <>
      <span className="text-slate-300 px-3 py-2 text-sm font-medium">
        {userName?`Welcome, ${userName}`:""}
      </span>

      <LogoutButton />
    </>
  );
}
