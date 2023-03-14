import React, { Component } from 'react'
import Modal from 'components/Modal/Modal';

import PropTypes from 'prop-types'

import { ListItem, Image } from './ImageGalleryItem.styled'

export default class ImageGalleryItem extends Component {

    state = {
        modalImage: '',
        modalImageTags: '',
    }

    showModal = (modalImage, tags) => {
        this.setState({ modalImage: modalImage, modalImageTags: tags });
    };

    closeModal = () => {
        this.setState({ modalImage: '', modalImageTags: '' });
    };

    render() {
        const { modalImage, modalImageTags } = this.state;
        return (<>
                {this.props.images.map(({ id, webformatURL, largeImageURL, tags }) => 
            <ListItem key={id} onClick={() => this.showModal(largeImageURL, tags)}>
                <Image src={webformatURL} alt={tags} />
            </ListItem>)}
                {modalImage !== '' && <Modal closeModal={this.closeModal} tags={modalImageTags}>{modalImage}</Modal>}

         </>)
    }
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    )
}

