import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import CommitTable from '../app/collab/components/commit-table';

const CommitList = () => {
  let match = useRouteMatch();
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
