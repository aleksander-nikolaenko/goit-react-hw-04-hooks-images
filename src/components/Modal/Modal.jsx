import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static props = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <div className={styles.backdrop} onClick={this.handleBackdrop}>
        <div className={styles.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}
