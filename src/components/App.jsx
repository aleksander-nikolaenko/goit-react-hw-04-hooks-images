import { useEffect, useState } from 'react';
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

export const App = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(state.IDLE);
  const [searchItems, setSearchItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [LargeImgSrc, setLargeImgSrc] = useState('');
  const [LargeImgAlt, setLargeImgAlt] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setStatus(state.PENDING);
        await fetchPictures(query, page).then(data => {
          const getData = data.data.hits;
          if (getData.length === 0) {
            setStatus(state.REJECTED);
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
            setSearchItems(prevState => [...prevState, ...getData]);
            setTotalPages(Math.ceil(data.data.totalHits / 12));
            setStatus(state.RESOLVED);
            if (page > 1) smoothScroll();
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
      }
    };

    if (query === '') return;
    fetchImages();
  }, [query, page]);

  const smoothScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  const onFormSubmit = q => {
    if (query === q) {
      toast.warn("We're sorry, please enter a different query.", {
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
    setQuery(q);
    setPage(1);
    setSearchItems([]);
  };

  const handlerLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (img, alt) => {
    setLargeImgAlt(alt);
    setLargeImgSrc(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
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
            <ImageGallery images={searchItems} onClickImg={openModal} />
          )}
          {status === state.RESOLVED && page < totalPages && (
            <Button loadMore={handlerLoadMore} />
          )}
          {status === state.PENDING && (
            <>
              <ImageGallery images={searchItems} onClickImg={openModal} />
              <Loader />
            </>
          )}
        </Container>
      </main>

      {isOpen && (
        <Modal onClose={closeModal} src={LargeImgSrc} alt={LargeImgAlt} />
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
};
