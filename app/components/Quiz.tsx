"use client";

import { useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import Results from "./Results";

type Q = { id: number; lecture: string; question: string; options: string[]; answerIndex: number };

export default function Quiz({ questions }: { questions: Q[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const total = questions.length;

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q, i) => acc + ((selected[i] ?? -1) === q.answerIndex ? 1 : 0), 0);
  }, [selected, questions]);

  const selectOption = (i: number) => {
    if (finished) return;
    const next = [...selected];
    next[current] = i;
    setSelected(next);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (current + 1 < total) setCurrent(current + 1);
    else setFinished(true);
  };

  const prevQuestion = () => {
    setShowFeedback(false);
    if (current > 0) setCurrent(current - 1);
  };

  const restart = () => {
    setCurrent(0);
    setSelected([]);
    setShowFeedback(false);
    setFinished(false);
  };

  return (
    <>
      {!finished && (
        <div className="card">
          <div className="row">
            <button className="btn" onClick={prevQuestion} disabled={current === 0}>Prev</button>
            <button className="btn primary" onClick={nextQuestion}>{current + 1 === total ? "Finish" : "Next"}</button>
            <button className="btn" onClick={() => setShowFeedback(!showFeedback)}>{showFeedback ? "Hide answer" : "Show answer"}</button>
            <span className="badge">Correct: {correctCount}/{total}</span>
          </div>
        </div>
      )}

      {finished ? (
        <>
          <Results total={total} correct={correctCount} onRestart={restart} />
          <div className="card">
            <h3>Review all questions</h3>
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                index={i}
                total={total}
                question={q}
                selectedIndex={selected[i]}
                showFeedback={true}
                onSelect={() => {}}
              />
            ))}
          </div>
        </>
      ) : (
        <QuestionCard
          index={current}
          total={total}
          question={questions[current]}
          selectedIndex={selected[current]}
          showFeedback={showFeedback}
          onSelect={selectOption}
        />
      )}
    </>
  );
}
