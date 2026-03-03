import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GlobalHeader } from '../../components';
import { systemColors } from '../../tokens/colors';
import { ChatSidebar } from './components/ChatSidebar';
import { PromptBar } from './components/PromptBar';
import { UserMessage } from './components/UserMessage';
import { AIResponse } from './components/AIResponse';
import { TypingIndicator } from './components/TypingIndicator';
import {
  initialMessages,
  generateMessageId,
  getCurrentTime,
  getRandomAIResponse,
} from './data/mockData';
import type { ChatMessage } from './data/mockData';

const TYPING_DELAY = 1800;

const MuseChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isAITyping, setIsAITyping] = useState(false);
  const [latestMsgId, setLatestMsgId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAITyping, scrollToBottom]);

  const handleSend = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      text,
      timestamp: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLatestMsgId(userMsg.id);
    setIsAITyping(true);

    setTimeout(() => {
      const template = getRandomAIResponse();
      const aiMsg: ChatMessage = {
        id: generateMessageId(),
        role: 'ai',
        text: template.text,
        timestamp: getCurrentTime(),
        chart: template.chart,
      };
      setIsAITyping(false);
      setMessages((prev) => [...prev, aiMsg]);
      setLatestMsgId(aiMsg.id);
    }, TYPING_DELAY);
  }, []);

  return (
    <div style={styles.root}>
      <style>{keyframes}</style>
      <GlobalHeader
        userName="Royal Enfield"
        searchPlaceholder="Search in your library"
        notificationCount={1}
      />
      <div style={styles.body}>
        <ChatSidebar />
        <div style={styles.chatColumn}>
          <div ref={scrollRef} style={styles.messageArea}>
            <div style={styles.messageList}>
              {messages.map((msg) => {
                const shouldAnimate = msg.id === latestMsgId;
                if (msg.role === 'user') {
                  return (
                    <UserMessage
                      key={msg.id}
                      text={msg.text}
                      timestamp={msg.timestamp}
                      animate={shouldAnimate}
                    />
                  );
                }
                return (
                  <AIResponse
                    key={msg.id}
                    text={msg.text}
                    chart={msg.chart}
                    animate={shouldAnimate}
                  />
                );
              })}
              {isAITyping && <TypingIndicator />}
            </div>
          </div>
          <PromptBar onSend={handleSend} disabled={isAITyping} />
        </div>
      </div>
    </div>
  );
};

const keyframes = `
@keyframes museChatBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-6px); opacity: 1; }
}
@keyframes museChatFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: systemColors.light['background-base'],
    overflow: 'hidden',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  chatColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  messageArea: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  messageList: {
    maxWidth: 902,
    margin: '0 auto',
    padding: '0 0 24px 0',
  },
};

export default MuseChat;
