import React from 'react';

function IntervalsTable({ sortedResults }) {
  const baseNotes = [...new Set(sortedResults.map(result => result.baseNote))];
  const intervals = [...new Set(sortedResults.map(result => result.interval))];
  const directions = ['up', 'down'];

  const tableRows = baseNotes.map((baseNote, index) => (
    <tr key={index}>
      <td>{baseNote}</td>
      {intervals.map(interval => (
        <React.Fragment>
          {directions.map(direction => {
            const result = sortedResults.find(result => result.baseNote === baseNote && result.interval === interval && result.direction === direction);
            if (!result || !result.userAnswer) {
              return <td></td>;
            }
            return (
              <td className={result.isCorrect ? 'correct' : 'wrong'}>
                {`回答: ${result.userAnswer}, 正答: ${result.resultNote}`}
              </td>
            );
          })}
        </React.Fragment>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>音名</th>
          <th colSpan={intervals.length}>上</th>
          <th colSpan={intervals.length}>下</th>
        </tr>
        <tr>
          {intervals.map(interval => (
            <th>{interval}</th>
          ))}
          {intervals.map(interval => (
            <th>{interval}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export default IntervalsTable;