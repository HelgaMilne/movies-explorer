import React from 'react';
import Section from '../Section/Section';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ cards, width }) {

    const onloaded = true;

    return (
        <Section sectionName="movies">
            <SearchForm />
            <Preloader onloaded={onloaded} />
            <MoviesCardList cards={cards} width={width} />
        </Section>
    );
}

export default Movies;
