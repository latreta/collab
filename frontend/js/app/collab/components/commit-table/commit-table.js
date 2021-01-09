import React from 'react';
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
});

const columns = [
  { id: 'message', label: 'Mensagem do Commit', minWidth: 170 },
  {
    id: 'author',
    label: 'Autor',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: 'Data',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'repository',
    label: 'Repositório',
    minWidth: 170,
    align: 'right',
  },
];

const CommitTable = ({ commits }) => {
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
                <TableCell>{commit.fields.message}</TableCell>
                <TableCell align="right">{commit.fields.author}</TableCell>
                <TableCell align="right">
                  {new Date(commit.fields.commit_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="right"><Link to={`/app/repositories/${commit.fields.repository_id}`}>{commit.fields.repository_id}</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CommitTable;
