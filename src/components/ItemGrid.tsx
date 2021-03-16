import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import chunk from 'lodash.chunk';

interface PropTypes {
  items: Set<string>;
  deleteItem: (item: string) => void;
}

function ItemGrid(props: PropTypes) {
  const columns = chunk(Array.from(props.items.values()), Math.ceil(props.items.size/3));
  const elements = columns.map((columnItems: string[]) => (
    <Col key={columnItems.join('-')}>
    <ListGroup>
      {columnItems.map((item: string) => (
        <ListGroup.Item action key={item} onClick={() => props.deleteItem(item)}>{item}</ListGroup.Item>
      ))}
    </ListGroup>
    </Col>
  ));
  return (
    <Container>
      <Row>
        {elements}
      </Row>
    </Container>
  );
}

export default ItemGrid;