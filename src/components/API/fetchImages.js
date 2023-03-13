const fetchData = (searchWord, currentPage) => {
    const API_KEY = '33114079-512de0a5f20d2e91152223fbb';
    const API_URL = `https://pixabay.com/api/?q=${searchWord}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    return fetch(API_URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
}

export default fetchData
                