import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import MuiInput from '../../../components/MuiInput';
// import * as yup from "yup";
import { Formik } from 'formik';

function Form() {
  const initialValues = {
    name: '',
    mobile: '',
    address: '',
    aadhar: '',
  };
  // const validationSchema = yup.object({});

  const onSubmit = (values) => {
    console.log('Edited', values);
  };

  return (
    <Grid
      container
      p={2}
      mt={2}
      width={'60%'}
      direction={'column'}
      sx={{ backgroundColor: '#ffff' }}
      height={'100%'}
      borderRadius={'10px'}
    >
      <Grid container>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(handleChange, isValid) => {
            return (
              <>
                <Grid
                  container
                  mt={1}
                  sx={{
                    backgroundColor: '#ffff',
                    height: '100%',
                    borderRadius: '10px',
                  }}
                  spacing={1}
                  direction={'row'}
                >
                  <Grid xs={4} item sx={{ fontSize: '12px' }}>
                    <MuiInput placeholder='Name' name='name' />
                  </Grid>
                  <Grid xs={4} item sx={{ fontSize: '12px' }}>
                    <MuiInput placeholder='Aadhar No' name='aadhar' />
                  </Grid>

                  <Grid item xs={4} sx={{ fontSize: '12px' }}>
                    <MuiInput placeholder='Mobile' name='mobile' />
                  </Grid>
                  <Grid item xs={4} sx={{ fontSize: '12px' }}>
                    <MuiInput type='' placeholder='Address' name='address' />
                  </Grid>
                  <Grid item xs={4} sx={{ fontSize: '12px' }}>
                    <Button
                      type='submit'
                      sx={{ marginTop: '8px' }}
                      variant='primary'
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default Form;
