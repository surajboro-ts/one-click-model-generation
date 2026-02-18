import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, TextInput, Typography } from '../../../components';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface SpotterPageProps {
  initialQuery?: string;
}

export const SpotterPage: React.FC<SpotterPageProps> = ({ initialQuery = '' }) => {
  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!initialQuery.trim()) {
      return;
    }
    setMessages((previous) => {
      if (previous.some((message) => message.content === initialQuery)) {
        return previous;
      }
      return [
        ...previous,
        { id: `user-${Date.now()}`, role: 'user', content: initialQuery },
        {
          id: `assistant-${Date.now() + 1}`,
          role: 'assistant',
          content: `I can help with "${initialQuery}". Try refining this by object type or date range.`,
        },
      ];
    });
    setInput('');
  }, [initialQuery]);

  const promptSuggestions = useMemo(
    () => [
      'Show top 10 liveboards by views',
      'Summarize billing changes this week',
      'Which data models have failed sync jobs?',
    ],
    [],
  );

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }

    const query = input.trim();
    setMessages((previous) => [
      ...previous,
      { id: `user-${Date.now()}`, role: 'user', content: query },
      {
        id: `assistant-${Date.now() + 1}`,
        role: 'assistant',
        content: `Generated response for: "${query}". This is a prototype response stream for Spotter parity.`,
      },
    ]);
    setInput('');
  };

  return (
    <div style={styles.page}>
      <div>
        <Typography variant="page-title" noMargin>
          Spotter
        </Typography>
        <Typography variant="body-normal" color="gray" noMargin>
          AI-assisted exploration for your analytics workspace
        </Typography>
      </div>

      <Card>
        <Card.Body>
          <div style={styles.promptRow}>
            {promptSuggestions.map((prompt) => (
              <Button key={prompt} variant="secondary" size="small" onClick={() => setInput(prompt)}>
                {prompt}
              </Button>
            ))}
          </div>

          <div style={styles.messages}>
            {messages.length === 0 && (
              <Typography variant="body-normal" color="gray" noMargin>
                Ask Spotter to summarize trends, find anomalies, or jump to relevant objects.
              </Typography>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.messageBubble,
                  ...(message.role === 'user' ? styles.userBubble : styles.assistantBubble),
                }}
              >
                <Typography variant="body-normal" noMargin color={message.role === 'user' ? 'white' : 'base'}>
                  {message.content}
                </Typography>
              </div>
            ))}
          </div>

          <div style={styles.inputRow}>
            <TextInput
              showLabel={false}
              placeholder="Ask Spotter anything"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <Button variant="primary" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'grid',
    gap: 14,
    padding: 24,
  },
  promptRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  messages: {
    display: 'grid',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 10,
    padding: '8px 12px',
  },
  userBubble: {
    justifySelf: 'end',
    backgroundColor: '#2770EF',
  },
  assistantBubble: {
    justifySelf: 'start',
    backgroundColor: '#F6F8FA',
    border: '1px solid #EAEDF2',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 8,
    alignItems: 'end',
  },
};

export default SpotterPage;
