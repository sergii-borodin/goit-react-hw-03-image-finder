import React from 'react'
import PropTypes from 'prop-types'
// import Modal from 'components/Modal/Modal'

import { ListItem, Image } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ images, setModalImage  }) => {

   const onImageClick = (image) => {
       setModalImage(image);
    }
    return (<>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => 
    <ListItem key={id} onClick={() => onImageClick(largeImageURL)}>
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