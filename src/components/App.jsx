import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from '../services/pixabayAPI';
import { Button } from './Button';
import { Container } from './Container';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import styles from './App.module.css';
import { Modal } from './Modal';
const state = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export class App extends Component {
  state = {
    query: '',
    status: state.IDLE,
    searchItems: [],
    page: 1,
    totalPages: 0,
    isOpen: false,
    LargeImgSrc: '',
    LargeImgAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ status: state.PENDING });

      await fetchPictures(query, page).then(data => {
        const getData = data.data.hits;
        if (getData.length === 0) {
          this.setState({ status: state.REJECTED });
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          this.setState(prevState => ({
            searchItems: [...prevState.searchItems, ...getData],
            totalPages: Math.ceil(data.data.totalHits / 12),
            status: state.RESOLVED,
          }));
        }
      });
    } catch (error) {
      toast.warn("We're sorry, the search didn't return any results.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      // this.setState({ status: state.RESOLVED });

      if (page > 1) {
        setTimeout(this.smoothScroll, 250);
      }
    }
  };

  smoothScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  onFormSubmit = query => {
    this.setState({ query, page: 1, searchItems: [] });
  };

  handlerLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  openModal = (img, alt) => {
    const LargeImgAlt = alt;
    const LargeImgSrc = img;

    this.setState({ LargeImgAlt, LargeImgSrc, isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      searchItems,
      status,
      totalPages,
      page,
      isOpen,
      LargeImgSrc,
      LargeImgTag,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        <main>
          <Container>
            {status === state.IDLE && (
              <div className={styles.notification}>
                Gallery is empty, search for images.
              </div>
            )}
            {status === state.REJECTED && (
              <div className={styles.notification}>
                Gallery is empty, search for images.
              </div>
            )}
            {status === state.RESOLVED && (
              <ImageGallery images={searchItems} onClickImg={this.openModal} />
            )}
            {status === state.RESOLVED && page < totalPages && (
              <Button loadMore={this.handlerLoadMore} />
            )}
            {status === state.PENDING && <Loader />}
          </Container>
        </main>

        {isOpen && (
          <Modal
            onClose={this.closeModal}
            src={LargeImgSrc}
            alt={LargeImgTag}
          />
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}
