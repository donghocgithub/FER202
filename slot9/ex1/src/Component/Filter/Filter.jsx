import React, { useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Filter.css';

function Filter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      search: value,
      year: yearFilter,
      sort: sortBy
    });
  };

  const handleYearFilterChange = (e) => {
    const value = e.target.value;
    setYearFilter(value);
    onFilterChange({
      search: searchTerm,
      year: value,
      sort: sortBy
    });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onFilterChange({
      search: searchTerm,
      year: yearFilter,
      sort: value
    });
  };

  return (
    <Card className="filter-card">
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filter & Search Movies
        </h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Search */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Filter by Year */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select
                value={yearFilter}
                onChange={handleYearFilterChange}
              >
                <option value="">All Years</option>
                <option value="<=2000">≤ 2000</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">2015</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sorting */}
          <Col md={4}>
            <Form.Group>
              <Form.Label>Sort by</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Default</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Filter;
