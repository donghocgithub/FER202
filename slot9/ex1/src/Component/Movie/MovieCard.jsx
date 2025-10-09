import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "./MovieCard.css";

const MovieCard = ({ movie, onAddToFavourites, onViewDetails }) => {
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card className="movie-card h-100">
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={movie.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{truncateDescription(movie.description, 60)}</Card.Text>
        <div className="movie-details mb-3">
          <Badge bg="info" className="text-dark">{movie.genre}</Badge>{" "}
          <Badge bg="secondary">{movie.year}</Badge>
          <p className="mt-2 mb-0">Country: {movie.country}</p>
          <p>Duration: {movie.duration} mins</p>
        </div>
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => onViewDetails(movie)}
            >
              View Details
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onAddToFavourites(movie)}
            >
              Add to Favourites
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;