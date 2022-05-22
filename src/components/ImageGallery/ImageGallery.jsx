import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import ImgPlaceholder from '../../assets/ImagePlaceholder.jpg';

export const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((item, index) => {
        const {
          webformatURL: src = ImgPlaceholder,
          tags: alt = 'no image',
          largeImageURL = ImgPlaceholder,
        } = item;
        return (
          <ImageGalleryItem
            key={index}
            srcSmall={src}
            srcLarge={largeImageURL}
            alt={alt}
            onClick={onClickImg}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  onClickImg: PropTypes.func.isRequired,
};
