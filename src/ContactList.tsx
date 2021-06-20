import {ContactItem} from "./ContactItem";
import {useContact} from './App';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ContactList () {
    const {contacts} = useContact()
    return (
      <div>
        {contacts.map((res) => (
          <ContactItem key={res.id} contact={res}></ContactItem>
        ))}
      </div>
    );
  };