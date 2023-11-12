import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { Response } from '#features/auth/types';
import { FavoriteForm } from '#features/favorite-post/favorite-form';

interface Props {
  handleSearch: (searchText: string) => void;
  response: Response;
}

export const Favorite: React.FC<Props> = ({ handleSearch, response }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      backLink={<BackLink />}
      title={<Title2>Favorites</Title2>}
      body={<FavoriteForm response={response} />}
    />
  );
};
