import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ContexProvider} from './contex';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { createMuiTheme } from '@material-ui/core/styles';//to apply theme
import { ThemeProvider } from '@material-ui/styles';//Need to warp the <App/> with it like Redux
import {purple, pink, red} from '@material-ui/core/colors';
const theme=createMuiTheme({ //Changing the default properties of the theme
    palette:{
        secondary:{
            main:red.A200,
            light:red.A400,
            dark:red.A700
        },
        //type:'dark',
    }
});

//console.log(theme)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
