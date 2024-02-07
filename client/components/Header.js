import React from 'react';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import CustomizedBreadcrumbs from './Breadcrumbs';
import '../stylesheets/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Header = () => {
  const headerFont = createTheme({  
    typography: {
      fontFamily: [
        'Pixelify Sans',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <div>
      <ThemeProvider theme={headerFont}>
        <Box
          minHeight="80vh"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            textAlign="center"
            sx={{
              color: "pink",
              textShadow:
                "-1px -1px white, 1px 1px hotpink, 2px 2px hotpink, 3px 3px 3px #9e9e9e",
            }}
          >
            O hai frens!
            <br></br>
            Welcome to Doggo Corp
          </Typography>
          <CustomizedBreadcrumbs />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Header;
