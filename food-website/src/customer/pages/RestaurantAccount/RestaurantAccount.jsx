// RestaurantAccount.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Input } from '@mui/material';
import EditMenuItemForm from './EditMenuItemForm';
import DeleteMenuItemForm from './DeleteMenuItemForm';

const RestaurantAccount = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch menu items from the server
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/menu');
        const data = await response.json();

        if (data.success) {
          setMenuItems(data.menuItems);
        } else {
          console.error('Failed to fetch menu items:', data.message);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchMenuItems();
  }, []);

  const handleEditClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleEditSubmit = async (editedValues) => {
    try {
      const formData = new FormData();
      formData.append('category', editedValues.category);
      formData.append('foodType', editedValues.foodType);
      formData.append('menuName', editedValues.menuName);
      formData.append('price', editedValues.price);
      formData.append('description', editedValues.description);
      formData.append('restaurantId', editedValues.restaurantId);
      formData.append('image', editedValues.image);

      const url = `http://localhost:3001/menu/${selectedMenuItem.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMenuItems((prevMenuItems) =>
          prevMenuItems.map((item) => (item.id === selectedMenuItem.id ? { ...item, ...editedValues } : item))
        );
        setSelectedMenuItem(null);
      } else {
        console.error(`Failed to update menu item for ${url}:`, data.message);
      }
    } catch (error) {
      console.error('Error updating menu item:', error.message);
    }
  };

  const handleDeleteClick = (itemId) => {
    setSelectedMenuItem(menuItems.find((item) => item.id === itemId));
    setDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = async () => {
    try {
      const url = `http://localhost:3001/menu/${selectedMenuItem.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMenuItems((prevMenuItems) => prevMenuItems.filter((item) => item.id !== selectedMenuItem.id));
        setSelectedMenuItem(null);
        setDeleteDialogOpen(false);
      } else {
        console.error(`Failed to delete menu item for ${url}:`, data.message);
      }
    } catch (error) {
      console.error('Error deleting menu item:', error.message);
    }
  };

  const handleFileChange = (file) => {
    // Handle file change if needed
  };

  return (

    
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Restaurant page
            <span className="border-b-2 border-red-500"></span>
          </h1>
        </div>
      </div>

      <div className="items-center float-end">
        <div className="ml-auto">
          <Button variant="contained" color="primary" onClick={() => navigate("/add-menu")}>
            Add
          </Button>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold">Category</TableCell>
              <TableCell className="font-bold">Food Type</TableCell>
              <TableCell className="font-bold">Menu Name</TableCell>
              <TableCell className="font-bold">Price</TableCell>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell className="font-bold">Image</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((menuItem) => (
              <TableRow key={menuItem.id}>
                <TableCell>{menuItem.category}</TableCell>
                <TableCell>{menuItem.foodType}</TableCell>
                <TableCell>{menuItem.menuName}</TableCell>
                <TableCell>{menuItem.price}</TableCell>
                <TableCell>{menuItem.description}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3001/${menuItem.imagePath}`}
                    alt="Menu Item"
                    style={{ width: '50px', height: '50px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(menuItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(menuItem.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedMenuItem && (
        <EditMenuItemForm
          initialValues={selectedMenuItem}
          onSubmit={handleEditSubmit}
          onFileChange={handleFileChange}
        />
      )}

      <DeleteMenuItemForm
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onSubmit={handleDeleteSubmit}
      />
    </div>
  );
};

export default RestaurantAccount;
