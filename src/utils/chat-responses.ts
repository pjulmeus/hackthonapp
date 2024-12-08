import type { Message, QuoteState } from '../types/chat';

const extractQuoteState = (messages: Message[]): QuoteState => {
  const state: QuoteState = {};
  
  // Extract information from previous messages
  messages.forEach(msg => {
    const content = msg.content.toLowerCase();
    
    // Simple example of information extraction
    if (content.includes('moving from')) {
      state.originAddress = content;
    }
    if (content.includes('moving to')) {
      state.destinationAddress = content;
    }
    // Add more extraction logic as needed
  });

  return state;
};

const getNextQuestion = (state: QuoteState): string => {
  if (!state.originAddress) {
    return "Could you provide the address you're moving from?";
  }
  if (!state.destinationAddress) {
    return "Great! And where are you moving to?";
  }
  if (!state.moveDate) {
    return "When are you planning to move?";
  }
  if (!state.homeSize) {
    return "What size is your current home? (studio, 1-bedroom, etc.)";
  }
  if (state.hasStairs === undefined) {
    return "Are there any stairs at either location?";
  }
  if (state.hasStairs && !state.flightCount) {
    return "How many flights of stairs are there?";
  }
  
  return "Great! I have all the information needed for your quote. Based on the details you've provided, I'll help you proceed with a detailed inventory of your items. Would you like to start that now?";
};

export const generateQuoteResponse = (userMessage: string, previousMessages: Message[]): string => {
  const state = extractQuoteState([...previousMessages, { type: 'user', content: userMessage }]);
  return getNextQuestion(state);
};