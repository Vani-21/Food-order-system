
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      role: Yup.string().oneOf(['admin', 'restaurant', 'customer'], 'Invalid role').required('Role is required'),
      
    }),
    // onSubmit: async (values) => {
    //     // Validate the form using Yup
    //     try {
    //       await formik.validateForm(values);
    //       // Form is valid, perform registration logic here
    //       console.log('Registration data:', values);
    //       // You can send this data to your backend for further processing

    //       // Navigate to the home page
    //       navigate("/");
    //     } catch (errors) {
    //       // Form validation failed
    //       console.error('Form validation failed:', errors);
    //     }
    //   },

    onSubmit: async (values) => {
      try {
        await formik.validateForm(values);

        console.log('Submitting form with values:', values);

        const response = await fetch('http://localhost:3001/signup', {
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
          console.log('Registration successful');
          navigate('/login');
        } else {
          console.error('Registration failed:', data.message);
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
            <h2 className='text-white-500 text-2xl mb-3'>Registration Page</h2>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

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
                  <TextField
                    fullWidth
                    id="role"
                    name="role"
                    label="Role"
                    select
                    variant="outlined"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role ? formik.errors.role : ''}
                  >
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="restaurant">Restaurant</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                </Grid>


                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth color="primary" disabled={formik.isSubmitting}>
                    Register
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

export default Register;
