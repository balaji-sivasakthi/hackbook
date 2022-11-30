import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../../../layouts/index';
import CriminalPic from '../../../assets/Criminal.png';
import Form from './Form';

function FaceDetect() {

  return (
    <Layout>
      <Grid container p={3} md={12} sx={{ backgroundColor: '#fff' }}>
        <Grid item md={4} mr={'20px'} alignItems={'center'}>
          
        </Grid>
        <Grid
          md={5}
          sx={{
            height: '330px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid
            rowSpacing={10}
            style={{
              width: '100%',
            }}
          >
            <Button  variant="contained">
              Choose a picture
            </Button>
            <Button sx={{marginLeft:"10px"}}  variant="contained">
              Capture
            </Button>
          </Grid>
          <Grid
            style={{
              width: '100%',
            }}
          >
           
            <Button  variant="contained">
              Find
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Next Container */}
      {/* <Form /> */}
      <Grid
        container
        sx={{
          backgroundColor: '#ffff',
          marginTop: '15px',
          height: '100%',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        md={12}
        p={5}
      >
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '400px',
          }}
        >
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item>Name</Grid>
            <Grid
              item
              style={{
                textAlign: 'start',
                width: '70%',
              }}
            >
              kariKada Bhai
            </Grid>
          </Grid>
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item>Category</Grid>
            <Grid
              style={{
                textAlign: 'start',
                width: '70%',
              }}
              item
            >
              Criminal/Missing
            </Grid>
          </Grid>{' '}
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item>Address</Grid>
            <Grid
              style={{
                textAlign: 'start',
                width: '70%',
              }}
              item
            >
              1/234, Street Name, Town, City
            </Grid>
          </Grid>{' '}
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Grid item>Crime</Grid>
            <Grid
              style={{
                textAlign: 'start',
                width: '70%',
                marginTop: '20px',
              }}
              item
            >
              1. Robbery
            </Grid>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: 'flex',
            alignItem: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <img
            style={{
              height: '80%',
              width: '100px',
            }}
            src={CriminalPic}
          />
          <Grid
            style={{ color: '#E65C00', marginTop: '5px', fontSize: '14px' }}
          >
            Accuracy 89.58%
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default FaceDetect;
