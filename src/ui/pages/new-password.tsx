import { NewPasswordForm } from '#features/new-password/new-password-form';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const NewPassword: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      body={<NewPasswordForm />}
    />
  );
};
