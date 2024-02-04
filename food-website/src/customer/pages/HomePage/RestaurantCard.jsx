

import React, { useState } from 'react'
import {Card, IconButton} from "@mui/material"
import {useNavigate} from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const RestaurantCard = ({item,index}) => {
   const Navigate=useNavigate();

   const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
   
    console.log("handle add to favorites");
  };
  return (
    <Card className='m-5 w-[18rem] productCard'>
        <div 
         onClick={()=>Navigate(`/restaurant/${item.city}/${item.name}/${index+1}`)}
         >
            <img 
            className='w-full h-[10rem] rounded-t-md object-cover'
            src={item.imageUrl} alt=""/>
        </div>

        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p className='font-semibold text-lg'>{item.name}</p>
                <p className='text-gray-500 text-sm'>
                    {item.description.length>40
                    ?item.description.substring(0,40)
                    +"...":item.description}
                </p>
            </div>
            <div>
            <IconButton onClick={handleAddToFavorites}>
            {isFavorite ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />}
          </IconButton>
            </div>
        </div>
    </Card>
  );
};

export default RestaurantCard;