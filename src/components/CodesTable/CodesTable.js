import React from "react";
import "./CodesTable.css";

function CodesTable({ sortedResults }) {
  const keys = [...new Set(sortedResults.map((result) => result.key))];
  const degreeNames = [
    ...new Set(sortedResults.map((result) => result.degreeName)),
  ];

  const tableRows = keys.map((key, index) => (
    <tr key={index}>
      <td>{key}</td>
      {degreeNames.map((degreeName, degreeIndex) => {
        const result = sortedResults.find(
          (result) => result.key === key && result.degreeName === degreeName
        );
        if (!result || !result.userAnswer) {
          return <td key={degreeIndex}></td>;
        }
        return (
          <td
            key={degreeIndex}
            className={result.isCorrect ? "correct" : "wrong"}
          >
            {`回答: ${result.userAnswer}, 正答: ${result.codeName}`}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>キー</th>
          {degreeNames.map((degreeName, index) => (
            <th key={index}>{degreeName}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default CodesTable;
