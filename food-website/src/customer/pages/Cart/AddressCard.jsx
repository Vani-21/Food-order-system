import { Button, Card } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

const AddressCard = ({ handleSelectAddress, item, showButton }) => {



  return (
    <Card className='flex space-x-4 lg:w-64 m-2 p-2'>
      <HomeIcon />
      <div className='space-y-3 text-gray-500'>
        <h1 className='font-semibold text-lg text-white'>Home</h1>
        <p>
          Maruti Amrakunj society,Sargasan, GANDHINAGAR, 382421, Gujarat, India
        </p>
        {showButton && <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)}>Select</Button>}
      </div>

    </Card>
  )
}

export default AddressCard