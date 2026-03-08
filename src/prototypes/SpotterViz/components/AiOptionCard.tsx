import React from 'react';
import type { AiOptionData } from '../types';
import styles from './AiOptionCard.module.css';

interface AiOptionCardProps {
  option: AiOptionData;
  onViewSettings: (option: AiOptionData) => void;
}

export const AiOptionCard: React.FC<AiOptionCardProps> = ({ option, onViewSettings }) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{option.title}</p>
      {option.details.map((detail, i) => (
        <p key={i} className={styles.cardDetail}>{detail}</p>
      ))}
      <button
        type="button"
        className={styles.viewLink}
        onClick={() => onViewSettings(option)}
      >
        View settings
      </button>
    </div>
  );
};

export default AiOptionCard;
