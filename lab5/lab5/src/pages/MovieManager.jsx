import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import { AuthProvider } from '../contexts/AuthContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';

const MovieManagerContent = () => {
  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Movie Manager</h1>
      </div>
      <div className="bg-white rounded shadow-sm p-4">
        <FilterBar />
        <MovieTable />
      </div>
    </Container>
  );
};

const MovieManager = () => (
  <AuthProvider>
    <MovieProvider>
      <Header />
      <MovieManagerContent />
    </MovieProvider>
  </AuthProvider>
);

export default MovieManager;
