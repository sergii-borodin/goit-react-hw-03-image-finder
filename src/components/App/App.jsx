import ImageGallery from "components/ImageGallery/ImageGallery";
import SearchBar from "components/SearchBar/SearchBar";
import { Component } from "react"
import { Container } from "./App.styled";

export class App extends Component {

  state = {
  searchName: '',
}

  changeSearchName = (newSearchName) => {
    this.setState({ searchName: newSearchName });
  }

  render() {
    return (
    <Container>
        <SearchBar onFormSubmit={this.changeSearchName} />
        <ImageGallery imageName={this.state.searchName} />
    </Container>
  );
}
};
