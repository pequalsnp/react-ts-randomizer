import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface PropTypes {
  show: boolean;
  items: string[];
}

function ResultList(props: PropTypes) {
  if (!props.show) {
    return null;
  }
  return (
    <ListGroup>
       {props.items.map((result) => (
         <ListGroup.Item key={result}>{result}</ListGroup.Item>
       ))}
    </ListGroup>
  );
}

export default ResultList;
