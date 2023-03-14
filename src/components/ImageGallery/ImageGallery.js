import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
// import PropTypes from 'prop-types'
import Loader from 'components/Loader/Loader';

import { GalleryGrid } from './ImageGallery.styled';

const ImageGallery = ({status, images, setModalImage,showModal, closeModal}) => {
                
        if (status === 'pending') {
            return <>
                <GalleryGrid>
                    <ImageGalleryItem images={images} />
                </GalleryGrid>
                <Loader />
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
                <GalleryGrid>
                    <ImageGalleryItem images={images} setModalImage={setModalImage} />
                </GalleryGrid>                    
            </>
            )
        }
    }
    
ImageGallery.propTypes = {
}
    
    export default ImageGallery
