import React, { useEffect, useState } from 'react';
import styles from './ContactList.module.css';
import ContactItem from '../contactItem/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import { selectFilteredContacts, selectIsLoading } from '../../redux/selectors';
import PropTypes from 'prop-types';
import { Loader } from '../loader/loader';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(fetchContacts());

    // Afișează loader-ul pentru 1 secundă chiar dacă datele se încarcă mai repede:
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    // Anulează timeout-ul la demontare:
    return () => clearTimeout(loaderTimeout);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {showLoader && <Loader />}{' '}
      {/* Afișează Loader-ul doar dacă showLoader este true */}
      {!showLoader && (
        <ul className={styles.label}>
          {contacts && contacts.length > 0 ? (
            contacts.map(contact => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onDeleteContact={handleDeleteContact}
              />
            ))
          ) : (
            <p>No contacts available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
