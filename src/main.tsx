import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { init } from '@emailjs/browser';
import App from './App.tsx';
import { SupabaseProvider } from './context/SupabaseContext';
import './index.css';

// Initialize EmailJS
init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </StrictMode>
);