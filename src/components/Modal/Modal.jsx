import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onClose, url }) => {
  useEffect(() => {
    const onEscClick = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onEscClick);
    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [onClose]);

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={clickBackdrop}>
      <div className={css.Modal}>
        <img src={url} alt="" />
      </div>
    </div>
  );
};
