import React, { useEffect } from 'react';
import styles from './ContactList.module.css';
import ContactItem from '../contactItem/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import { selectFilteredContacts } from '../../redux/selectors';
import PropTypes from 'prop-types';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
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
