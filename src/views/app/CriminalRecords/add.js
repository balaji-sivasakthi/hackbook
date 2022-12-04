import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../layouts/index';
import MuiInput from '../../../components/MuiInput';
// import * as yup from "yup";
import { Formik } from 'formik';

function Add() {
    const initialValues = {
        name: '',
        location: '',
    };

    const onSubmit = (values) => {
        console.log('Edited', values);
    };

    return (
        <Layout>
            <Grid
                container
                p={2}
                mt={2}
                direction={'column'}
                sx={{ backgroundColor: '#ffff' }}
                borderRadius={'10px'}
            >
               
               <Grid item>
               
               </Grid>
              
            </Grid>
        </Layout>
    );
}

export default Add;
