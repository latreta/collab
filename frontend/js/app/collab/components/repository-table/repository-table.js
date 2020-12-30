import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const RepositoryTable = ({repositories}) => {
  let match = useRouteMatch();

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Repositório</th>
        </tr>
      </thead>
      <tbody>
        {repositories.map((repository, index) => {
          console.log(repository);
          return (
            <tr key={index}>
              <td>
                <Link to={`${match.url}/${index}`}>{repository.full_name}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RepositoryTable;
