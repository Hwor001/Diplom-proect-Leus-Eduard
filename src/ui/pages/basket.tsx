import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { BasketForm } from '#features/basket-form/basket-form';
import { Response } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  response: Response;
}

export const Basket: React.FC<Props> = ({ handleSearch, response }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      backLink={<BackLink />}
      title={<Title2>Your cart</Title2>}
      body={<BasketForm response={response} />}
    />
  );
};
