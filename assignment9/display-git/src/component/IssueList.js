import React, { useState, useEffect } from 'react';

function IssuesList() {
  const [issues, setIssues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchIssues();
  }, [pageNumber]);

  async function fetchIssues() {
    const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`);
    const data = await response.json();
    setIssues(data);
  }

  function handlePrevClick() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNextClick() {
    setPageNumber(pageNumber + 1);
  }

  const issueItems = issues.map(issue => <li key={issue.id}>{issue.title}</li>);

  return (
    <div>
      <h1>Page number {pageNumber}</h1>
      <button onClick={handlePrevClick}>Load Prev</button>
      <button onClick={handleNextClick}>Load Next</button>
      <ol>{issueItems}</ol>
    </div>
  );
}

export default IssuesList;
