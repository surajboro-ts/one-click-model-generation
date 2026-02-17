import React, { useState, useEffect, useRef } from 'react';
import { SpotterIcon } from './FigmaIcons';
import { Send, User } from 'lucide-react';

interface SpotterProps {
  initialQuery?: string;
}

export function Spotter({ initialQuery }: SpotterProps) {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm Spotter. I can help you analyze your data. What would you like to know?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle initial query
  useEffect(() => {
    if (initialQuery) {
       handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    // Scroll to bottom
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
       const response = getSimulatedResponse(text);
       setMessages(prev => [...prev, { role: 'assistant', content: response }]);
       setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="h-[60px] border-b border-[#eaedf2] flex items-center px-6 shrink-0">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <SpotterIcon className="w-5 h-5" />
           </div>
           <div>
              <h1 className="text-base font-medium text-[#1d232f]">Spotter</h1>
              <p className="text-xs text-[#777e8b]">AI Data Analyst</p>
           </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
         {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                     <SpotterIcon className="w-5 h-5" />
                  </div>
               )}
               
               <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === 'user' 
                     ? 'bg-[#1d232f] text-white rounded-br-none' 
                     : 'bg-gray-100 text-[#1d232f] rounded-bl-none'
               }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
               </div>

               {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                     <User size={16} className="text-gray-600" />
                  </div>
               )}
            </div>
         ))}
         
         {isTyping && (
            <div className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                     <SpotterIcon className="w-5 h-5" />
               </div>
               <div className="bg-gray-100 rounded-2xl rounded-bl-none px-5 py-4 flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
               </div>
            </div>
         )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#eaedf2] shrink-0">
         <div className="max-w-4xl mx-auto relative">
            <input 
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
               placeholder="Ask anything about your data..."
               className="w-full pl-5 pr-12 py-3 bg-white border border-[#dbdfe7] rounded-full focus:outline-none focus:border-[#71a1f4] focus:ring-1 focus:ring-[#71a1f4] shadow-sm transition-all text-[#1d232f]"
            />
            <button 
               onClick={() => handleSend(inputValue)}
               disabled={!inputValue.trim()}
               className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1d232f] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#323946] transition-colors"
            >
               <Send size={14} />
            </button>
         </div>
         <div className="text-center mt-2">
            <p className="text-[10px] text-[#a5acb9]">Spotter can make mistakes. Consider checking important information.</p>
         </div>
      </div>
    </div>
  );
}

function getSimulatedResponse(query: string): string {
   const q = query.toLowerCase();
   if (q.includes('sales')) {
      return "Based on your data, total sales for the last quarter were $4.2M, which is a 15% increase year-over-year. The top performing region was North America ($1.8M).";
   }
   if (q.includes('profit') || q.includes('margin')) {
      return "The gross profit margin stands at 32% this month, slightly down from 34% last month. This is primarily due to increased shipping costs.";
   }
   if (q.includes('customer') || q.includes('churn')) {
      return "Customer acquisition is up by 8% this week. Churn rate remains stable at 2.1%.";
   }
   return "I've analyzed the data for '" + query + "'. Here's a visualization that might help...";
}
