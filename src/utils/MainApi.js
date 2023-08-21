class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return (async function () {
                let result = await response.json();
                return Promise.reject(result);
            })()
        }
    }

    _request(endpoint, options) {
        return fetch(this._baseUrl + endpoint, options).then(this._checkResponse);
    }

    register(bodyObj) {
        return this._request('/signup', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(bodyObj),
        });
    }

    login(bodyObj) {
        return this._request('/signin', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(bodyObj),
        });
    }

    logout() {
        return this._request('/signout', {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        });
    }

    checkToken() {
        return this._request('/users/me', {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        });
    }

    getUserProfile() {
        return this._request('/users/me', {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        });
    }

    editUserProfile(bodyObj) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(bodyObj),
        });
    }

    getMovies() {
        return this._request('/movies', {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        });
    }

    addMovie(bodyObj) {
        return this._request('/movies', {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(bodyObj),
        });
    }

    deleteMovie(endUrl) {
        return this._request('/movies/' + endUrl, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        });
    }

}

const mainApi = new MainApi({
    baseUrl: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json; charset=UTF-8',
    },
});

export default mainApi;

/*
 baseUrl: 'https://api.cinema.nomoredomains.xyz',
*/