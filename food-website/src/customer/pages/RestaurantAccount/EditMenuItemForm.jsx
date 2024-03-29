// EditMenuItemForm.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Input, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const EditMenuItemForm = ({ initialValues, onSubmit, onFileChange }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      foodType: Yup.string().required('Food Type is required'),
      menuName: Yup.string().required('Menu Name is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      description: Yup.string().required('Description is required'),
      image: Yup.mixed(),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth variant="outlined" error={formik.touched.category && Boolean(formik.errors.category)}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Category"
        >
          <MenuItem value="thali">Thali</MenuItem>
          <MenuItem value="dosa">Dosa</MenuItem>
          <MenuItem value="pizza">Pizza</MenuItem>
          <MenuItem value="bread">Bread</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>

      {/* <TextField
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
      /> */}
      {/* <TextField
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
      /> */}
      <FormControl fullWidth variant="outlined" error={formik.touched.foodType && Boolean(formik.errors.foodType)}>
        <InputLabel id="foodType-label">Food Type</InputLabel>
        <Select
          labelId="foodType-label"
          id="foodType"
          name="foodType"
          value={formik.values.foodType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Food Type"
        >
          <MenuItem value="veg">Veg</MenuItem>
          <MenuItem value="non-veg">Non-Veg</MenuItem>
        </Select>
      </FormControl>
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
      <TextField
        fullWidth
        id="image"
        name="image"
        label="Image URL"
        variant="outlined"
        value={formik.values.image}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.image && Boolean(formik.errors.image)}
        helperText={formik.touched.image && formik.errors.image}
      />
      <Input
        type="file"
        onChange={(e) => {
          formik.setFieldValue('image', e.target.files[0]);
          onFileChange(e.target.files[0]); // Pass the file to the parent component
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditMenuItemForm;
