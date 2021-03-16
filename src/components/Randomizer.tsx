import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

import ItemGrid from './ItemGrid';
import ResultList from './ResultList';

interface ResultState {
    show: boolean;
    result: string[];
}

function handleFormInput(setFormState: { (value: React.SetStateAction<string>): void; (arg0: any): void; }, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, clearAlert: () => void) {
    setFormState(event.target.value);
    clearAlert();
}

function handleFormSubmit(selections: Set<string>, setSelections: (selections: Set<string>) => void, item: string, setFormState: (value: string) => void, onError: (item: string) => void, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selections.has(item)) {
        onError(item)
    } else {
        const newItems = new Set(selections);
        newItems.add(item);
        setSelections(newItems);
    }
    setFormState("");
}

function renderAlert(showAlert: string | undefined, setShowAlert: (alert: (string | undefined)) => void) {
    if (showAlert) {
        return (
            <Alert variant="danger" onClose={() => setShowAlert(undefined)} dismissible>
                Duplicate entry {showAlert} found
            </Alert>
        );
    }
    return null;
}

function randomizeElements(selections: Set<string>, setResultState: (state: ResultState) => void) {
  const selectionArray = Array.from(selections);
  var result = new Array(selectionArray.length);
  for (var i = 0; i < selectionArray.length; i++) {
      var j = Math.floor(Math.random() * (i + 1))
      if (i !== j) {
          result[i] = result[j];
      }
      result[j] = selectionArray[i];
  }
  setResultState({show: true, result: result});
}

function removeItem(selections: Set<string>, setSelections: (selections: Set<string>) => void, item: string, setResultState: (resultState: ResultState) => void) {
    const newItems = new Set(selections)
    newItems.delete(item);
    setSelections(newItems);
    setResultState({show: false, result: []})
}

function Randomizer() {
    const [selections, setSelections] = useState<Set<string>>(new Set());
    const [formState, setFormState] = useState<string>("");
    const [showAlert, setShowAlert] = useState<string | undefined>();
    const [resultState, setResultState] = useState<ResultState>({show: false, result: []});
    return (
        <Container>
            <Row>
                <ItemGrid items={selections} deleteItem={(item: string) => removeItem(selections, setSelections, item, setResultState)}/>
            </Row>
            <Form onSubmit={(ev) => handleFormSubmit(selections, setSelections, formState, setFormState, (duplicate: string) => setShowAlert(duplicate), ev)}>
                <Row>
                    <Col>
                    {renderAlert(showAlert, setShowAlert)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControl placeholder="Item" value={formState} onChange={(ev) => handleFormInput(setFormState, ev, () => setShowAlert(undefined))} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type='submit'>Add Item</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => randomizeElements(selections, setResultState)}>Randomize Items</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col>
                    <ResultList show={resultState.show} items={resultState.result}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Randomizer;