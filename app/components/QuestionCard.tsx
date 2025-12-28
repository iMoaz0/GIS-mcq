import React from "react";

type Props = {
  index: number;
  total: number;
  question: { id: number; lecture: string; question: string; options: string[]; answerIndex: number };
  selectedIndex?: number;
  showFeedback?: boolean;
  onSelect: (i: number) => void;
};

export default function QuestionCard({ index, total, question, selectedIndex, showFeedback, onSelect }: Props) {
  const progress = Math.round(((index) / total) * 100);

  return (
    <div className="card">
      <div className="header">
        <div>
          <div className="small">{question.lecture}</div>
          <h3>Q{index + 1}: {question.question}</h3>
        </div>
        <div style={{ minWidth: 180 }}>
          <div className="small">Progress</div>
          <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <div className="row">
        {question.options.map((opt, i) => {
          const isCorrect = showFeedback && i === question.answerIndex;
          const isWrong = showFeedback && selectedIndex === i && i !== question.answerIndex;
          const cls = `option ${isCorrect ? "correct" : isWrong ? "wrong" : ""}`;
          return (
            <div key={i} className={cls} onClick={() => onSelect(i)}>
              {opt}
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <div style={{ marginTop: 10 }}>
          <span className="badge">Answer: {question.options[question.answerIndex]}</span>
        </div>
      )}
    </div>
  );
}
