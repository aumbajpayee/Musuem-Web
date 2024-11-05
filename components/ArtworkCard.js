import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const {
    primaryImageSmall = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]',
    title = 'N/A',
    objectDate = 'N/A',
    classification = 'N/A',
    medium = 'N/A',
  } = data;

  return (
    <Card>
      <Card.Img variant="top" src={primaryImageSmall} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {objectDate} <br />
          {classification} <br />
          {medium}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">ID: {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
