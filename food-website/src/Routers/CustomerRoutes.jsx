import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Restaurant from '../customer/pages/Restaurant/Restaurant'
import Navbar from '../customer/components/Navbar/Navbar'
import Cart from '../customer/pages/Cart/Cart'
import Profile from '../customer/pages/Profile/Profile'
import Footer from '../customer/components/Footer/Footer'
import Login from '../customer/pages/Login/Login'
import Register from '../customer/pages/Register/Resiger'
import AdminAccount from '../customer/pages/AdminAccount/AdminAccount'
import RestaurantAccount from '../customer/pages/RestaurantAccount/RestaurantAccount'
import AddMenuItemForm from '../customer/pages/RestaurantAccount/AddMenuItemForm'
import RestaurantRegister from '../customer/pages/RestaurantAccount/ResturantRegister'
import Favorites from '../customer/pages/Profile/Favorites'


const CustomerRoutes = () => {
  return (
    <div className='relative'>
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/restaurant/:city/:title/:id' element={<Restaurant />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />
        <Route
          path='/admin-account'
          element={<AdminAccount />}
        />
        <Route
          path='/restaurant-account'
          element={<RestaurantAccount />}
        />
           <Route path='/add-menu' element={<AddMenuItemForm />} />
           <Route path='/restaurantRegister' element={<RestaurantRegister />} />
           <Route
          path='/fav'
          element={<Favorites />}
        />
      </Routes>
   

      <div className='bottom-0 z-50'>
        <Footer />
      </div>



    </div>
  )
}

export default CustomerRoutes

