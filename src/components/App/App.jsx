import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchName: '',
    page: 1,
  };

  changeSearchName = newSearchName => {
    this.setState({ searchName: newSearchName, page: 1 });
  };

  // changePage = currentPage => {
  //   this.setState({ page: currentPage });
  // };

  getToNextPage = () => {
    console.log('hello');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Container>
        <SearchBar onFormSubmit={this.changeSearchName} />
        <ImageGallery
          imageName={this.state.searchName}
          page={this.state.page}
          changePage={this.changePage}
          getToNextPage={this.getToNextPage}
        />
      </Container>
    );
  }
}
