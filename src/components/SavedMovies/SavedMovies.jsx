import React from 'react';
import Section from '../Section/Section';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards }) {

    return (
        <Section sectionName="saved-movies">
            <SearchForm />
            <MoviesCardList cards={cards} />
        </Section>
    );
}

export default SavedMovies;
