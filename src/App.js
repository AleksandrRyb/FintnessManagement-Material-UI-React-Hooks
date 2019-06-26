import React,{useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {Box} from '@material-ui/core';
import {FitnessContext} from "./contex";




const App=(props)=>{

    const context=useContext(FitnessContext);

    useEffect(()=>{
        context.onLoadData();
    },[]);

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
