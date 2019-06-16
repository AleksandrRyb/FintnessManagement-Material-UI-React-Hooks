import React, {Component} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {AppBar, Toolbar, IconButton, Typography, Button, Box} from '@material-ui/core';

class App extends Component {
    render() {
        return (
            <React.Fragment>
              <Header/>
                <Box align="center">
                    <Exercises/>
                </Box>
              <Footer/>
            </React.Fragment>
        );
    }
}

export default App;
