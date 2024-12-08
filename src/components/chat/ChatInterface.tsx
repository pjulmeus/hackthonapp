import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '../../utils/icons';
import { ChatMessage } from './ChatMessage';
import { useQuoteChat } from '../../hooks/useQuoteChat';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, loading } = useQuoteChat();
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      setIsTyping(true);
      await sendMessage(input);
      setInput('');
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[600px] bg-gradient-to-b from-blue-50 to-teal-50 rounded-3xl shadow-xl overflow-hidden max-w-md mx-auto border border-gray-200"
    >
      {/* Phone Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-3">
        <div className="flex items-center space-x-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <Icons.Phone size={20} />
          </motion.div>
          <div>
            <h3 className="font-semibold">Coastal Breeze Moving</h3>
            <p className="text-sm text-teal-100">
              {isTyping ? 'Typing...' : 'Moving Assistant'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2 p-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
          >
            <Icons.Image size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
          >
            <Icons.Paperclip size={20} />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="p-2 pt-0">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-teal-700 transition duration-200 disabled:opacity-50 w-10 h-10 flex items-center justify-center"
            >
              <Icons.SendHorizontal size={18} />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}