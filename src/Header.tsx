import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useFormContact} from './App';
import { TextField, Button } from '@material-ui/core';
import {useContact} from './App';

export function Header() {
  const {searchContacts} = useContact()
    const {toggleFormContact} = useFormContact()

    function handleChange(e: string) {
      searchContacts(e);
    }
    return (
        <Container className="m-t-20 header-bar">
            <Row>
                <Col></Col>
                <Col>
                    Search : <TextField name="searchBar" id="searchBar" onChange={(event) =>  handleChange(event.target.value)}/>
                </Col>
                <Col>
                    <Button variant="contained" onClick={() => toggleFormContact(false)}>New contact</Button>
                </Col>
            </Row>
        </Container>
    );
  }