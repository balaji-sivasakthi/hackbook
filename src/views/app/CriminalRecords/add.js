import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import Layout from '../../../layouts/index';

// import * as yup from "yup";
import { Formik, useFormik } from 'formik';

function Add() {
    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });


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
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{marginBottom:"10px"}}
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
sx={{marginBottom:"10px"}}
                            fullWidth
                            id="location"
                            name="location"
                            label="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                </Grid>

            </Grid>
        </Layout>
    );
}

export default Add;
