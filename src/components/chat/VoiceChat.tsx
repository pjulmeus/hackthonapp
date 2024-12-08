import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../../utils/icons';
import useSound from 'use-sound';
import { useVoiceChat } from '../../hooks/useVoiceChat';

export function VoiceChat() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { startCall, endCall, toggleMute, currentMessage, isProcessing } = useVoiceChat();
  
  const [playRingtone] = useSound('/sounds/ringtone.mp3', { volume: 0.5 });
  const [playDialtone] = useSound('/sounds/dialtone.mp3', { volume: 0.3 });

  const handleStartCall = async () => {
    playDialtone();
    setIsCallActive(true);
    await startCall();
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setIsMuted(false);
    endCall();
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toggleMute();
  };

  useEffect(() => {
    if (!isCallActive) {
      playRingtone();
    }
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-blue-50 to-teal-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200"
      >
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Coastal Breeze Moving</h3>
            <p className="text-teal-100">
              {isCallActive ? (
                isProcessing ? 'Listening...' : 'Connected'
              ) : (
                'Incoming Call...'
              )}
            </p>
          </div>
        </div>

        <div className="p-8 text-center">
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 text-gray-700"
              >
                {currentMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {isCallActive && (
            <div className="text-sm text-gray-500 mb-8">
              Call in progress
            </div>
          )}

          <div className="flex justify-center items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleMute}
              className={`p-4 rounded-full ${
                isMuted ? 'bg-gray-200' : 'bg-blue-100'
              }`}
              disabled={!isCallActive}
            >
              {isMuted ? (
                <Icons.MicOff size={24} className="text-gray-600" />
              ) : (
                <Icons.Mic size={24} className="text-blue-600" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isCallActive ? handleEndCall : handleStartCall}
              className={`p-6 rounded-full ${
                isCallActive
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isCallActive ? (
                <Icons.PhoneOff size={32} className="text-white" />
              ) : (
                <Icons.Phone size={32} className="text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}