import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { ModalBackdrop, ModalContent } from './Modal.styled'

export class Modal extends Component {

  render() {
    return (
        <ModalBackdrop>
            <ModalContent>
                <img src={this.props.children} alt=""/>
            </ModalContent>
        </ModalBackdrop>
    )
  }
}
Modal.propTypes = {}

export default Modal