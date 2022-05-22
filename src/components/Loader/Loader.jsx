import { Audio } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Audio
        color="#3f51b5"
        height="80"
        width="80"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};
