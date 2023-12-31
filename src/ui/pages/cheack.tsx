import { MainTemplate } from '#ui/templates/main-template';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { SeachBooks } from '#features/auth/types';
import { CheckForm } from '#features/check/check-form';

interface Props {
  handleSearch: (searchText: string) => void;

  post: SeachBooks;
}

export const Check: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      title={<Title>you ordered</Title>}
      body={<CheckForm />}
    />
  );
};
