import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useCartContext } from '../../../context/CartContext';

const CartItem = ({ item}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
 
  const { removeFromCart,addToCart} = useCartContext();

  const handleRemove = () => {
    removeFromCart(item.id);
  };


  const handleDecrease = () => {
    if (quantity >= 1) {
      //setQuantity(quantity - 1);
      setQuantity((prevQuantity) => prevQuantity - 1);
     // addToCart({ ...item, quantity: quantity - 1 });
    } else {
      handleRemove();
    }
  };

  const handleIncrease = () => {
    //setQuantity(quantity + 1);
     setQuantity((prevQuantity) => prevQuantity + 1);
    // addToCart({ ...item, quantity: quantity + 1 });
  };

  // console.log(`Item: ${item.menuName}, Quantity: ${quantity}`);

  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>
        <div>
          <img
            className='w-[5rem] h-[5rem] object-cover'
            src={`http://localhost:3001/${item.imagePath}`}
            alt={item.menuName}
          />
        </div>

        <div className='flex items-center justify-between lg:w-[70%]'>
          <div className='space-y-1 lg:space-y-3 w-full'>
            <p>{item.menuName}</p>
            <p> Rs {item.price}</p>
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-1'>
                <IconButton color='primary' onClick={handleDecrease}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className='w-5 h-5 text-xs'>{quantity}</div>
                <IconButton color='primary' onClick={handleIncrease}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>

        <p>Total: Rs {item.price * quantity || item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;


// import React, { useState } from 'react';
// import { IconButton, Button } from '@mui/material';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { useCartContext } from '../../../context/CartContext';

// const CartItem = ({ item }) => {
//   const [quantity, setQuantity] = useState(1);
//   const { removeFromCart, addToCart } = useCartContext();

//   const handleRemove = () => {
//     removeFromCart(item.id);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleIncrease = () => {
//     setQuantity(quantity + 1);
//   };

//   const handleAddToCart = () => {
//     addToCart(item); // Call the addToCart function with the selected item
//   };

//   // Check if 'item' is defined before accessing its properties
//   if (!item) {
//     return null; 
//   }

//   return (
//     <div className='px-5'>
//       <div className='lg:flex items-center lg:space-x-5'>
//         <div>
//           {item.imagePath && (
//             <img
//               className='w-[5rem] h-[5rem] object-cover'
//               src={`http://localhost:3001/${item.imagePath}`}
//               alt={item.menuName}
//             />
//           )}
//         </div>

//         <div className='flex items-center justify-between lg:w-[70%]'>
//           <div className='space-y-1 lg:space-y-3 w-full'>
//             <p>{item.menuName}</p>
//             <div className='flex justify-between items-center'>
//               <div className='flex items-center space-x-1'>
//                 <IconButton color='primary' onClick={handleDecrease}>
//                   <RemoveCircleOutlineIcon />
//                 </IconButton>
//                 <div className='w-5 h-5 text-xs'>{quantity}</div>
//                 <IconButton color='primary' onClick={handleIncrease}>
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </div>
//             </div>
//             {/* <Button variant="contained" color="primary" onClick={handleAddToCart}>
//               Add to Cart
//             </Button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
