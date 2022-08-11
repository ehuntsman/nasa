import React from 'react'
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Rover = () => {
  const [rover, setRover] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    let roverName = window.location.pathname.substring(1)
    let date = new Date()
    let fancyDate = date.toLocaleDateString()
    let dashdate = date.toISOString().split('T')[0]
    setRover(roverName)
    setDate(fancyDate)
    getPhotos(roverName, dashdate);
    setLoading(false)
  },[])

  const changeDate = (newDate) => {
    let fancyDate = newDate.toLocaleDateString()
    let dashdate = newDate.toISOString().split('T')[0]
    setDate(fancyDate)
    getPhotos(rover, dashdate);
  }

  const getPhotos = (name, formatteddate) => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${formatteddate}&api_key=DEMO_KEY`).then( (res) => {
      if(res.data.photos.length > 0) {
        setPhotos(res.data.photos);
        setError("")
      } else {
        setError("No photos found for this date")
      }
    })
  }

  if(loading){
    return (
      <div>
        <Typography variant="h4">
          Loading...
        </Typography>
      </div>
    )
  }else{
    return (
      <div className="background">
        <Box color="transparent" sx={{backdropFilter:"blur(20px) saturate(1.2) brightness(0.4)", p:3, borderRadius: 5, m:10}} className="dateInfo">
          <Typography variant="h6" color="common.white" component="div" sx={{ flexGrow: 1, textAlign: "center" }} >
            Photos from  on {date}
          </Typography>
          <Typography variant="p" color="#aaa" component="div" sx={{ flexGrow: 1, mb:3, textAlign: "center" }} >To see photos from a different date, select below</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select a Date"
              value={date}
              onChange={(newValue) => {
                changeDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {error ? 
          <Typography variant="h4" color="common.white" component="div" sx={{ flexGrow: 1, textAlign: "center" }} >{error}</Typography> 
        :
          <Container maxWidth="lg">
            <Grid container spacing={3} sx={{marginTop: "70px"}}>
              {photos.map( (photo, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined" sx={{background: "black", p:1, borderRadius: 2}}>
                      <Box>
                        <Typography level="h2" fontSize="md" sx={{ textAlign: "center", p:1 }} color="common.white">
                          {photo.camera.full_name}
                        </Typography>
                      </Box>
                      <AspectRatio minHeight="200px" >
                        <img
                          src={photo.img_src}
                          alt={photo.camera.full_name}
                        />
                      </AspectRatio>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        }
      </div>
    )
  }
}

export default Rover;