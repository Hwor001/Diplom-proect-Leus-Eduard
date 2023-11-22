import { MainTemplate } from '#ui/templates/main-template';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { Response, SeachBooks } from '#features/auth/types';
import { CheckForm } from '#features/check/check-form';

interface Props {
  handleSearch: (searchText: string) => void;
  response: Response;
  post: SeachBooks;
}

export const Check: React.FC<Props> = ({ handleSearch, response, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      title={<Title2>you ordered</Title2>}
      body={<CheckForm response={response} />}
    />
  );
};
