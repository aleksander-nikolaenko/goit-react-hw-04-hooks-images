import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Oops! Entered an empty string', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
