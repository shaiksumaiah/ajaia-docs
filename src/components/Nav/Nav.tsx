'use client';

import { useAuth } from '@/lib/AuthContext';
import { User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      height: '64px',
      borderBottom: '1px solid #dadce0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: '#4285f4', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>A</div>
        <span style={{ fontSize: '18px', fontWeight: '500', color: '#5f6368' }}>Docs</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: '#5f6368' }}>{user.email}</div>
            </div>
            <button 
              onClick={logout}
              style={{
                background: 'transparent',
                border: '1px solid #dadce0',
                padding: '6px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Logout"
            >
              <LogOut size={16} color="#5f6368" />
            </button>
          </div>
        ) : (
          <User size={24} color="#5f6368" />
        )}
      </div>
    </nav>
  );
}
