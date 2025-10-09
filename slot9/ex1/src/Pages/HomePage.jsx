// src/pages/HomePage.jsx
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../Component/home/HomeCarousel";
import MovieCard from "../Component/Movie/MovieCard";
import MovieDetailModal from "../Component/Modal/MovieDetailModal";
import CustomToast from "../Component/Toast/Toast";
import useFavourites from "../hooks/useFavourites";
import { movies } from "../data/movies";

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
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

  return (
    <Container>
      <HomeCarousel />
      <div className="mt-4">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">
          Explore our curated collection of popular movies.
        </p>
        <Row xs={1} md={2} lg={3} className="g-4">
          {movies.map((movie) => (
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