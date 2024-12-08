import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: 'home' | 'services' | 'contact' | 'about') => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <nav className="fixed right-0 top-0 bottom-0 w-64 bg-gradient-to-br from-blue-800 to-teal-800 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="block w-full text-left py-2 text-white hover:text-teal-200 transition"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('services')}
                className="block w-full text-left py-2 text-white hover:text-teal-200 transition"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="block w-full text-left py-2 text-white hover:text-teal-200 transition"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="block w-full text-left py-2 text-white hover:text-teal-200 transition"
              >
                Get Quote
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}