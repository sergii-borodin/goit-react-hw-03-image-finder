import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Header, SearchForm, Button, ButtonIcon, Input } from './SearchBar.styled'

import {BsSearch} from "react-icons/bs"

export class SearchBar extends Component {

    state = {
        searchWord: '',
    }

    onInputChange = (e) => {
        const inputValue = e.target.value;
        this.setState({ searchWord: inputValue });
    }
    
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state.searchWord);
    }

  render() {
    return (
<Header className="searchbar">
    <SearchForm onSubmit={this.onFormSubmit} className="form">
        <Button type="submit" className="button">
            <ButtonIcon className="button-label"><BsSearch/></ButtonIcon>
        </Button>
        <Input
            onChange={this.onInputChange}
            value={ this.state.searchWord}        
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
        />
    </SearchForm>
</Header>
    )
  }
}

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default SearchBar