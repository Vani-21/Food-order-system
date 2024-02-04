import React, { useState, useEffect } from 'react';
import { Button, Card } from '@mui/material';
//import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../context/CartContext';

const MenuItemCard = () => {
  const { addToCart } = useCartContext();
  //const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    // Fetch menu item data from the server
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      // Adjust the URL to match your server endpoint for fetching menu data
      const response = await fetch('http://localhost:3001/menu');
      const data = await response.json();

      // Set the entire array of menu items in the state
      if (data.success) {
        setMenuItem(data.menuItems);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const handleAddItemToCart = (selectedItem) => {
    addToCart(selectedItem);
   // navigate('/cart');
  };

  return (
    <div>
      {Array.isArray(menuItem) && menuItem.map((menuItem) => (
        <Card key={menuItem.id} className='p-5 lg:flex items-center justify-between box'>
          <div className='lg:flex items-center lg:space-x-5'>
            <img className='w-[7rem] h-[7rem] object-cover' src={`http://localhost:3001/${menuItem.imagePath}`} alt={menuItem.menuName} />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
              <p className='font-semibold text-xl'>{menuItem.menuName}</p>
              <p>Rs {menuItem.price} </p>
              <p className='text-gray-400'>{menuItem.description}</p>
            </div>
          </div>
          <div>
            <Button onClick={() => handleAddItemToCart(menuItem)}>Add To Cart</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MenuItemCard;







// import { Button, Card } from '@mui/material';
// import React from 'react'

// const MenuItemCard = () => {
//     const handleAddItemToCart=()=>{
//         console.log("handle add item to cart")
//     }


//   return (
//     <Card className=' p-5 lg:flex items-center justify-between box'>
//         <div className='lg:flex items-center lg:space-x-5'>
//             <img className='w-[7rem] h-[7rem] object-cover' src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt=''/>
//             <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
//                 <p className='font-semibold text-xl'>{`Pizza`}</p>
//                 <p>Rs {399} </p>
//                 <p className='text-gray-400'>{'Description'}</p>
//             </div>
//         </div>

//         <div>
//             <Button onClick={handleAddItemToCart}>Add To Cart</Button>
//         </div>

//     </Card>
//   )
// }

// export default MenuItemCard;





// import { Button, Card } from '@mui/material';
// import React from 'react'

// const MenuItemCard = () => {
//     const handleAddItemToCart=()=>{
//         console.log("handle add item to cart")
//     }


//   return (
//     <Card className=' p-5 lg:flex items-center justify-between box'>
//         <div className='lg:flex items-center lg:space-x-5'>
//             <img className='w-[7rem] h-[7rem] object-cover' src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt=''/>
//             <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
//                 <p className='font-semibold text-xl'>{`Pizza`}</p>
//                 <p>Rs {399} </p>
//                 <p className='text-gray-400'>{'Description'}</p>
//             </div>
//         </div>

//         <div>
//             <Button onClick={handleAddItemToCart}>Add To Cart</Button>
//         </div>

//     </Card>
//   )
// }

// export default MenuItemCard;