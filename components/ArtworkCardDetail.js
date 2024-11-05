import { Card } from 'react-bootstrap'; // Import the Card component
import Error from 'next/error'; // Import Error from Next.js (or adjust this if it's a custom component)
import useSWR from 'swr'; // Ensure you have this import for SWR

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const {
    primaryImage,
    title = 'N/A',
    objectDate = 'N/A',
    classification = 'N/A',
    medium = 'N/A',
    artistDisplayName = 'N/A',
    creditLine = 'N/A',
    dimensions = 'N/A',
    artistWikidata_URL,
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {objectDate} <br />
          {classification} <br />
          {medium}
          <br /><br />
          {artistDisplayName !== 'N/A' ? (
            <>
              {artistDisplayName} (<a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>)
            </>
          ) : 'N/A'} <br />
          {creditLine} <br />
          {dimensions}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
