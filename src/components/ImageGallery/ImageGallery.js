import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { GalleryGrid } from './ImageGallery.styled';

export default class ImageGallery extends Component {
    
    state = {
        images: [],
    }
    
    componentDidUpdate(prevProps, prevState) { 
        if (prevProps.imageName !== this.props.imageName) {
            const API_KEY = '33114079-512de0a5f20d2e91152223fbb';
            fetch(`https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => response.json())
            // .then(images => console.log(images.hits))
                .then(images => this.setState({images: images.hits})) 
        }
    } 

    render() {
        return (
            <GalleryGrid className="gallery">
                <ImageGalleryItem images={this.state.images } />
            </GalleryGrid>
            )
        }
}
    
ImageGallery.propTypes = {
        imageName: PropTypes.string.isRequired,
    }
