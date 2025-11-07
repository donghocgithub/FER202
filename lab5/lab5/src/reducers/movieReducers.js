export const initialMovieState = {
  movies: [],
  genres: [],
  isLoading: false,
  showDeleteModal: false,
  movieToDelete: null,
  isEditing: null,
  currentMovie: {
    title: '',
    description: '',
    avatar: '',
    genreId: '',
    duration: '',
    year: '',
    country: ''
  },
  showEditModal: false,
  message: '', // Add message state for search results feedback
  toastMessage: '',
  toastVariant: 'success'
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, isLoading: false };
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'SHOW_DELETE_MODAL':
      return { ...state, showDeleteModal: true, movieToDelete: action.payload };
    case 'CLOSE_DELETE_MODAL':
      return { ...state, showDeleteModal: false, movieToDelete: null };
    case 'SET_EDITING':
      const movieToEdit = state.movies.find(m => m.id === action.payload);
      return { 
        ...state, 
        isEditing: action.payload,
        currentMovie: movieToEdit ? { ...movieToEdit } : state.currentMovie,
        showEditModal: true 
      };
    case 'CLOSE_EDIT_MODAL':
      return { 
        ...state, 
        isEditing: null,
        showEditModal: false,
        currentMovie: initialMovieState.currentMovie
      };
    case 'UPDATE_FIELD':
      return { 
        ...state, 
        currentMovie: {
          ...state.currentMovie,
          [action.payload.name]: action.payload.value
        }
      };
    case 'RESET_FORM':
      return { 
        ...state, 
        isEditing: null,
        currentMovie: initialMovieState.currentMovie,
        showEditModal: false
      };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_TOAST':
      return { ...state, toastMessage: action.payload.message, toastVariant: action.payload.variant || 'success' };
    default:
      return state;
  }
};