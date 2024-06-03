import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121',
    },
    background: {
      default: '#303030',
      paper: '#080808',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

function Header() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/*
              <MenuIcon />
              */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gerenciamento de Projetos
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
