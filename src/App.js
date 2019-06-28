import React,{useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Exercises from './components/Exercisees/Exercises';
import {Box} from '@material-ui/core';
import {FitnessContext} from "./contex";
import { makeStyles } from '@material-ui/core/styles';//For functional Components

const useStyles=makeStyles(theme=>({
    '@global':{
        'html. body. #root ':{
            height:'100%'
        }
    }
}));



const App=(props)=>{
    const classes = useStyles();
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
