import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import Button from 'components/Button/Button';
import * as ImageService from 'service/imageService';

// import fetchImages from 'components/API/fetchImages';

import { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    status: 'idle',
    error: null,
    isLastPageReached: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchQuery } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ status: 'pending' });
      this.getImages(searchQuery, currentPage);
    }
  }

  getImages = async (query, page) => {
    if (!query) {
      return;
    }
    try {
      const { hits, totalHits } = await ImageService.fetchImages(query, page);

      if (hits.length === 0) {
        this.setState({
          status: 'no matches',
        });
        return;
      }
      const totalPages = (totalHits / 12 + 1).toFixed();
      if (+totalPages === page) {
        this.setState({ isLastPageReached: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  onFormSubmit = newSearchName => {
    this.setState({
      searchQuery: newSearchName,
      currentPage: 1,
      images: [],
      error: null,
      status: 'idle',
    });
  };

  getToNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { status, images, isLastPageReached } = this.state;
    const isButtonShown = isLastPageReached || images.length === 0;

    return (
      <Container>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <ImageGallery status={status} images={images} />
        {!isButtonShown && (
          <Button onClick={this.getToNextPage} text={'Load More'} />
        )}
      </Container>
    );
  }
}
