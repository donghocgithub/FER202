import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, isLoading, movieToDelete, showDeleteModal } = state;

  const genreMap = genres.reduce((map, g) => { map[g.id] = g.name; return map; }, {});

  const handleEditClick = (movie) => dispatch({ type: 'SET_EDITING', payload: movie.id });
  const handleDeleteClick = (movie) => dispatch({ type: 'SHOW_DELETE_MODAL', payload: movie });

  return (
    <>
      {isLoading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                <td>#{movie.id}</td>
                <td><strong>{movie.title}</strong><br /><small className="text-muted">({movie.year})</small></td>
                <td>{genreMap[movie.genreId] || 'Unknown'}</td>
                <td>{movie.duration} phút</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal xác nhận xoá đã được chuyển sang MovieManager.jsx */}
    </>
  );
};

export default MovieTable;
