import React from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import SearchFilter from './searchFilter/SearchFilter';
import styles from './App.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { addContact, deleteContact } from '../redux/slices/contactsSlice';
import { setFilter } from '../redux/slices/filterSlice';

// Importăm selectorii din selectors.js:
import {
  selectContacts,
  selectFilter,
  selectFilteredContacts,
} from '../redux/selectors';

const App = () => {
  // Folosim selectorii pentru a obține informațiile necesare:
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    console.log('New filter value:', value);
    dispatch(setFilter(value));
  };

  console.log('filteredContacts:', filteredContacts);
  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      <h2>Contacts:</h2>
      <SearchFilter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        className={styles.list}
      />
    </div>
  );
};

export default App;
