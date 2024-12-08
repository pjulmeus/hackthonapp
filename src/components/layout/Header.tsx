import React, { useState } from 'react';
import { Icons } from '../../utils/icons';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onNavigate: (page: 'home' | 'services') => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Icons.Truck size={32} className="text-teal-200" />
            <h1 className="text-2xl font-bold">Coastal Breeze Moving</h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-200 transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-200 transition"
                >
                  Get Quote
                </button>
              </li>
              <li>
                <a href="#tracking" className="hover:text-teal-200 transition">
                  Track Move
                </a>
              </li>
            </ul>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-teal-600 rounded-lg transition"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>

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