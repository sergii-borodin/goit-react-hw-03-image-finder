import React from 'react'
import PropTypes from 'prop-types'

import { MainButton } from './Button.styled'

const Button = ({text, onClick}) => {
  return (
      <MainButton onClick={onClick} type='button'>{ text }</MainButton>
  )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Button