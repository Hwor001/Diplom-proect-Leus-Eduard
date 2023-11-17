import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { Response, SeachBooks } from '#features/auth/types';
import { FavoriteForm } from '#features/favorite-post/favorite-form';

interface Props {
  handleSearch: (searchText: string) => void;
  response: Response;
  post: SeachBooks;
}

export const Favorite: React.FC<Props> = ({ handleSearch, response, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      backLink={<BackLink />}
      title={<Title2>Favorites</Title2>}
      body={<FavoriteForm response={response} />}
    />
  );
};
