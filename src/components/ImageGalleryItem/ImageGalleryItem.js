import React from 'react'
import PropTypes from 'prop-types'

import { ListItem, Image } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ images, setModalImage  }) => {

    const onImageClick = (image, tags) => {
       setModalImage(image, tags);
    }
    return (<>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => 
    <ListItem key={id} onClick={() => onImageClick(largeImageURL, tags)}>
        <Image src={webformatURL} alt={tags} />
    </ListItem>)}
 </>
  )
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

export default ImageGalleryItem