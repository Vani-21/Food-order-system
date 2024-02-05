import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const AddMenuItemForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: '',
      foodType: '',
      menuName: '',
      price: '',
      description: '',
      image: null, // Use null for file input
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      foodType: Yup.string().required('Food Type is required'),
      menuName: Yup.string().required('Menu Name is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      description: Yup.string().required('Description is required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Validate the form using Yup
        await formik.validateForm(values);

        // Form is valid, perform menu item addition logic here
        console.log('Submitting form with values:', values);

        // Prepare form data for file upload
        const formData = new FormData();
        formData.append('category', values.category);
        formData.append('foodType', values.foodType);
        formData.append('menuName', values.menuName);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('image', values.image);

        // Make an API request to add the menu item
        const response = await fetch('http://localhost:3001/menu', {
          method: 'POST',
          body: formData,
        });

        console.log('Response from server:', response);

        const data = await response.json();
        console.log('Data from server:', data);

        if (data.success) {
          console.log('Menu item added successfully');

          // Clear the form after successful submission
          resetForm();
          navigate('/restaurant-account');
        } else {
          console.error('Failed to add menu item:', data.message);
        }
      } catch (errors) {
        // Form validation failed
        console.error('Form validation failed:', errors);
      }
    },
  });


  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <h2 className='text-white-500 text-2xl mb-3'>Add Menu Item</h2>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <Select
                    fullWidth
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                  >
                    <MenuItem value="thali">Thali</MenuItem>
                    <MenuItem value="dosa">Dosa</MenuItem>
                    <MenuItem value="pizza">Pizza</MenuItem>
                    <MenuItem value="bread">Bread</MenuItem>
                    {/* Add more categories as needed */}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <div style={{ color: 'red' }}>{formik.errors.category}</div>
                  )}
                </Grid>


                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="foodType"
                    name="foodType"
                    label="Food Type"
                    variant="outlined"
                    value={formik.values.foodType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.foodType && Boolean(formik.errors.foodType)}
                    helperText={formik.touched.foodType && formik.errors.foodType}
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <Select
                    fullWidth
                    id="foodType"
                    name="foodType"
                    label="Food Type"
                    variant="outlined"
                    value={formik.values.foodType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.foodType && Boolean(formik.errors.foodType)}

                  >
                    <MenuItem value="veg">Veg</MenuItem>
                    <MenuItem value="nonveg">Non-Veg</MenuItem>
                  </Select>
                  {formik.touched.foodType && formik.errors.foodType && (
                    <div style={{ color: 'red' }}>{formik.errors.foodType}</div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="menuName"
                    name="menuName"
                    label="Item Name"
                    variant="outlined"
                    value={formik.values.menuName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.menuName && Boolean(formik.errors.menuName)}
                    helperText={formik.touched.menuName && formik.errors.menuName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div style={{ color: 'red' }}>{formik.errors.image}</div>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    disabled={formik.isSubmitting}
                  >
                    Add Menu Item
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddMenuItemForm;
