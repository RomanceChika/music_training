function ResultDisplay({ showResult, answer, intervalData, currentIndex }) {
  if (!showResult) {
    return null;
  }

  return (
    <div className="result-display">
      <p
        className={
          answer === intervalData[currentIndex].resultNote ? "correct" : "wrong"
        }
      >
        {answer === intervalData[currentIndex].resultNote
          ? "正答です"
          : "誤答です"}
      </p>
      {answer !== intervalData[currentIndex].resultNote && (
        <p>正答は {intervalData[currentIndex].resultNote} でした。</p>
      )}
    </div>
  );
}

export default ResultDisplay;
