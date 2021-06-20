export type Contact = {
    id?: number,
    firstName?: string,
    lastName?: string,
    mail?: string,
    phone?: number,
    birthday?: string
};

export type FormContact = {
    contact: Contact | null,
    formDisplay: boolean,
}

export type FormContactContextValue = {
    formContact: FormContact,
    toggleFormContact: Function,
    saveFormContact: Function,
    editContact: Function,
    addContact: Function
}

export type ContactContextValue = {
    contacts: Array<Contact>,
    setContacts: Function,
    searchContacts: Function,
    deleteContact: Function,
    loadContacts: Function
}