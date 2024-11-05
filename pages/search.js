import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AdvancedSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const submitForm = (data) => {
    let queryString = "searchBy=true";

    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }

    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }

    queryString += `&isOnView=${data.isOnView || false}`;
    queryString += `&isHighlight=${data.isHighlight || false}`;
    queryString += `&q=${data.q}`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your query"
              {...register('q', { required: true })}
              className={errors.q ? 'is-invalid' : ''}
            />
            {errors.q && <Form.Control.Feedback type="invalid">
              Search query is required.
            </Form.Control.Feedback>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="searchBy">
            <Form.Label>Search By</Form.Label>
            <Form.Control as="select" {...register('searchBy')}>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="date">Date</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="geoLocation">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder='Enter geo location (e.g., "Europe|Paris")'
              {...register('geoLocation')}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder='Enter medium (e.g., "Painting|Sculpture")'
              {...register('medium')}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            {...register('isHighlight')}
          />
        </Col>
        <Col md={6}>
          <Form.Check
            type="checkbox"
            label="Currently on View"
            {...register('isOnView')}
          />
        </Col>
      </Row>

      <Button type="submit" variant="primary">Submit</Button>
    </Form>
  );
};

export default AdvancedSearch;
