import React, { useState } from 'react'
import RestaurantCard from '../HomePage/RestaurantCard'
import { restaurants } from '../../../Data/Restaurants'


const favoritesData = [];
const Favorites = () => {
    // const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    // const addToFavorites = (restaurants) => {
    //   setFavoriteRestaurants((prevFavorites) => [...prevFavorites, restaurants]);
    // };
  
    // const removeFromFavorites = (restaurants) => {
    //   setFavoriteRestaurants((prevFavorites) => prevFavorites.filter((r) => r !== restaurants));
    // };
    return (
        <div>
            <h1 className='py-7 text-xl font-semibold text-center'>
                My Favorites
            </h1>
            <div className='flex flex-wrap justify-center'>

                {restaurants.slice(0,2).map((item)=><RestaurantCard item={item}/>)}
                {/* {favoriteRestaurants.map((index,restaurants) => (
                    <RestaurantCard key={index}
                    item={restaurants}
                    index={index}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}/>
                ))} */}
            </div>
        </div>
    )
}

export default Favorites