import React from 'react';
import {Link} from 'react-router-dom';

const CommitTable = ({commits}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Mensagem do commit</th>
          <th>Autor</th>
          <th>Data</th>
          <th>Repositório</th>
        </tr>
      </thead>
      <tbody>
        {commits.map((commit, index) => {
          let newDate = new Date(commit.fields.commit_date);
          return (
            <tr key={index}>
              <td>
                {commit.fields.message}
              </td>
              <td>{commit.fields.author}</td>
              <td>{newDate.toLocaleDateString()}</td>
              <td><Link to={`/app/repositories/${commit.fields.repository_id}`}>{commit.fields.repository_id}</Link></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export default CommitTable;