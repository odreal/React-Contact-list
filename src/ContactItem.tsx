import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import {useFormContact, useContact} from './App';
import {Contact} from "./type";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ContactItem (props: {
    contact: Contact
  }) {
    const {toggleFormContact} = useFormContact()
    const {deleteContact} = useContact()
    return (
        <Card className="card-content">
        <CardContent className="card-text">
            <Typography variant="h5" component="h2">
            {props.contact.firstName} {props.contact.lastName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
            {props.contact.mail}
            </Typography>
            <Typography color="textSecondary">
            {props.contact.phone}
            </Typography>
            <Typography variant="body2" component="p">
                {props.contact.birthday}
            <br />
            </Typography>
        </CardContent>
        <CardActions className="card-actions">
            <Button className="ico-button" onClick={() => deleteContact(props.contact.id)}>
                <i className="ico-content far fa-trash-alt"></i>
            </Button>
            <Button className="ico-button" onClick={() => toggleFormContact(props.contact)}>
            <i className="ico-content far fa-edit"></i>
            </Button>
        </CardActions>
        </Card>
    );
  };