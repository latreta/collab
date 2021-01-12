import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  commitMessage: {
    width: '300px',
  }
});

const columns = [
  { id: 'message', label: 'Mensagem do Commit', width: '300px', },
  {
    id: 'author',
    label: 'Autor',
    width: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: 'Data',
    width: 170,
    align: 'right',
  },
  {
    id: 'repository',
    label: 'Repositório',
    width: 170,
    align: 'right',
  },
];

const CommitTable = ({ commits, displayRepositoryName }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {commits.map((commit, index) => (
              <TableRow key={index}>
                <TableCell className={classes.commitMessage}>{commit.fields.message}</TableCell>
                <TableCell align="right">{commit.fields.author}</TableCell>
                <TableCell align="right">
                  {new Date(commit.fields.commit_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="right"><Link to={`/app/repositories/${commit.fields.repository_id.repository_name}`}>{commit.fields.repository_id.repository_name}</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CommitTable;
