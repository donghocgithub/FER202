// src/pages/HomePage.jsx
import React, { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../Component/home/HomeCarousel";
import MovieCard from "../Component/Movie/MovieCard";
import MovieDetailModal from "../Component/Modal/MovieDetailModal";
import CustomToast from "../Component/Toast/Toast";
import Filter from "../Component/Filter/Filter";
import useFavourites from "../hooks/useFavourites";
import { movies } from "../data/movies";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    search: '',
    year: '',
    sort: ''
  });
  
  const { addToFavourites } = useFavourites();

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleAddToFavourites = (movie) => {
    const success = addToFavourites(movie);
    if (success) {
      setToastMessage("Added to favourites!");
      setShowToast(true);
    } else {
      setToastMessage("Already in favourites!");
      setShowToast(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleFilterChange = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  // Filter and sort movies based on filter options
  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Search filter
    if (filterOptions.search) {
      const searchTerm = filterOptions.search.toLowerCase();
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description.toLowerCase().includes(searchTerm) ||
        movie.genre.toLowerCase().includes(searchTerm)
      );
    }

    // Year filter
    if (filterOptions.year) {
      switch (filterOptions.year) {
        case '<=2000':
          filtered = filtered.filter(movie => movie.year <= 2000);
          break;
        case '2001-2015':
          filtered = filtered.filter(movie => movie.year >= 2001 && movie.year <= 2015);
          break;
        case '>2015':
          filtered = filtered.filter(movie => movie.year > 2015);
          break;
        default:
          break;
      }
    }

    // Sort
    if (filterOptions.sort) {
      switch (filterOptions.sort) {
        case 'year-asc':
          filtered.sort((a, b) => a.year - b.year);
          break;
        case 'year-desc':
          filtered.sort((a, b) => b.year - a.year);
          break;
        case 'title-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'duration-asc':
          filtered.sort((a, b) => a.duration - b.duration);
          break;
        case 'duration-desc':
          filtered.sort((a, b) => b.duration - a.duration);
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [filterOptions]);

  return (
    <Container>
      <HomeCarousel />
      
      {/* Filter Component */}
      <Filter onFilterChange={handleFilterChange} />
      
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Explore our curated collection of popular movies.
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard 
                movie={movie} 
                onAddToFavourites={handleAddToFavourites}
                onViewDetails={handleViewDetails}
              />
            </Col>
          ))}
        </Row>
      </div>

      {/* Movie Detail Modal */}
      <MovieDetailModal
        show={showModal}
        onHide={handleCloseModal}
        movie={selectedMovie}
      />

      {/* Toast Notification */}
      <CustomToast
        show={showToast}
        onClose={handleCloseToast}
        message={toastMessage}
        variant="success"
      />
    </Container>
  );
}