import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider, MantineColorsTuple  } from '@mantine/core'
import App from './App.tsx'
import './index.css'

import '@mantine/core/styles.css';

const myColor: MantineColorsTuple = [
  '#ecf4ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748dc0',
  '#5f7cb7',
  '#5474b4',
  '#44639f',
  '#3a5890',
  '#2c4b80'
];
// Your theme configuration is merged with default theme
const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
  colors: {
    myColor,
  },
  
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
  <StrictMode>
    <App />
  </StrictMode>
  </MantineProvider>
)
