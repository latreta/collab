import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const RepositoryTable = (props) => {
  let match = useRouteMatch();

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Repositório</th>
          <th>Autor</th>
        </tr>
      </thead>
      <tbody>
        {props.repositories.map((repository, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to={`${match.url}/${index}`}>{repository.title}</Link>
              </td>
              <td>{repository.author}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RepositoryTable;
