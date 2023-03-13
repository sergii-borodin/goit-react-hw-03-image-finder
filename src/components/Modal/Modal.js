import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { ModalBackdrop, ModalContent } from './Modal.styled'

export class Modal extends Component {

    componentDidMount() { 
        window.addEventListener('keydown', this.onEscPress)
    }

    componentWillUnmount() { 
        window.removeEventListener('keydown', this.onEscPress)
    }
    
    onEscPress = (e) => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    onBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.closeModal();

        }
    }

  render() {
    return (
        <ModalBackdrop onClick={this.onBackdropClick}>
            <ModalContent>
                <img src={this.props.children} alt={this.props.tags} />
            </ModalContent>
        </ModalBackdrop>
    )
  }
}
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default Modal