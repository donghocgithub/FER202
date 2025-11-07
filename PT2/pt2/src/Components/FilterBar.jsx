import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayment } from '../Contexts/PaymentContext';

const FilterBar = () => {
    const { filterState, setFilterState } = usePayment();

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                {/* Prevent form submit (Enter key) from reloading page */}
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Row className="g-3">
                        {/* Search by semester or course name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by semester or course name" 
                                    value={filterState.searchTerm}
                                    onChange={(e) => setFilterState({
                                        ...filterState,
                                        searchTerm: e.target.value
                                    })}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Semester  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Semester</Form.Label>
                                <Form.Select 
                                    value={filterState.semester}
                                    onChange={(e) => setFilterState({
                                        ...filterState,
                                        semester: e.target.value
                                    })}
                                >
                                    <option value="">All Semesters</option>
                                    {filterState.semesterOptions.map(semester => (
                                        <option key={semester} value={semester}>{semester}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Course name */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select
                                    value={filterState.courseName}
                                    onChange={(e) => setFilterState({
                                        ...filterState,
                                        courseName: e.target.value
                                    })}
                                >
                                    <option value="">All Courses</option>
                                    {filterState.courseOptions.map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select
                                    value={filterState.sortBy}
                                    onChange={(e) => setFilterState({
                                        ...filterState,
                                        sortBy: e.target.value
                                    })}
                                >
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
