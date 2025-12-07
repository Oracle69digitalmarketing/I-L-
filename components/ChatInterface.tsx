
import React, { useState, useRef, useEffect } from 'react';
import { Message, AgentType } from '../types';
import { sendMessageToAgent } from '../services/deepSeekService';
import ReactMarkdown from 'react-markdown';
import { useData } from '../context/DataContext';

const ChatInterface: React.FC = () => {
  const { addVerification, addAppointment, user } = useData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      agentType: 'FRONT_DESK',
      content: `[[AGENT:FRONT_DESK]] Ẹ kú àbọ̀, **${user.name}**! I am **IṢẹ́Lẹ̀**, powered by **DeepSeek V3.2**.\n\nAs we say in Ondo State: **"Iṣẹ́ loògùn ìṣẹ́"** (Work is the antidote to poverty).\n\nI am here to help you work smarter. Access the **Ondo Knowledge Base**, **Market Intelligence**, and your **Ondo-Locker**.\n\nAsk me anything about Laws, Prices, or Government Services.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [thoughtProcess, setThoughtProcess] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thoughtProcess]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setThoughtProcess("Initializing DeepSeek Engine...");

    const historyForApi = messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.content
      }));

    const botMsgId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, {
      id: botMsgId,
      role: 'model',
      content: '', 
      timestamp: new Date(),
      isLoading: true
    }]);

    try {
      await sendMessageToAgent(
        historyForApi, 
        userMsg.content, 
        (streamedText) => {
            if (streamedText.startsWith('[[THOUGHT]]')) {
                const thought = streamedText.replace('[[THOUGHT]]', '').trim();
                setThoughtProcess(thought);
                return; 
            }

            setThoughtProcess(null);
            setMessages(prev => prev.map(m => {
                if (m.id === botMsgId) {
                    let agent: AgentType = 'FRONT_DESK';
                    if (streamedText.includes('[[AGENT:LEGAL]]')) agent = 'LEGAL';
                    else if (streamedText.includes('[[AGENT:PROCESS]]')) agent = 'PROCESS';
                    else if (streamedText.includes('[[AGENT:DOCUMENT]]')) agent = 'DOCUMENT';
                    else if (streamedText.includes('[[AGENT:ADVISORY]]')) agent = 'ADVISORY';
                    else if (streamedText.includes('[[AGENT:MARKET]]')) agent = 'MARKET';
                    
                    return { ...m, content: streamedText, isLoading: false, agentType: agent };
                }
                return m;
            }));
        },
        { addVerification, addAppointment }
      );
    } catch (e) {
      setMessages(prev => prev.map(m => 
        m.id === botMsgId 
          ? { ...m, content: "Network Error: Could not reach Agent Core.", isError: true, isLoading: false } 
          : m
      ));
    } finally {
      setIsLoading(false);
      setThoughtProcess(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-NG';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event: any) => {
          console.error("Speech Error", event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') alert("Please allow microphone access.");
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
            setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
        }
      };
      
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const suggestedPrompts = [
    "Check Cocoa prices in Ondo Town",
    "What does the Constitution say about Land?",
    "How do I start a business in Akure?",
    "Check my Ondo-Locker for tax clearance"
  ];

  const getAgentBadge = (type?: AgentType) => {
      switch(type) {
          case 'LEGAL': return { label: 'Legal Agent', color: 'bg-indigo-700 text-white border-indigo-800', icon: '⚖️' };
          case 'PROCESS': return { label: 'Process Agent', color: 'bg-orange-600 text-white border-orange-700', icon: '⚙️' };
          case 'DOCUMENT': return { label: 'Document Agent', color: 'bg-blue-600 text-white border-blue-700', icon: '📄' };
          case 'ADVISORY': return { label: 'Advisory Agent', color: 'bg-teal-600 text-white border-teal-700', icon: '💡' };
          case 'MARKET': return { label: 'Market Agent', color: 'bg-emerald-600 text-white border-emerald-700', icon: '📈' };
          default: return { label: 'Front Desk', color: 'bg-purple-700 text-white border-purple-800', icon: '👋' };
      }
  };

  const cleanContent = (text: string) => text.replace(/\[\[AGENT:[A-Z_]+\]\]/g, '').trim();

  return (
    <div className="flex flex-col h-full bg-gray-50 relative font-sans">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide pb-44">
        {messages.map((msg) => {
          const badge = getAgentBadge(msg.agentType);
          return (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
               
               {msg.role === 'model' && (
                   <div className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-bold uppercase tracking-wider ml-4 w-fit shadow-sm border-b-0 ${badge.color}`}>
                       <span className="text-sm">{badge.icon}</span>
                       {badge.label}
                   </div>
               )}

              <div 
                className={`
                  max-w-[95%] md:max-w-[85%] p-6 shadow-md relative text-[15px] leading-7 font-normal
                  ${msg.role === 'user' 
                    ? 'bg-purple-900 text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white text-gray-900 rounded-2xl rounded-tl-none border border-gray-200'}
                `}
              >
                <div className={`
                    prose prose-base max-w-none 
                    ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}
                    prose-p:text-current prose-headings:font-bold prose-headings:tracking-tight
                    prose-strong:font-bold prose-strong:text-current
                    prose-li:marker:text-gray-400
                `}>
                    <ReactMarkdown>{cleanContent(msg.content)}</ReactMarkdown>
                </div>
                
                {msg.role === 'model' && !msg.isLoading && (
                    <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center">
                        {(msg.content.includes("Verified") || msg.content.includes("Ministry") || msg.content.includes("Constitution")) && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                Verified Source
                            </div>
                        )}
                        <span className="text-[10px] text-gray-400 font-medium ml-auto">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && thoughtProcess && (
            <div className="flex items-start animate-pulse ml-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl rounded-tl-none p-5 max-w-[80%] shadow-lg">
                    <div className="flex items-center gap-3 mb-3 border-b border-gray-700 pb-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">DeepSeek Engine Working</span>
                    </div>
                    <p className="text-sm font-mono text-gray-300">{thoughtProcess}</p>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-20">
        <div className="max-w-4xl mx-auto">
            {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {suggestedPrompts.map((prompt, i) => (
                        <button key={i} onClick={() => setInputValue(prompt)} className="whitespace-nowrap px-5 py-2.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:bg-white hover:border-purple-300 hover:text-purple-700 hover:shadow-sm transition-all">
                            {prompt}
                        </button>
                    ))}
                </div>
            )}
            
            <div className="relative flex items-end gap-3 p-2 bg-gray-50 border border-gray-300 rounded-2xl focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all shadow-inner">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask IṢẹ́Lẹ̀ about Laws, Markets, or Services..."
                className="w-full bg-transparent border-none text-gray-900 placeholder-gray-500 focus:ring-0 resize-none max-h-32 py-3 px-3 text-base font-medium"
                rows={1}
                style={{ minHeight: '52px' }}
            />
            
            <button 
                onClick={startListening} 
                className={`p-3 rounded-xl flex-shrink-0 mb-1 transition-all duration-200 border ${isListening ? 'bg-red-500 border-red-600 text-white animate-pulse shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                title="Voice Input"
            >
                {isListening ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 9.375v1.875a.75.75 0 01-1.5 0v-1.875A6.751 6.751 0 016 12.75v-1.5a.75.75 0 01.75-.75z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
                        <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 9.375v1.875a.75.75 0 01-1.5 0v-1.875A6.751 6.751 0 016 12.75v-1.5a.75.75 0 01.75-.75z" />
                    </svg>
                )}
            </button>

            <button 
                onClick={handleSend} 
                disabled={isLoading || !inputValue.trim()} 
                className={`p-3 rounded-xl flex-shrink-0 mb-1 transition-all duration-200 ${inputValue.trim() ? 'bg-purple-700 text-white hover:bg-purple-800 shadow-md transform hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                title="Send Message"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
