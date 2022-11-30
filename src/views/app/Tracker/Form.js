import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import MuiInput from '../../../components/MuiInput';
// import * as yup from "yup";
import { Formik } from 'formik';

function Form() {
  const initialValues = {
    email: '',
    mobile: '',
  };
  // const validationSchema = yup.object({});

  const onSubmit = (values) => {
    console.log('Submited', values);
  };

  return (
    <Grid
      container
      p={2}
      mt={2}
      width={'40%'}
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
                  direction={'column'}
                >
                  <Grid xs={4} item sx={{ fontSize: '12px' }}>
                    <MuiInput placeholder='Email Address' name='email' />
                  </Grid>

                  <Grid item xs={4} sx={{ fontSize: '12px' }}>
                    <MuiInput placeholder='Mobile' name='mobile' />
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    alignItems={'center'}
                    justifyContent='center'
                    display={'flex'}
                    sx={{ fontSize: '12px', width: '100%' }}
                  >
                    <Button
                      type='submit'
                      sx={{ marginTop: '8px' }}
                      variant='contained'
                    >
                      Submit
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
