import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({item}) => {
    return (
        <Card className='flex justify-between items-center p-5'>

            <div className='flex items-center space-x-5'>

                <img className="h-16 w-16" src='https://cdn.pixabay.com/photo/2012/07/09/07/16/thali-51996_1280.jpg' alt='' />

                <div>
                    <p>Thali</p>
                    <p className='text-gray-400'>Rs 399</p>
                </div>

            </div>

            <div>
                <Button variant='contained'>Track</Button>
            </div>



        </Card>
    )
}

export default OrderCard