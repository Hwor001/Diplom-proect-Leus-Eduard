import { Response } from '#features/auth/types';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { RootState, store } from '../../store1';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCart } from '../../features/postactive/basket.slice';
import { Quantity } from '#ui/element/quantity';
import { Button } from '#ui/button/button';

interface BookProps {
  response: Response;
}

export const BasketBook: React.FC<BookProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state: RootState) => state.basketBooks.itemsInCart);
  const basketQuantity = useSelector(
    (state: RootState) => state.basketQuantity
  );
  const handleDelete = (element: Response) => {
    dispatch(deleteItemFromCart(element.isbn13));
    console.log('After dispatch:', store.getState());
  };

  const check = () => {
    navigate('/Check');
  };

  const totalSum = item.reduce(
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
      {item.length > 0
        ? item.map((element: Response) => (
            <PostsWrapper key={element.isbn13}>
              <ImgInfoWrapper>
                <PostImg>
                  {<img src={element.image} alt={`Post ${element.isbn13}`} />}
                </PostImg>
                <Infowrapper>
                  <Link to={`/books/${element.isbn13}`}>
                    <TitleWrapper>{element.title}</TitleWrapper>
                  </Link>
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
                      (basketQuantity[element.isbn13] || 0)
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
            onClick={item.length > 0 ? check : () => {}}
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
  //   width: 352px;
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
