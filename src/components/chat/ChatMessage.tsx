import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Icons } from '../../utils/icons';
import type { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-end space-x-2 max-w-[85%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
            isUser ? 'bg-blue-100' : 'bg-teal-100'
          }`}
        >
          {isUser ? (
            <Icons.MessageCircle size={16} className="text-blue-600" />
          ) : (
            <Icons.Bot size={16} className="text-teal-600" />
          )}
        </motion.div>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
          }`}
        >
          <ReactMarkdown className="prose prose-sm max-w-none">
            {message.content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </motion.div>
  );
}