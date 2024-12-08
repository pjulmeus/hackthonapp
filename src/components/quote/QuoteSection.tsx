import React from 'react';
import { MoveForm } from '../move/MoveForm';
import { VoiceChat } from '../chat/VoiceChat';
import type { MoveDetails } from '../../types';

interface QuoteSectionProps {
  showChat: boolean;
  onChatToggle: () => void;
  onSubmit: (details: MoveDetails) => void;
}

export function QuoteSection({ showChat, onChatToggle, onSubmit }: QuoteSectionProps) {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8">Get Your Moving Quote</h2>
      {showChat ? (
        <VoiceChat />
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <button
              onClick={onChatToggle}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition duration-200"
            >
              Start Voice Quote
            </button>
            <p className="mt-2 text-gray-600">or</p>
          </div>
          <MoveForm onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
}