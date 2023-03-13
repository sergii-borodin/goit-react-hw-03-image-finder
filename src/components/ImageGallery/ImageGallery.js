import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import fetchImages from 'components/API/fetchImages';

import { GalleryGrid } from './ImageGallery.styled';

export default class ImageGallery extends Component {
    
    state = {
        images: [],
        error : null,
        status: 'idle',
        modalImage: '',
        modalImageTags: '',
        isLastPageReached: false,
    }
    
    componentDidUpdate(prevProps, prevState) { 
        const searchWord = this.props.imageName;
        const currentPage = this.props.page;
        
        if (currentPage > 1) {
                const CARD_HEIGHT = 300; // preview image height
                window.scrollBy({
                    top: CARD_HEIGHT * 2,
                    behavior: 'smooth',
                });
            };
        
        if (prevProps.imageName !== searchWord || prevProps.page !== currentPage) {
            this.setState({ status: 'pending' });

            if (prevProps.imageName !== searchWord) {
                this.resetImages();
            }
                    fetchImages(searchWord, currentPage)
                        .then(newImages => {
                            const totalPages = (newImages.totalHits / 12 + 1).toFixed();
                            if (+totalPages === currentPage) {
                                this.setState({ isLastPageReached: true });
                            }

                        return newImages.hits.length === 0 ? this.setState({status: 'no matches'}) : this.setState(prevState => {
                    return { images: [...prevState.images, ...newImages.hits], status: 'resolved' }
                })
                    })
                .catch(error => this.setState({ error, status: 'rejected' }))
        }
    } 

    resetImages = () => {
        this.setState({ images: [] });
    }

    onLoadMoreButtonClick = () => {
        this.props.getToNextPage();
    }

    showModal = (modalImage, tags) => {
        this.setState({ modalImage: modalImage, modalImageTags: tags })
    }

    closeModal = () => {
        this.setState({ modalImage: '', modalImageTags: '' })
    }

    render() {

        
        const { status, modalImage } = this.state;
        
        if (status === 'pending') {
            return <>
                <GalleryGrid className="gallery">
                    <ImageGalleryItem images={this.state.images } setModalImage={this.showModal} />
                </GalleryGrid>
                <Loader />
                {modalImage !== '' && <Modal closeModal={this.closeModal}>{modalImage}</Modal>}
            </>
            
        }
        if (status === 'rejected') {
            return <p>Something went wrong</p>
        }
        if (status === 'no matches') {
            return <p>No matches found. Try to modify your search parameters!</p>
        }
        if (status === 'resolved') {
            return (
            <>
                <GalleryGrid className="gallery">
                    <ImageGalleryItem images={this.state.images } setModalImage={this.showModal} />
                </GalleryGrid>
                    {!this.state.isLastPageReached && <Button onClick={this.onLoadMoreButtonClick} text={'Load More'} />}
                    
                    {modalImage !== '' && <Modal closeModal={this.closeModal}>{modalImage}</Modal>}
            </>
            )
        }
    }
}
    
ImageGallery.propTypes = {
        imageName: PropTypes.string.isRequired,
    }
