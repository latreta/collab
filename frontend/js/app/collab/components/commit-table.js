import React from 'react';

const CommitTable = () => {
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
        <tr>
          <td>
            Bugfix - lalalalalala
          </td>
          <td>@usuario</td>
          <td>99/99/9999</td>
        </tr>
      </tbody>
    </table>
  );
};


export default CommitTable;