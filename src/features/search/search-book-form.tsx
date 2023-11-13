import { styled } from 'styled-components';
import { NewsLetter } from '#features/newsletter/newsletter-form';
import { Link } from 'react-router-dom';
import { SeachBooks } from '#features/auth/types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';

// interface StarRatingProps {
//   rating: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating - fullStars >= 1;

//   const stars = [];
//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<FontAwesomeIcon key={i} icon={fasFaStar} />);
//   }
//   if (halfStar) {
//     stars.push(<FontAwesomeIcon key="half" icon={faStar} />);
//   }
//   for (let i = stars.length; i < 5; i++) {
//     stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
//   }

//   return <StarWrapper>{stars}</StarWrapper>;
// };

interface BookProps {
  response: SeachBooks;
}

export const SearchBookForm: React.FC<BookProps> = ({ response }) => {
  return (
    <AllWrapper>
      <MainBookStoreWrapper>
        {response.books.map((book, index) => (
          <PostsWrapper key={index}>
            <PostImg>
              <img src={book.image} alt={`Post ${book.isbn13}`} />
            </PostImg>
            <Link to={`/books/${book.isbn13}`}>
              <TitleWrapper>{book.title}</TitleWrapper>
            </Link>
            {/* <AuthorPublisherPublishedWrapper>
              {`by ${book.authors}. ${book.publisher} ${book.year}`}
            </AuthorPublisherPublishedWrapper>
            <PriceWraper>
              {book.price}
              <StarRating rating={book.rating} />
            </PriceWraper> */}
          </PostsWrapper>
        ))}
      </MainBookStoreWrapper>
      <NewsLetter />
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const MainBookStoreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const PostsWrapper = styled.div`
  //   width: 352px;
  height: auto;
`;

const TitleWrapper = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const PostImg = styled.div`
  text-align: center;
`;

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
