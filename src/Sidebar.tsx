import { Drawer, Grid, TextField, Button } from '@material-ui/core';
import {useFormContact, useContact} from './App';

export function Sidebar(){
    const {formContact, toggleFormContact, saveFormContact} = useFormContact()
    const {loadContacts, deleteContact} = useContact()
    const closeButton = (event : React.MouseEvent): void =>{
      toggleFormContact();
    }

    const saveButton = (event : React.MouseEvent): void =>{
     saveFormContact();
     loadContacts();
    }
    return (
        <Drawer anchor={'right'} open={formContact.formDisplay} onClose={closeButton}>
       
          <form noValidate autoComplete="off">
          <Grid container spacing={1} className={"top-m-5"} justify="center">
            <Grid item xs={5}>
              Add a new contact
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" color="secondary" onClick={closeButton}>
                X
              </Button>
              <TextField id="contactId" name="contactID" hidden defaultValue={formContact.contact?.id || ''}/>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={"top-m-5"} justify="center">
            <Grid item xs={5}>
              <TextField id="firstName" name="firstName" label="First name" defaultValue={formContact.contact?.firstName || ''}/>
            </Grid>
            <Grid item xs={5}>
              <TextField id="lastName" name="lastName" label="Last name" defaultValue={formContact.contact?.lastName || ''}/>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={"top-m-5"} justify="center">
            <Grid item xs={5}>
              <TextField id="email" name="email" label="Email" defaultValue={formContact.contact?.mail || ''} />
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
          <Grid container spacing={1} className={"top-m-5"} justify="center">
            <Grid item xs={5}>
              <TextField id="phone" name="phone" label="Phone" defaultValue={formContact.contact?.phone || ''}/>
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
          <Grid container spacing={1} className={"top-m-5"}  justify="center">
            <Grid item xs={5}>
            <TextField
              name="birthday"
              id="date"
              label="Birthday"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}

              defaultValue={formContact.contact?.birthday || ''}
            />
            </Grid>
            <Grid item xs={5}></Grid>
          </Grid>
          <Grid container spacing={1} className={"top-m-5"}  justify="center">            
            <Grid item xs={5} className={"center-align"}>
              <Button variant="contained" onClick={saveButton}>
                Save
              </Button>
              <Button className="ico-button" onClick={() => deleteContact(formContact.contact?.id || 0)}>
                <i className="ico-content far fa-trash-alt"></i>
            </Button>
            </Grid>
          </Grid>
          </form>
        </Drawer>
    );
  };