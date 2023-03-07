import React from 'react'
import PropTypes from 'prop-types'

import { MainButton } from './Button.styled'

const Button = ({text, getToNextPage}) => {
  return (
      <MainButton onClick={getToNextPage} type='button'>{ text }</MainButton>
  )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Button