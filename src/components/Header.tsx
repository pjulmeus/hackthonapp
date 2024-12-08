import React, { useState } from 'react';
import { Icons } from '../utils/icons';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onNavigate: (page: 'home' | 'services' | 'contact' | 'about') => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Icons.Truck size={28} className="text-teal-200" />
            <span className="text-xl font-bold">Coastal Breeze Moving</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('about')}
              className="text-sm font-medium hover:text-teal-200 transition"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="text-sm font-medium hover:text-teal-200 transition"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-sm font-medium hover:text-teal-200 transition"
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition"
            >
              Get Quote
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-teal-600 rounded-lg transition"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </nav>

        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onNavigate={(page) => {
            onNavigate(page);
            setIsMenuOpen(false);
          }}
        />
      </div>
    </header>
  );
}