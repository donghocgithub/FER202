import { useState, useEffect } from 'react';

const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('movieFavourites');
    if (savedFavourites) {
      try {
        setFavourites(JSON.parse(savedFavourites));
      } catch (error) {
        console.error('Error parsing favourites from localStorage:', error);
        setFavourites([]);
      }
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie) => {
    // Check if movie is already in favourites
    const isAlreadyFavourite = favourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      setFavourites(prev => [...prev, movie]);
      return true; // Successfully added
    }
    return false; // Already exists
  };

  const removeFromFavourites = (movieId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some(fav => fav.id === movieId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    clearFavourites
  };
};

export default useFavourites;
