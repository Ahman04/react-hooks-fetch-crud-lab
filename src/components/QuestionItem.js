import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    onDeleteQuestion(id);
  }

  function handleAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value) - 1; // convert 1-based -> 0-based
    onUpdateQuestion({ ...question, correctIndex: newCorrectIndex });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          aria-label="Correct Answer"
          value={correctIndex + 1} // show as 1-based for test
          onChange={handleAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index + 1}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
