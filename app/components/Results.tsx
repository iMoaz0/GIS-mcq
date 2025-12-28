export default function Results({ total, correct, onRestart }: { total: number; correct: number; onRestart: () => void }) {
  const score = Math.round((correct / total) * 100);
  return (
    <div className="card">
      <h3>Results</h3>
      <p>You answered {correct} out of {total} correctly.</p>
      <p className="small">Score: {score}%</p>
      <div className="row">
        <button className="btn primary" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}
