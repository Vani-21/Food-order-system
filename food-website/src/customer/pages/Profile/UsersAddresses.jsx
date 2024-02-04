import React from 'react'
import AddressCard from '../Cart/AddressCard'


const address=[1,1,1,1]
const UsersAddresses = () => {
  return (
    <div>
      <div className='flex items-center flex-col lg:px-10'>
        <h1 className='text-xl text-center py-7 font-semibold'>Addresses</h1>
        <div className='flex justify-center flex-wrap space-x-5'>

          {address.map((item)=>(<AddressCard item={item}/>))}
   
        </div>
      </div>

    </div>
  )
}

export default UsersAddresses