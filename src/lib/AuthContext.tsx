'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<{
  user: { id: string, name: string, email: string } | null;
  login: (email: string) => void;
  logout: () => void;
} | null>(null);

const MOCK_USERS = [
  { id: 'user_1', name: 'Alice (Owner)', email: 'alice@example.com' },
  { id: 'user_2', name: 'Bob (Collaborator)', email: 'bob@example.com' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string, name: string, email: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ajaia-mock-user');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // Default to Alice
      const defaultUser = MOCK_USERS[0];
      setUser(defaultUser);
      localStorage.setItem('ajaia-mock-user', JSON.stringify(defaultUser));
    }
  }, []);

  const login = (email: string) => {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem('ajaia-mock-user', JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ajaia-mock-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
