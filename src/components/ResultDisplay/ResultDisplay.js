function ResultDisplay({ showResult, answer, data, currentIndex }) {
  if (!showResult) {
    return null;
  }

  return (
    <div className="result-display">
      <p className={answer === data[currentIndex].result ? "correct" : "wrong"}>
        {answer === data[currentIndex].result ? "正答です" : "誤答です"}
      </p>
      {answer !== data[currentIndex].result && (
        <p>正答は {data[currentIndex].result} でした。</p>
      )}
    </div>
  );
}

export default ResultDisplay;
