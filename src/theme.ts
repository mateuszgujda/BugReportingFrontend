import { PaletteMode } from '@mui/material';
import {  grey } from '@mui/material/colors';


export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'dark' ? {
        main: '#00687b',
      } : {
        main: '#56d6f5'
      }),
    },
    secondary: {
      ...(mode === 'dark' ? {
        main: '#4b6269',
      } : {
        main: '#b2cbd3'
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#191c1d',
        paper: '#191c1d',
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});