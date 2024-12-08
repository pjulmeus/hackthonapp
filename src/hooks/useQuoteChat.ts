import { useState, useCallback } from 'react';
import type { Message } from '../types/chat';
import { generateQuoteResponse } from '../utils/chat-responses';

export function useQuoteChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Hi! I'm your moving assistant from Coastal Breeze Moving. I'll help you get a quote for your move. To start, could you tell me where you're moving from?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content }]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate response
    const response = generateQuoteResponse(content, messages);
    
    setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    setLoading(false);
  }, [messages]);

  return {
    messages,
    sendMessage,
    loading,
  };
}