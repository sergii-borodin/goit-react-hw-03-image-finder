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
        page: 1,
        error : null,
        status: 'idle',
        modalImage: '',
        modalImageTags: '',
    }
    
    componentDidUpdate(prevProps, prevState) { 
        const searchWord = this.props.imageName;
        const currentPage = this.state.page;
        
        
        if (prevProps.imageName !== searchWord || prevState.page !== currentPage) {
            this.setState({status: 'pending'});
            if (prevProps.imageName !== searchWord) {
                this.resetPage();
                this.resetImages();
            }
            console.log('fetching');
                setTimeout(() => {
                    fetchImages(searchWord, currentPage)
                .then(response => response.json())
                .then(newImages => newImages.hits.length === 0 ? this.setState({status: 'no matches'}) : this.setState(prevState => {
                    return { images: [...prevState.images, ...newImages.hits], status: 'resolved' }
                }))
                .catch(error => this.setState({ error, status: 'rejected' }))
                }, 1000);
        }
    } 

    resetImages = () => {
        this.setState({ images: [] });
    }

    getToNextPage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }

    resetPage = () => {
        this.setState({ page: 1 });
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
                    <Button getToNextPage={this.getToNextPage} text={'Load More'} />
                    {modalImage !== '' && <Modal closeModal={this.closeModal}>{modalImage}</Modal>}
            </>
            )
        }
    }
}
    
ImageGallery.propTypes = {
        imageName: PropTypes.string.isRequired,
    }
