import React, { Fragment } from 'react';
import Header from '../Header/Header';
import { HomePage } from './Home.styled';

const Home = () => {
    return (
        <Fragment>
            <HomePage>
                <Header />
                </HomePage>
        </Fragment>
    );
};

export default Home;