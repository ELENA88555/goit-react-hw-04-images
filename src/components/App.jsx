import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from 'components/Button/Button';
import { fetchImages } from 'servises/fetchImages';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchImg, setSearchImg] = useState('');

  useEffect(() => {
    const fetchImageData = () => {
      if (searchImg !== '') {
        setLoading(true);

        fetchImages(searchImg)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(new Error('OOPS!'));
            }
            return response.json();
          })
          .then(({ hits, totalHits }) => {
            const imagesArr = hits.map(hit => ({
              id: hit.id,
              tags: hit.tags,
              webformatURL: hit.webformatURL,
              largeImageURL: hit.largeImageURL,
            }));
            setImages(imagesArr);
            setPage(1);
            setTotalImages(totalHits);
          })
          .catch(error => setError(error))
          .finally(() => setLoading(false));
      }
    };
    fetchImageData();
  }, [searchImg]);

  useEffect(() => {
    const fetchNewImages = () => {
      if (page !== 1) {
        setLoading();
        fetchImages(searchImg, page)
          .then(response => {
            if (!response.ok) {
              return Promise.reject(new Error('OOPS!'));
            }
            return response.json();
          })
          .then(({ hits }) => {
            const imagesArray = hits.map(hit => ({
              id: hit.id,
              tags: hit.tags,
              webformatURL: hit.webformatURL,
              largeImageURL: hit.largeImageURL,
            }));
            setImages(prevImage => [...prevImage, ...imagesArray]);
          })
          .catch(error => setError(error))
          .finally(() => setLoading(false));
      }
    };

    fetchNewImages();
  }, [page, searchImg]);

  const handleSearchForm = searchImg => {
    setSearchImg(searchImg);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getLargeImg = largeImageURL => {
    toggleModal();
    setModalImg(largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchForm}></Searchbar>
      <ImageGallery images={images} openModal={getLargeImg}></ImageGallery>
      {loading && <Loader></Loader>}
      {images.length >= 12 && images.length < totalImages && (
        <Button onClick={loadMoreBtn} />
      )}
      {showModal && <Modal url={modalImg} onClose={toggleModal} />}
    </div>
  );
};









// import React, { Component  } from 'react';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal';
// import { Button } from 'components/Button/Button';
// import { fetchImages } from 'servises/fetchImages';
// import { Loader } from './Loader/Loader';

// export class App extends Component {
//   state = {
//     images: [],
//     loading: false,
//     page: 1,
//     totalImages: 0,
//     error: '',
//     modalImg: '',
//     largeImageURL: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchImg, page } = this.state;
//     if (prevState.searchImg !== searchImg) {
//       this.setState(({ loading }) => ({ loading: !loading }));

//       fetchImages(searchImg)
//         .then(response => {
//           if (!response.ok) {
//             return Promise.reject(new Error('OOPS!'));
//           }
//           return response.json();
//         })
//         .then(({ hits, totalHits }) => {
//           const imagesArr = hits.map(hit => ({
//             id: hit.id,
//             tags: hit.tags,
//             webformatURL: hit.webformatURL,
//             largeImageURL: hit.largeImageURL,
//           }));
//           return this.setState({
//             page: 1,
//             images: imagesArr,
//             totalImages: totalHits,
//           });
//         })
//         .catch(error => this.setState({ error: 'OOPS' }))
//         .finally(() => this.setState(({ loading }) => ({ loading: !loading })));
//     }
//     if (prevState.page !== page && page !== 1) {
//       this.setState(({ loading }) => ({ loading: !loading }));

//       fetchImages(searchImg, page)
//         .then(response => {
//           if (!response.ok) {
//             return Promise.reject(new Error('OOPS!'));
//           }
//           return response.json();
//         })
//         .then(({ hits }) => {
//           const imagesArray = hits.map(hit => ({
//             id: hit.id,
//             tags: hit.tags,
//             webformatURL: hit.webformatURL,
//             largeImageURL: hit.largeImageURL,
//           }));
//           return this.setState(prevState => ({
//             images: [...prevState.images, ...imagesArray],
//           }));
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState(loading => ({ loading: !loading })));
//     }
//   }

//   handleSearchForm = searchImg => {
//     this.setState({ searchImg });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   loadMoreBtn = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   getLargeImg = largeImageURL => {
//     this.toggleModal();
//     this.setState({ modalImg: largeImageURL });
//   };

//   render() {
//     const { handleSearchForm, loadMoreBtn, toggleModal, getLargeImg } = this;
//     const { loading, totalImages, images, modalImg, showModal} =
//       this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={handleSearchForm}></Searchbar>
//         <ImageGallery images={images} openModal={getLargeImg}></ImageGallery>
//         {loading && <Loader></Loader>}
//         {images.length >= 12 && images.length < totalImages && (
//           <Button onClick={loadMoreBtn} />
//         )}
//         {showModal && <Modal url={modalImg} onClose={toggleModal} />}
//       </div>
//     );
//   }
// }


