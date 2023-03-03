import React from 'react'
import PropTypes from 'prop-types'

import { ListItem, Image } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ images }) => {

    const onImageClick = (e) => {

    }
    return (<>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => 
    <ListItem key={id} onClick={onImageClick}>
        <Image src={webformatURL} alt={tags} />
    </ListItem>)}
 </>
  )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.object,
    )
}

export default ImageGalleryItem