import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await formik.validateForm(values);

        console.log('Submitting login form with values:', values);

        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        console.log('Response from server:', response);

        const data = await response.json();
        console.log('Data from server:', data);

        if (data.success) {
          console.log('Login successful');

          // Check user role and navigate accordingly
          switch (data.role) {
            case 'admin':
              navigate('/admin-account');
              break;
            case 'restaurant':
              navigate('/restaurant-account');
              break;
            case 'customer':
              navigate('/');
              break;
            default:
              console.error('Invalid role:', data.role);
              break;
          }
        } else {
          console.error('Login failed:', data.message);
        }
      } catch (errors) {
        console.error('Form validation failed:', errors);
      }
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <h2 className='text-white-500 text-2xl mb-3'>Login Page</h2>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth color="primary" disabled={formik.isSubmitting}>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>

            <h1 className='text-gray-400 text-l mb-3'>If you are new to the website then please register yourself</h1>
            <Button type='submit' onClick={() => navigate("/register")} variant='outlined'>Register</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
