import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ GET /questions
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  // ✅ POST /questions
  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((addedQuestion) =>
        setQuestions((prev) => [...prev, addedQuestion])
      );
  }

  // ✅ DELETE /questions/:id
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    });
  }

  // ✅ PATCH /questions/:id
  function handleUpdateQuestion(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === data.id ? data : q))
        );
      });
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>

      <section>
        <button onClick={() => setShowForm(false)}>View Questions</button>
        <button onClick={() => setShowForm(true)}>New Question</button>
      </section>

      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
