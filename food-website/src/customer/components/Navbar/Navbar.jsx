// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button, IconButton, Menu, MenuItem } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PersonIcon from '@mui/icons-material/Person';
// import { useAuthContext } from '../../../context/AuthContext';
// import "./Navbar.css"

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = Boolean(anchorEl);
//   const navigate = useNavigate();

//   const { user, logout } = useAuthContext();



//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

 
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className='px-5 z-50 py-[.8rem] bg-[#A52A2A] lg:px-20 flex justify-between'>
//       <div className='flex items-center space-x-4'>
//         <div
//           className='lg:mr-10 cursor-pointer flex items-center space-x-4'
//           onClick={() => navigate('/')}
//         >
//           <li className='logo font-semibold text-gray-300 text-2xl'>FoodieFiesta</li>
//         </div>
//       </div>

//       <div className='flex items-center space-x-2'>
//         <IconButton>
//           <SearchIcon sx={{ fontSize: '1.5rem' }} />
//         </IconButton>

//         {user ? (
//           <div className='flex items-center space-x-2'>
//             {user.role === 'admin' && (
//               <Button onClick={() => navigate('/admin-account')} color='inherit'>
//                 Admin Page
//               </Button>
//             )}
//             {user.role === 'restaurant' && (
//               <Button onClick={() => navigate('/restaurant-account')} color='inherit'>
//                 Menu Page
//               </Button>
//             )}
//             {user.role === 'customer' && (
//               <span
//                 id='basic-button'
//                 aria-controls={openMenu ? 'basic-menu' : undefined}
//                 aria-haspopup='true'
//                 aria-expanded={openMenu ? 'true' : undefined}
//                 onClick={handleOpenMenu}
//                 className='font-semibold cursor-pointer'
//               >
//                 {user.name}
//               </span>
//             )}

//             <Menu
//               id='basic-menu'
//               anchorEl={anchorEl}
//               open={openMenu}
//               onClose={handleCloseMenu}
//               MenuListProps={{
//                 'aria-labelledby': 'basic-button',
//               }}
//             >
//               <MenuItem onClick={() => navigate('/my-profile')}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </div>
//         ) : (
//           <IconButton onClick={() => navigate('/login')}>
//             <PersonIcon sx={{ fontSize: '1.5rem' }} />
//           </IconButton>
//         )}

//         <IconButton onClick={() => navigate('/cart')}>
//           <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
//         </IconButton>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, IconButton, Menu, MenuItem, Modal, Backdrop, Fade } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from '../../../context/AuthContext';


const Navbar = () => {
   const [anchorEl, setanchorEl] = React.useState(null);
   const OpenMenu = Boolean(anchorEl);
   const navigate = useNavigate()

   const { user, logout } = useAuthContext();

   const navigateToProfile = () => {
      navigate("/my-profile")
   };
   const handleOpenMenu = (event) => {
      setanchorEl(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setanchorEl(null);
   }
   const handleLogout = () => {
      console.log("handle logout")
   }



   return (
      <nav className='px-5 z-50 py-[.8rem] bg-[#A52A2A] lg:px-20 flex justify-between'>
         <div className='flex items-center space-x-4'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4' onClick={() => navigate("/")}>
               <li className='logo font-semibold text-gray-300 text-2xl'>FoodieFiesta</li>
            </div>
         </div>

         <div className='flex items-center space-x-2 '>

            <IconButton>
               <SearchIcon sx={{ fontSize: "1,5rem" }} />
            </IconButton>

           
            {user ?
               <span id="basic-button"
                  aria-controls={OpenMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={OpenMenu ? 'true' : undefined}
                  onClick={user ? handleOpenMenu : navigateToProfile}
                  className='font-semibold cursor-pointer'>Name</span> :
               <IconButton onClick={() => navigate("/login")}>
                  <PersonIcon sx={{ fontSize: "1,5rem" }} />
               </IconButton>}
            <Menu
               id="basic-menu"
               anchorEl={anchorEl}
               open={OpenMenu}
               onClose={handleCloseMenu}
               MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
            >
               <MenuItem onClick={() => navigate("/my-profile")}>Profile</MenuItem>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>


            </Menu>



            <IconButton onClick={() => navigate("/cart")}>
               <ShoppingCartIcon sx={{ fontSize: "1,5rem" }} />
            </IconButton>


         </div>



      </nav>
   )
}

export default Navbar