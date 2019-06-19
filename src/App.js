import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@material-ui/core';
import {muscles, exercises} from './store';

const App=(props)=>{

    return (
        <React.Fragment>
            <Header/>
            <Box align="center">
                <Exercises />
            </Box>
            <Footer/>
        </React.Fragment>
    );
}

export default App;
