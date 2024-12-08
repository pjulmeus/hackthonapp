import { QuoteState } from '../types/chat';

const questions = [
  "Could you tell me your current address?",
  "And where will you be moving to?",
  "When are you planning to move?",
  "What size is your current home?",
  "Do you have any stairs at either location?",
  "Will you need any additional services like packing or furniture assembly?",
  "Would you like to proceed with a detailed inventory of your items?",
];

let currentQuestionIndex = 0;
const quoteState: QuoteState = {};

export const generateVoiceResponse = async (lastMessage: string): Promise<string> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update quote state based on last message
  if (lastMessage) {
    switch (currentQuestionIndex) {
      case 0:
        quoteState.originAddress = lastMessage;
        break;
      case 1:
        quoteState.destinationAddress = lastMessage;
        break;
      case 2:
        quoteState.moveDate = lastMessage;
        break;
      // Add more cases as needed
    }
  }

  // Get next question
  const response = questions[currentQuestionIndex];
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;

  return response;
};