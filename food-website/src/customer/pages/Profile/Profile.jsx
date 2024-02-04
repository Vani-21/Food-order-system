import React from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Divider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile'
import Orders from './Orders'
import UsersAddresses from './UsersAddresses'
import Favorite from '@mui/icons-material/Favorite'
import UsersPayment from './UsersPayment'
import Favorites from './Favorites'

const Profile = () => {
  return (
    <div className='lg:flex'>
        <div className='lg:w-[20%] '>

            <ProfileNavigation/>

        </div>
        <Divider orientation='vertical' flexItem/>
        <div className='lg:w-[80%] '>

            <Routes>
                <Route path='/' element={<UserProfile/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/address' element={<UsersAddresses/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route path='/payments' element={<UsersPayment/>}/>
            </Routes>

        </div>

    </div>
  )
}

export default Profile