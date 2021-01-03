import React from 'react';

const CommitTable = ({commits}) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Mensagem do commit</th>
          <th>Autor</th>
          <th>Data</th>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export default CommitTable;