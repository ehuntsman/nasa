import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Fade from '@mui/material/Fade';
import { createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Home = () => {
  const [rovers, setRovers] = useState([]);
  const [error, setError] = useState('');

  useEffect( () => {
    getRovers();
  },[])
  
  const getRovers = () => {
    axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY").then( (res) => {
      const allRovers = res.data.rovers;
      allRovers.forEach( rover => {
        const launch = new Date(rover.launch_date).toLocaleDateString();
        const landing = new Date(rover.landing_date).toLocaleDateString();
        rover.launch_date = launch
        rover.landing_date = landing
      });
      setRovers(allRovers);
    })
  }

  return (
    <div className="background">
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{marginTop: "70px"}}>
          {rovers.map(rover => (
            <Fade in={true} key={rover.id}>
              <Grid item xs={12} md={6} lg={3}>
                <Link to={`${rover.name.toLowerCase()}`}>
                  <Card sx={{backdropFilter:"blur(20px) saturate(1.2) brightness(0.4)", minWidth: 275, background: "transparent"}}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14, borderRadius: 5, textAlign: "center", mb: 2, background: `${rover.status == "active" ? "#f3955a" : "#1a1819"}`, opacity: 0.75}} color="white">
                        {rover.status}
                      </Typography>
                      <Typography variant="h4" component="div" color="#fff" sx={{ mb: 1.5 }}>
                        {rover.name}
                      </Typography>
                      <Grid container spacing={2} sx={{pb: 2}}>
                        <Grid item xs={6}>
                          <Typography variant="h5" color="#f3955a" sx={{ fontWeight: "bold", m: "0"}}>
                          {rover.launch_date}
                          </Typography>
                          <Typography color="#aaa" sx={{mt: -0.5}}>
                            Launched
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h5" color="#f3955a" sx={{ fontWeight: "bold", m: "0", textAlign: "right"}}>
                            {rover.landing_date}
                          </Typography>
                          <Typography color="#aaa" sx={{textAlign: "right", mt: -0.5}}>
                            Landed
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" component="p" color="#f3955a">
                        Cameras:
                      </Typography>
                      <Typography variant="body2">
                        <List aria-label="rover-cameras" sx={{p:0}}>
                          {rover.cameras.map(camera => (
                            <ListItem sx={{p: 0, pl: 0.5}}>
                              <Typography variant="body2" color="#aaa">{camera.name}</Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Typography>
                    </CardContent>
                    <Typography variant="h3" color="#444" sx={{ fontWeight: "bold", margin: "0 0 10px 10px"}}>
                      {rover.total_photos}<span style={{ fontSize: "15px", marginLeft: "5px" }}>photos</span>
                    </Typography>
                  </Card>
                </Link>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
