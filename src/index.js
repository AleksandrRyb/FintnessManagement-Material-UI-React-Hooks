import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ContexProvider} from './contex';
import { createMuiTheme } from '@material-ui/core/styles';//to apply theme
import { ThemeProvider } from '@material-ui/styles';//Need to warp the <App/> with it like Redux

import purple from '@material-ui/core/colors/purple';
const theme=createMuiTheme({ //Changing the default properties of the theme
    palette:{
        primary:purple,
    }
});

//console.log(theme)


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ContexProvider>
            <App />
        </ContexProvider>
    </ThemeProvider>
   , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
