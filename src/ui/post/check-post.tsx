import { Response } from '#features/auth/types';
import { styled } from 'styled-components';
import { RootState } from '../../store1';
import { useSelector } from 'react-redux';
import { Quantity } from '#ui/quantity/quantity';
import { useState, useEffect } from 'react';
import { ref, get, DataSnapshot, remove } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';

export const CheckBook: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState<Response[]>([]);
  const basketQuantity = useSelector(
    (state: RootState) => state.basketQuantity
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      }
    });

    const fetchData = async () => {
      const favoritesRef = ref(database, `users/${userName}/basket`);
      try {
        const snapshot: DataSnapshot = await get(favoritesRef);
        if (snapshot.exists()) {
          const favoritesData: Response[] = [];
          snapshot.forEach((childSnapshot) => {
            favoritesData.push(childSnapshot.val());
          });
          setFavoriteBooks(favoritesData);
        }
      } catch (error) {
        console.error('Error fetching data from database:', error);
      }
    };

    if (userName) {
      fetchData();
    }

    return () => unsubscribe();
  }, [userName]);

  const totalSum = favoriteBooks.reduce(
    (sum, element) =>
      sum +
      parseFloat(element.price.replace(/\$/g, '')) *
        (basketQuantity[element.isbn13] || 0),
    0
  );
  const VAT_RATE = 0.2;
  const VAT = totalSum * VAT_RATE;
  const totalWithVAT = totalSum + VAT;

  return (
    <>
      {favoriteBooks.length > 0
        ? favoriteBooks.map((element: Response) => (
            <PostsWrapper key={element.isbn13}>
              <ImgInfoWrapper>
                <PostImg>
                  {<img src={element.image} alt={`Post ${element.isbn13}`} />}
                </PostImg>
                <Infowrapper>
                  <TitleWrapper>{element.title}</TitleWrapper>
                  <HiddenQuantity>
                    <Text2Wrapper>quantity: </Text2Wrapper>
                    <Quantity isbn13={element.isbn13} />
                  </HiddenQuantity>
                </Infowrapper>
                <TextWrapper>in stock</TextWrapper>
              </ImgInfoWrapper>
            </PostsWrapper>
          ))
        : 'Постов нет'}
      <AllCheckWrapper>
        <SumTotalWraper>
          <TotalWrapper>from you:</TotalWrapper>
          <AllTotalWrapper>${totalWithVAT.toFixed(2)}</AllTotalWrapper>
        </SumTotalWraper>
      </AllCheckWrapper>
    </>
  );
};

const Text2Wrapper = styled.div`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: black;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
  transform: translate(25px, -18px);
  color: green;
`;

const AllCheckWrapper = styled.div`
  width: 256px;
  margin: auto;
`;

const SumTotalWraper = styled.div`
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

const PostsWrapper = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const Infowrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgInfoWrapper = styled.div`
  display: flex;
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
  }
`;

const HiddenQuantity = styled.div`
  display: flex;
  transform: translateX(10px);
  & svg {
    display: none;
  }
`;
