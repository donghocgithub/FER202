import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

const FilterBar = ({ filters, onChange, genres }) => {
  const [searchInput, setSearchInput] = useState(filters.searchTerm || '');

  // Khi nhấn nút Tìm, chỉ lọc theo tên nhập vào
  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({
      ...filters,
      searchTerm: searchInput,
      genreId: '',
      year: '',
      country: '',
      minDuration: '',
      maxDuration: '',
      sortBy: '',
      sortOrder: 'asc'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'searchTerm') {
      setSearchInput(value);
    } else {
      onChange({ ...filters, [name]: value });
    }
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    onChange(prev => ({ ...prev, [name]: value ? String(parseInt(value, 10)) : '' }));
  };

  const handleSortToggle = () => {
    onChange(prev => ({ ...prev, sortBy: 'title', sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  return (
    <Row className="mb-4 align-items-center">
      <Col md={4} className="mb-2">
        <Form onSubmit={handleSubmit} className="d-flex">
          <Form.Control
            name="searchTerm"
            type="search"
            placeholder="Enter movie name and press Enter..."
            value={searchInput}
            onChange={handleChange}
            aria-label="Search movies"
          />
          <Button type="submit" variant="primary" className="ms-2">
            Tìm
          </Button>
        </Form>
      </Col>

      <Col md={3} className="mb-2">
        <Form.Select name="genreId" value={filters.genreId} onChange={handleChange}>
          <option value="">All Genres</option>
          {genres.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
        </Form.Select>
      </Col>

      <Col md={3} className="mb-2">
        <InputGroup>
          <Form.Control
            name="minDuration"
            type="number"
            placeholder="Min duration (min)"
            value={filters.minDuration || ''}
            onChange={handleDurationChange}
            min={0}
          />
          <Form.Control
            name="maxDuration"
            type="number"
            placeholder="Max duration (min)"
            value={filters.maxDuration || ''}
            onChange={handleDurationChange}
            min={0}
          />
        </InputGroup>
      </Col>

      <Col md={2} className="mb-2 d-flex justify-content-end">
        <Button variant="outline-secondary" onClick={handleSortToggle}>
          Sort: {filters.sortBy === 'title' ? (filters.sortOrder === 'asc' ? 'Title ↑' : 'Title ↓') : 'Title'}
        </Button>
      </Col>
    </Row>
  );
};

export default FilterBar;

