import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async (filters = {}) => {
    dispatch({ type: 'START_LOADING' });
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      // Text search by title
      if (filters.searchTerm) {
        params.append('q', filters.searchTerm);
      }
      
      // Genre filter
      if (filters.genreId) {
        params.append('genreId', filters.genreId);
      }
      
      // Year filter
      if (filters.year) {
        params.append('year', filters.year);
      }

      // Duration range filters (min/max)
      if (filters.minDuration) {
        params.append('duration_gte', filters.minDuration);
      }
      if (filters.maxDuration) {
        params.append('duration_lte', filters.maxDuration);
      }

      // Country filter
      if (filters.country) {
        params.append('country_like', filters.country);
      }
      
      // Sort
      if (filters.sortBy) {
        params.append('_sort', filters.sortBy);
        params.append('_order', filters.sortOrder || 'asc');
      }
      
      // Build URL with query parameters
      const url = `/movies${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await movieApi.get(url);

      let movies = res.data;
      // Nếu có searchTerm, chỉ giữ phim có title khớp (không phân biệt hoa thường, loại bỏ khoảng trắng thừa)
      if (filters.searchTerm) {
        const keyword = filters.searchTerm.trim().toLowerCase();
        movies = movies.filter(m => m.title && m.title.trim().toLowerCase() === keyword);
      }

      dispatch({ type: 'SET_MOVIES', payload: movies });

      // Handle search feedback
      if (Object.keys(filters).length > 0 && movies.length === 0) {
        dispatch({ type: 'SET_MESSAGE', payload: 'No movies found matching your criteria.' });
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: '' });
      }
    } catch (err) {
      console.error('fetchMovies error', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
      dispatch({ type: 'SET_MESSAGE', payload: 'Error fetching movies. Please try again.' });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data });
    } catch (err) {
      console.error('fetchGenres error', err);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
      dispatch({ type: 'SET_TOAST', payload: { message: 'Xóa phim thành công', variant: 'success' } });
    } catch (err) {
      console.error('confirmDelete error', err);
      fetchMovies();
      dispatch({ type: 'SET_TOAST', payload: { message: 'Lỗi khi xóa phim', variant: 'danger' } });
    }
  }, [fetchMovies]);

  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      // Show success toast
      if (isEditing) {
        dispatch({ type: 'SET_TOAST', payload: { message: 'Cập nhật phim thành công', variant: 'success' } });
      } else {
        dispatch({ type: 'SET_TOAST', payload: { message: 'Thêm phim thành công', variant: 'success' } });
      }
      return true;
    } catch (err) {
      console.error('handleCreateOrUpdate error', err);
      fetchMovies();
      dispatch({ type: 'SET_TOAST', payload: { message: 'Lỗi khi lưu phim', variant: 'danger' } });
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = { dispatch, fetchMovies, fetchGenres, confirmDelete, handleCreateOrUpdate };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
