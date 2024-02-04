import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RestaurantRegister = () => {
  const navigate = useNavigate();

  const restaurantSchema = Yup.object().shape({
    resturantName: Yup.string().required('Restaurant name is required'),
    restaurantDescription: Yup.string().required('Restaurant description is required'),
    restaurantImage: Yup.mixed().required('Restaurant image is required'),
  });

  const formik = useFormik({
    initialValues: {
      
      resturantName: '',
      restaurantImage: null,
      restaurantDescription: '',
    },
    validationSchema: restaurantSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('restaurantName', values.resturantName);
        formData.append('restaurantImage', values.restaurantImage);
        formData.append('restaurantDescription', values.restaurantDescription);

        const response = await fetch('http://localhost:3001/restaurant', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          console.log('Restaurant registered successfully');
          navigate('/login'); // Navigate to login page or any other page
        } else {
          console.error('Restaurant registration failed:', data.message);
        }
      } catch (error) {
        console.error('Error during restaurant registration:', error);
      }
    },
  });


  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <h2 className='text-white-500 text-2xl mb-3'>Restaurant Registration</h2>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="resturantName"
                    name="resturantName"
                    label="Resturant Name"
                    variant="outlined"
                    value={formik.values.resturantName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.resturantName && Boolean(formik.errors.resturantName)}
                    helperText={formik.touched.resturantName && formik.errors.resturantName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    id="restaurantImage"
                    name="restaurantImage"
                    onChange={(event) => formik.setFieldValue('restaurantImage', event.currentTarget.files[0])}
                    accept="image/*"
                  />
                  {formik.touched.restaurantImage && formik.errors.restaurantImage && (
                    <div className="error">{formik.errors.restaurantImage}</div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="restaurantDescription"
                    name="restaurantDescription"
                    label="Restaurant Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formik.values.restaurantDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.restaurantDescription && Boolean(formik.errors.restaurantDescription)}
                    helperText={formik.touched.restaurantDescription && formik.errors.restaurantDescription}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth color="primary" disabled={formik.isSubmitting}>
                    Register Restaurant
                  </Button>
                </Grid>
              </Grid>
            </form>

            <h1 className='text-gray-400 text-l mb-3'>If you already have an account, please login</h1>
            <Button type='submit' onClick={() => navigate("/login")} variant='outlined'>
              Login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RestaurantRegister;
