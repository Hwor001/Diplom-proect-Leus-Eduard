import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { styled } from 'styled-components';
import { Response } from '#features/auth/types';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 1;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={fasFaStar} />);
  }
  if (halfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={faStar} />);
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  return <StarWrapper>{stars}</StarWrapper>;
};

interface BookProps {
  response: Response;
}

export const StarRatingForm: React.FC<BookProps> = ({ response }) => {
  const { isbn13 } = useParams();
  const [book, setBook] = useState<Response | null>(null);
  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
      .then((res) => res.json())
      .then((data: Response) => setBook(data));
  }, [isbn13]);
  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AuthorPublisherPublishedWrapper>
        {`by ${response.authors}. ${response.publisher} ${response.year}`}
      </AuthorPublisherPublishedWrapper>
      <PriceWraper>
        {response.price}
        <StarRating rating={response.rating} />
      </PriceWraper>
    </>
  );
};

const PriceWraper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const StarWrapper = styled.div`
  & svg {
    width: 14px;
    height: 13px;
  }
`;

const AuthorPublisherPublishedWrapper = styled.p`
  font-family: 'Archivo';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
