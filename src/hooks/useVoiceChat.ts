import { useState, useCallback, useEffect } from 'react';
import { generateVoiceResponse } from '../utils/voice-responses';

export function useVoiceChat() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startCall = useCallback(async () => {
    setIsCallActive(true);
    setCurrentMessage("Hi! I'm your moving assistant from Coastal Breeze Moving. How can I help you today?");
    
    // Request microphone access
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Microphone access denied:', error);
      setCurrentMessage('Please enable microphone access to continue the call.');
    }
  }, []);

  const endCall = useCallback(() => {
    setIsCallActive(false);
    setCurrentMessage('');
  }, []);

  const toggleMute = useCallback(() => {
    // Implement mute functionality
  }, []);

  // Simulated voice processing
  useEffect(() => {
    if (isCallActive) {
      const processVoice = async () => {
        setIsProcessing(true);
        const response = await generateVoiceResponse(currentMessage);
        setCurrentMessage(response);
        setIsProcessing(false);
      };

      const interval = setInterval(processVoice, 10000);
      return () => clearInterval(interval);
    }
  }, [isCallActive, currentMessage]);

  return {
    startCall,
    endCall,
    toggleMute,
    currentMessage,
    isProcessing,
  };
}