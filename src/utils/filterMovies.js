import { SHORT_DURATION } from './config.js';

function filterMovies(movies, options) {
    const regex = new RegExp(options.keyword, 'i');
    let filteredMovies = [];

    function search(movie) {
        const isFindedRu = regex.test(movie.nameRU);
        const isFindedEn = regex.test(movie.nameEN);
        return isFindedRu || isFindedEn;
    }

    filteredMovies = movies.filter((movie) => {
        if (options.filter) {
            return (search(movie) && movie.duration <= SHORT_DURATION);
        } else {
            return search(movie);
        }
    });

    return filteredMovies;
};

export default filterMovies;
