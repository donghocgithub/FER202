// src/pages/HomePage.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeCarousel from "../Component/home/HomeCarousel";
import MovieCard from "../Component/Movie/MovieCard";
import { movies } from "../data/movies";

export default function HomePage() {
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
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}