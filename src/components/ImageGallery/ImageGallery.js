import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { GalleryGrid } from './ImageGallery.styled';

export default class ImageGallery extends Component {
    
    state = {
        images: [],
        page: 1,
    }
    
    componentDidUpdate(prevProps, prevState) { 
        const searchWord = this.props.imageName;
        if (prevProps.imageName !== searchWord) {
            const API_KEY = '33114079-512de0a5f20d2e91152223fbb';
            const API_URL = `https://pixabay.com/api/?q=${searchWord}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
            fetch(API_URL)
                .then(response => response.json())
            // .then(images => console.log(images.hits))
                .then(images => this.setState({images: images.hits})) 
        }
    } 

    render() {
        return (
            <>
                <GalleryGrid className="gallery">
                    <ImageGalleryItem images={this.state.images } />
                </GalleryGrid>
                <Button text={ 'Load More'} />
            </>
            )
        }
}
    
ImageGallery.propTypes = {
        imageName: PropTypes.string.isRequired,
    }
