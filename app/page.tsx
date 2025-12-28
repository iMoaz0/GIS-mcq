"use client";

import { useEffect, useMemo, useState } from "react";
import Quiz from "./components/Quiz";
import data from "../data/questions.json";

export default function Page() {
  const [lecture, setLecture] = useState<string>("All");
  const [shuffled, setShuffled] = useState<boolean>(false);

  const lectures = useMemo(() => ["All", ...Array.from(new Set(data.map(q => q.lecture)))], []);

  const questions = useMemo(() => {
    let filtered = lecture === "All" ? data : data.filter(q => q.lecture === lecture);
    if (shuffled) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [lecture, shuffled]);

  useEffect(() => { window.scrollTo(0, 0); }, [lecture, shuffled]);

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>GIS MCQ Training</h2>
          <span className="badge">Questions: {questions.length}</span>
        </div>
        <div className="row">
          <label>
            <span className="small">Lecture filter</span><br />
            <select className="select" value={lecture} onChange={e => setLecture(e.target.value)}>
              {lectures.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
          <label>
            <span className="small">Order</span><br />
            <select className="select" value={shuffled ? "Shuffled" : "Original"} onChange={e => setShuffled(e.target.value === "Shuffled")}>
              <option>Original</option>
              <option>Shuffled</option>
            </select>
          </label>
        </div>
      </div>
      <Quiz questions={questions} />
    </div>
  );
}
