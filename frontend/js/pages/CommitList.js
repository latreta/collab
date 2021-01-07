import axios from '../constants';
import React, { useEffect, useState } from 'react';

import CommitTable from '../app/collab/components/commit-table';

const CommitList = () => {
  const [commits, setCommits] = useState([]);

  const fetchCommits = () => {
      axios.get("http://127.0.0.1:8000/api/commits/")
      .then(response => response.data)
      .then(commits => setCommits(commits))
      .catch(error => console.error(error));
  }

  useEffect(()=>{
    fetchCommits();
  }, [])  

  return (
    <div>
      <CommitTable commits={commits}/>
    </div>
  );
};


export default CommitList;
