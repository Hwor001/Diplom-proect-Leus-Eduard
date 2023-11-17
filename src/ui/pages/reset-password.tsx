import { ResetPasswordForm } from '#features/reset-password/reset-password-form';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Backlink } from '../../features/back-link/back-link';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const ResetPassword: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      body={<ResetPasswordForm />}
    />
  );
};
