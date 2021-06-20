import {Header} from './Header'
import {ContactList} from './ContactList'
import {Sidebar} from './Sidebar'

import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { Contact, FormContact, FormContactContextValue, ContactContextValue } from "./type";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormContactContext = createContext<FormContactContextValue | null>(null)
export function useFormContact() {
  const formContactContextValue = useContext(FormContactContext)

  if (!formContactContextValue) {
    throw new Error("formContact context used outside of a toast context provider")
  }

  return formContactContextValue
}

function FormContactContextProvider({ children }: { children: ReactNode }) {
  const {loadContacts} = useContact()
  const [formContact, setFormContact] = useState<FormContact>({
    'contact' : null,
    'formDisplay' : false
  });
  useEffect(() => {
    if(formContact){
      setFormContact(formContact);
    }
    
  }, [formContact]);

  function toggleFormContact(contactChild: Contact): void {
    console.log('Toggle');
    formContact.contact = contactChild
    setFormContact(formContact)

    const cloneFormContact = { ...formContact };
    formContact.formDisplay ? cloneFormContact.formDisplay = false : cloneFormContact.formDisplay = true
    setFormContact(cloneFormContact);
  }

  function editContact(contact: Contact){
    fetch('http://localhost:3000/contacts/'+formContact!.contact!.id, {
          method: "PUT",
          headers: { "Content-type":"application/json"},
          body: JSON.stringify(contact)
        }).then(() => {
          loadContacts();
        })
  }

  function addContact(contact: Contact){
    fetch('http://localhost:3000/contacts', {
          method: "POST",
          headers: { "Content-type":"application/json"},
          body: JSON.stringify(contact)
        }).then(() => {
          loadContacts();
        })
  }

  function saveFormContact(): void {
    let phone = (document.getElementById('phone') as HTMLInputElement).value;
    let firstname = (document.getElementById('firstName') as HTMLInputElement).value;
    let lastname = (document.getElementById('lastName') as HTMLInputElement).value;
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let date = (document.getElementById('date') as HTMLInputElement).value;
    let contactId = (document.getElementById('contactId') as HTMLInputElement).value;
    
    var newContact: Contact = {
    'id': undefined,
    'firstName': firstname,
    'lastName': lastname,
    'mail': email,
    'phone': parseInt(phone),
    'birthday': date
    }

    if(contactId === ""){
      newContact.id = undefined
    } else {
      newContact.id = parseInt(contactId)
    }
    
    if(newContact == null){
      console.log('formcontact contact null');
      return;
    } else {
      if(formContact.contact!.id != null){
        editContact(newContact)
      } else {
        addContact(newContact)
      }
    } 
  }
  return (
    <FormContactContext.Provider
      value={{
        formContact,
        toggleFormContact,
        editContact,
        addContact,
        saveFormContact
      }}
    >
      {children}
    </FormContactContext.Provider>
  )
}

const ContactContext = createContext<ContactContextValue | null>(null)
export function useContact() {
  const ContactContextValue = useContext(ContactContext)

  if (!ContactContextValue) {
    throw new Error("formContact context used outside of a toast context provider")
  }

  return ContactContextValue
}

function ContactContextProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Array<Contact>>([]);
  useEffect(() => {
    if (contacts.length === 0) {
    fetch("http://localhost:3000/contacts")
      .then((response) => response.json())
      .then((result: Array<Contact>) => {
        setContacts(result);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [contacts.length]);

  function searchContacts(q: String){
    fetch("http://localhost:3000/contacts?q="+q)
          .then((response) => response.json())
          .then((result: Array<Contact>) => {
            console.log(result);
            setContacts(result);
          })
          .catch((error) => {
            console.log(error);
          });
  }

  function deleteContact(q: string){
    return fetch("http://localhost:3000/contacts/"+q, {
        method: 'DELETE',
    }).then(response => response.json())
    .then((result: Array<Contact>) => {
      loadContacts();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function loadContacts(){
    return fetch("http://localhost:3000/contacts", {
    }).then(response => response.json())
    .then((result: Array<Contact>) => {
      setContacts(result)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
        searchContacts,
        deleteContact,
        loadContacts
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default function App() {
  return (
    <div className="App">
      <ContactContextProvider>
        <FormContactContextProvider>
          <Sidebar></Sidebar>
          <Header></Header>
          <ContactList></ContactList>
        </FormContactContextProvider>
      </ContactContextProvider>
    </div>
  );
}

