import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
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

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
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
            value={this.state.query}
            onChange={event => this.handleChange(event)}
          />
        </form>
      </header>
    );
  }
}
