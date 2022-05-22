import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ srcSmall, srcLarge, alt, onClick }) => {
  return (
    <li className={styles.item}>
      <img
        className={styles.image}
        src={srcSmall}
        alt={alt}
        onClick={() => {
          onClick(srcLarge, alt);
        }}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  srcSmall: PropTypes.string.isRequired,
  srcLarge: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
