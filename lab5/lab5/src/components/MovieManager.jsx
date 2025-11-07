import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import MovieTable from './MovieTable';
import MovieForm from './MovieForm';
import FilterBar from './FilterBar';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { Toast } from 'react-bootstrap';
import DeleteConfirmModal from './DeleteConfirmModal';

const MovieManager = () => {
  const { movies, isLoading, showDeleteModal, message, genres, toastMessage, toastVariant } = useMovieState();
  const movieDispatch = useMovieDispatch();
  const { fetchMovies } = movieDispatch;

  const [showToast, setShowToast] = useState(false);

  const [filters, setFilters] = useState({
    searchTerm: '',
    genreId: '',
    year: '',
    country: '',
    minDuration: '',
    maxDuration: '',
    sortBy: '',
    sortOrder: 'asc'
  });


  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Debounced server fetch using useRef and useEffect
  const timerRef = useRef(null);
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchMovies(filters);
    }, 300);
    return () => clearTimeout(timerRef.current);
  }, [filters, fetchMovies]);

  // Show toast when toastMessage is set in state
  useEffect(() => {
    if (toastMessage) {
      setShowToast(true);
      const t = setTimeout(() => {
        setShowToast(false);
        movieDispatch.dispatch({ type: 'SET_TOAST', payload: { message: '', variant: '' } });
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage, movieDispatch]);

  return (
    <Container>
      <h1 className="my-4">Movie Manager</h1>
      <FilterBar filters={filters} onChange={setFilters} genres={genres} />

      {message && (
        <Alert variant={movies.length === 0 ? "warning" : "info"}>
          {message}
        </Alert>
      )}

      <Row>
        <Col md={12}>
          <MovieTable isLoading={isLoading} />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <MovieForm />
        </Col>
      </Row>

      {/* Toast container: position fixed top-right */}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', top: 20, right: 20, zIndex: 1060 }}>
        <Toast onClose={() => movieDispatch.dispatch({ type: 'SET_TOAST', payload: { message: '', variant: '' } })} show={showToast} bg={toastVariant} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </div>

      <DeleteConfirmModal show={showDeleteModal} />
    </Container>
  );
};

export default MovieManager;