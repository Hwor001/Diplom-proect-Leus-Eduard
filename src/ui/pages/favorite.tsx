import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { SeachBooks } from '#features/auth/types';
import { FavoriteForm } from '#features/favorite-post/favorite-form';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const Favorite: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      backLink={<BackLink />}
      title={<Title>Favorites</Title>}
      body={<FavoriteForm />}
    />
  );
};
