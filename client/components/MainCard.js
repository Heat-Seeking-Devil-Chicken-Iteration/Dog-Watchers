import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import '../stylesheets/App.css';
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import {
  Box,
  BoxShadow,
  Button,
  TextField,
  Input,
  InputAdornment,
  InputLabelProps,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import "../stylesheets/LandingPage.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import eboshi from "../../assets/eboshi.jpg";
import { useAuth } from "./Authorization";

const headerFont = createTheme({
  typography: {
    fontFamily: ["Pixelify Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#6a994e",
    },
    secondary: {
      main: "#9c6644",
    },
  },
});

export default function MainCard() {
  const [dogsArr, setDogsArr] = useState([]);
  let { user } = useAuth();
  // user = 6; //temporary hard coding
  // console.log('MainCard User:', user.googleId);
  const getDogs = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        // body: JSON.stringify({ userId: user.googleId }), 
      };
      console.log('getting dogs from database associated with userID: ', user );
      const response = await fetch('http://localhost:3000/fetchDogs/', requestOptions);
      const data = await response.json();
      if (!response.ok) console.log('ERROR, not 200');
      console.log('dogs', data.rows);
      setDogsArr(data.rows);
      // console.log('all dogs', dogsArr);
    } catch (error) {
      console.log(error, 'error accessing database');
    }
  };
  useEffect(() => {
    console.log('useEffect is working');
    getDogs();
  }, []);

  const boxBorder = blue[50];
  const cardStyle = {
    minWidth: 455,
    // flexBasis: "calc(50% - 30px)",
    margin: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Pixelify Sans",
    padding: 3,
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)", //transparent
    border: 2,
    borderColor: boxBorder,
  };

  // makes two columns for two cards per row
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <ThemeProvider theme={headerFont}>
        <Card sx={cardStyle}>
          <CardHeader
            fontFamily="Pixelify Sans"
            title="Eboshi"
            titleTypographyProps={{ variant: "h3" }}
            sx={{
              mb: 1,
              color: "pink",
              textShadow:
                "-1px -1px white, 1px 1px hotpink, 2px 2px hotpink, 3px 3px 3px #9e9e9e",
            }}
          />
          <CardMedia
            component="img"
            height="250"
            image={eboshi}
            alt="Pixelized picture of dog -?"
            sx={{ objectFit: "contain", mb: 1 }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
              Basic Dog Info
            </Typography>
            <br></br>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Edit
            </Button>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Add / Remove Watcher
            </Typography>
            <Box sx={{ display: "flex" }}>
              <IconButton aria-label="add">
                <AddCircleIcon color="primary" />
              </IconButton>
              <IconButton aria-label="remove">
                <RemoveCircleIcon color="primary" />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      </ThemeProvider>
    </div>
  );
}
