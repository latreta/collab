import React from 'react';

const CommitsTable = (props) => {
    const {commits} = props;

    console.log(commits);

    return (
        <ol>
            {commits.map((commit, index) => {
                <li key={index}>{commit.name}</li>
            })}            
        </ol>
    );
}

export default CommitsTable;