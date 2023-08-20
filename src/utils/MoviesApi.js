class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    }

    _request(endpoint, options) {
        return fetch(this._baseUrl + endpoint, options).then(this._checkResponse);
    }

    getMovies() {
        return this._request('/beatfilm-movies', {
            method: 'GET',
            headers: this._headers,
        });
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        'content-type': 'application/json; charset=UTF-8',
    },
});

export default moviesApi;
