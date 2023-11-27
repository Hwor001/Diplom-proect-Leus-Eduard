import { Response } from '#features/auth/types';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../store1';
import { useSelector, useDispatch } from 'react-redux';
import { Quantity } from '#ui/element/quantity';
import { Button } from '#ui/button/button';
import { useState, useEffect } from 'react';
import { ref, get, DataSnapshot, remove } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';
import { deleteItemFromCart } from '../../features/postactive/basket.slice';

export const BasketBook: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [backetBooks, setBacketBooks] = useState<Response[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      }
    });

    const basketData = async () => {
      const basketRef = ref(database, `users/${userName}/basket`);
      try {
        const snapshot: DataSnapshot = await get(basketRef);
        if (snapshot.exists()) {
          const basketData: Response[] = [];
          snapshot.forEach((childSnapshot) => {
            basketData.push(childSnapshot.val());
          });
          setBacketBooks(basketData);
        }
      } catch (error) {
        console.error('Error fetching data from database:', error);
      }
    };

    if (userName) {
      basketData();
    }

    return () => unsubscribe();
  }, [userName]);

  const handleDelete = (element: Response) => {
    dispatch(deleteItemFromCart(element.isbn13));
    const favoriteRef = ref(
      database,
      `users/${userName}/basket/${element.isbn13}`
    );
    remove(favoriteRef)
      .then(() => {
        setBacketBooks((prevFavorites) =>
          prevFavorites.filter((book) => book.isbn13 !== element.isbn13)
        );
      })
      .catch((error) => {
        console.error('Error removing from database:', error);
      });
  };

  const basketQuantity = useSelector(
    (state: RootState) => state.basketQuantity
  );

  const check = () => {
    navigate('/Check');
  };

  const totalSum = backetBooks.reduce(
    (sum, element) =>
      sum +
      parseFloat(element.price.replace(/\$/g, '')) *
        (basketQuantity[element.isbn13] || 1),
    0
  );
  const VAT_RATE = 0.2;
  const VAT = totalSum * VAT_RATE;
  const totalWithVAT = totalSum + VAT;

  return (
    <>
      {backetBooks.length > 0
        ? backetBooks.map((element: Response) => (
            <PostsWrapper key={element.isbn13}>
              <ImgInfoWrapper>
                <ImgLink to={`/books/${element.isbn13}`}>
                  <PostImg>
                    {<img src={element.image} alt={`Post ${element.isbn13}`} />}
                  </PostImg>
                </ImgLink>
                <Infowrapper>
                  <TitleLink to={`/books/${element.isbn13}`}>
                    <TitleWrapper>{element.title}</TitleWrapper>
                  </TitleLink>
                  <AuthorPublisherPublishedWrapper>
                    {`by ${element.authors}. ${element.publisher} ${element.year}`}
                  </AuthorPublisherPublishedWrapper>
                  <Quantity isbn13={element.isbn13} />
                </Infowrapper>
              </ImgInfoWrapper>
              <FontAwesomeIconWrapper>
                <StarWrapper>
                  <PriceWraper>
                    $
                    {(
                      parseFloat(element.price.replace(/\$/g, '')) *
                      (basketQuantity[element.isbn13] || 1)
                    ).toFixed(2)}
                  </PriceWraper>
                </StarWrapper>
                <FontWrapper>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(element)}
                    icon={faX}
                  />
                </FontWrapper>
              </FontAwesomeIconWrapper>
            </PostsWrapper>
          ))
        : 'Постов нет'}
      <AllCheckWrapper>
        <FormWrapper>
          <SumandVatWrapper>
            <SumVatWrapper>
              Sum total
              <br />
              Vat
            </SumVatWrapper>
            <AllSumVatWrapper>
              ${totalSum.toFixed(2)}
              <br />${VAT.toFixed(2)}
            </AllSumVatWrapper>
          </SumandVatWrapper>
          <SumTotalWraper>
            <TotalWrapper>Total:</TotalWrapper>
            <AllTotalWrapper>${totalWithVAT.toFixed(2)}</AllTotalWrapper>
          </SumTotalWraper>
        </FormWrapper>
        <ButtonWrapper>
          <Button
            variant="primary"
            onClick={backetBooks.length > 0 ? check : () => {}}
          >
            check out
          </Button>
        </ButtonWrapper>
      </AllCheckWrapper>
    </>
  );
};

const AllCheckWrapper = styled.div`
  width: 256px;
  margin-left: auto;
`;

const ButtonWrapper = styled.div`
  & > button {
    width: -webkit-fill-available;
  }
`;

const FormWrapper = styled.div``;

const SumTotalWraper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SumandVatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalWrapper = styled.div`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const AllTotalWrapper = styled.div`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const SumVatWrapper = styled.div`
  font-family: 'Helios';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #a8a8a8;
`;

const AllSumVatWrapper = styled.div`
  font-family: 'Helios';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const FontWrapper = styled.div`
  & > svg {
    width: 18px;
    height: auto;
    cursor: pointer;
  }
`;

const PostsWrapper = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const Infowrapper = styled.div`
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgInfoWrapper = styled.div`
  display: flex;
`;

const FontAwesomeIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const PostImg = styled.div`
  text-align: center;
  width: 200px;

  & img {
    width: 100%;
    height: auto;
    transition: border 0.3s;
  }
`;

const PriceWraper = styled.div`
  display: flex;
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 113px;
`;

const AuthorPublisherPublishedWrapper = styled.p`
  font-family: 'Archivo';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

const ImgLink = styled(Link)`
  & img {
    border: 2px solid transparent;
  }

  &:hover img {
    border: 2px solid #007bff;
  }
`;
