import { createSelector } from '@reduxjs/toolkit';

// Selector pentru a obține lista de contacte:
export const selectContacts = state => state.contacts.items;

// Selector pentru a obține filtrul:
export const selectFilter = state => state.filter;

export const selectError = state => state.contacts.error;

export const selectIsLoading = state => state.contacts.isLoading;

// Selector pentru a filtra contactele în funcție de șirul de căutare:
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
