import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../../components/icons';
import type { ChatMessage, AiOptionData, ChartConfig } from '../types';
import { processPrompt } from '../data/chartData';
import { AiOptionCard } from './AiOptionCard';
import styles from './SpotterPanel.module.css';

interface SpotterPanelProps {
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onChartConfigChange: (updates: Partial<ChartConfig>) => void;
  onViewSettings: (option: AiOptionData) => void;
}

export const SpotterPanel: React.FC<SpotterPanelProps> = ({
  messages,
  onMessagesChange,
  onChartConfigChange,
  onViewSettings,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    };

    const updated = [...messages, userMsg];
    onMessagesChange(updated);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processPrompt(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        options: response.options,
      };
      onMessagesChange([...updated, aiMsg]);
      onChartConfigChange(response.chartMutations);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Spotter</h3>
      </div>

      <div className={styles.suggestions}>
        <span className={styles.sparkle}>
          <span className={styles.sparkleGradient} />
        </span>
        <span className={styles.suggestionsText}>Ai suggestions</span>
        <button type="button" className={styles.viewAllLink}>View all</button>
      </div>

      <div className={styles.chatArea} ref={chatRef}>
        {messages.map(msg => (
          <div key={msg.id} className={styles.message}>
            <div className={`${styles.avatar} ${msg.role === 'user' ? styles.userAvatar : styles.spotterAvatar}`}>
              {msg.role === 'user' ? (
                <span className={styles.userInitial}>U</span>
              ) : (
                <span className={styles.spotterAvatarIcon}>
                  <Icon name="spotter" size="s" color="#FFFFFF" />
                </span>
              )}
            </div>
            <div className={styles.messageContent}>
              <p className={styles.messageText}>{msg.text}</p>
              {msg.options && (
                <div className={styles.optionsGroup}>
                  {msg.options.map((opt, i) => (
                    <AiOptionCard
                      key={i}
                      option={opt}
                      onViewSettings={onViewSettings}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={styles.message}>
            <div className={`${styles.avatar} ${styles.spotterAvatar}`}>
              <span className={styles.spotterAvatarIcon}>
                <Icon name="spotter" size="s" color="#FFFFFF" />
              </span>
            </div>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.promptBox}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter a prompt here"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className={styles.sendBtn} onClick={handleSubmit} aria-label="Send">
            <Icon name="paper-plane" size="s" />
          </button>
        </div>
        <p className={styles.disclaimer}>
          Spotter can make mistakes, please review data before proceeding.{' '}
          <span className={styles.disclaimerLink}>Learn more</span>
        </p>
      </div>
    </div>
  );
};

export default SpotterPanel;
