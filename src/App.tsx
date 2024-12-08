import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MoveForm } from './components/move/MoveForm';
import { InventoryManager } from './components/inventory/InventoryManager';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { VoiceChat } from './components/chat/VoiceChat';
import { EstimatePage } from './components/estimate/EstimatePage';
import type { MoveDetails, InventoryItem } from './types';

function App() {
  const [showInventory, setShowInventory] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'contact' | 'about'>('home');
  const [showChat, setShowChat] = useState(false);
  const [moveDetails, setMoveDetails] = useState<MoveDetails | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);

  const handleMoveSubmit = (details: MoveDetails) => {
    setMoveDetails(details);
    setShowInventory(true);
  };

  const handleInventoryComplete = (items: InventoryItem[]) => {
    setInventoryItems(items);
    setShowEstimate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <>
          <Hero />
          <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              {showEstimate && moveDetails ? (
                <EstimatePage
                  moveDetails={moveDetails}
                  items={inventoryItems}
                />
              ) : !showInventory ? (
                <>
                  <h2 className="text-3xl font-bold text-center mb-8">Get Your Moving Quote</h2>
                  {showChat ? (
                    <VoiceChat />
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <button
                          onClick={() => setShowChat(true)}
                          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition duration-200"
                        >
                          Start Voice Quote
                        </button>
                        <p className="mt-2 text-gray-600">or</p>
                      </div>
                      <MoveForm onSubmit={handleMoveSubmit} />
                    </div>
                  )}
                </>
              ) : (
                <InventoryManager onComplete={handleInventoryComplete} />
              )}
            </div>
          </main>
        </>
      ) : currentPage === 'services' ? (
        <ServicesPage />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : (
        <ContactPage />
      )}
    </div>
  );
}

export default App;