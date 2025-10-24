import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAnswerChange(e, index) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData((prev) => ({ ...prev, answers: newAnswers }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddQuestion({
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 1:
        <input
          value={formData.answers[0]}
          onChange={(e) => handleAnswerChange(e, 0)}
        />
      </label>
      <label>
        Answer 2:
        <input
          value={formData.answers[1]}
          onChange={(e) => handleAnswerChange(e, 1)}
        />
      </label>
      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">1</option>
          <option value="1">2</option>
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
