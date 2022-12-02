import {
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Layout from '../../../layouts/index';
import Webcam from 'react-webcam';
import Tesseract, { detect } from 'tesseract.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { NavLink } from 'react-router-dom';
import Header from '../../../components/common/Header';
import { drawRect } from '../../../utils/drawRect';
import Button from '../../../components/Button';
import CriminalPic from '../../../assets/Criminal.png';
import Form from './Form';

const WebcamComponent = () => <Webcam />;
function FaceDetect() {
  const [carinfo, setcarinfo] = useState([
    {
      img: 'https://cdni.autocarindia.com/ExtraImages/20180402113123_NumberPlate_Swift.jpg',
      name: 'Balaji',
      createdAt: '12/12/22',
      carNumber: 'HR26DK8337',
    },
    {
      img: 'https://i.pinimg.com/originals/f5/2b/41/f52b412c788042ce34be9a2fdf59c9db.jpg',
      name: 'Gobinath',
      createdAt: '12/12/22',
      carNumber: 'TN69BB7',
    },
    {
      img: 'https://c.ndtvimg.com/2018-10/a7sp8ji_high-security-number-plates_625x300_12_October_18.jpg',
      name: 'Iwin',
      createdAt: '12/12/22',
      carNumber: 'DLCQ1939',
    },
    {
      img: 'https://cdni.autocarindia.com/ExtraImages/20210829035917_BH_Series_plate_wm.jpg',
      name: 'Dinesh',
      createdAt: '12/12/22',
      carNumber: '21BH0001AA',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG6YNtZjBUv-8LjsMj9JhLHvctWD2gPtNs5g&usqp=CAU',
      name: 'Gowtham',
      createdAt: '12/12/22',
      carNumber: 'KL51K4999',
    },
  ]);

  const [data, setdata] = useState();
  const videoConstraints = {
    facingMode: 'user',
  };
  const webcamRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const runCoco = async () => {
    const net = await cocoSsd.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState == 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      const obj = await net.detect(video);
      console.log('====================================');
      console.log(obj);
      console.log('====================================');

      const ctx = canvasRef.current.getContext('2d');
      drawRect(obj, ctx);
    }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    Tesseract.recognize(imageSrc, 'eng', {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setdata(text);
    });
  }, [webcamRef]);

  useEffect(() => {
    runCoco();
  }, []);
  return (
    <Layout>
      <Grid container p={3} md={12} sx={{ backgroundColor: '#fff' }}>
        <Grid item md={4} mr={'20px'} alignItems={'center'}>
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              textAlign: 'center',
              zindex: 9,
              width: '90%',
              height: '330px',
              backgroundColor: '#000',
              borderRadius: '10px',
            }}
          />
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
            justifyContent='center'
            alignItems={'center'}
            style={{
              width: '100%',
            }}
          >
            <Button
              title={'Choose from file '}
              color={'#fff'}
              background={'#1C71FF'}
            />
            <Button title={'Capture'} color={'#fff'} background={'#1C71FF'} />
          </Grid>
          <Grid
            style={{
              width: '100%',
            }}
          >
            <Button title={'Find'} color={'#fff'} background={'#FC6C6B'} />
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
