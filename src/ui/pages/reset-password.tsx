import { ResetPasswordForm } from '#features/reset-password/reset-password-form';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Backlink } from '../../features/back-link/back-link';

interface Props {
  handleSearch: (searchText: string) => void;
}

export const ResetPassword: React.FC<Props> = ({ handleSearch }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      body={<ResetPasswordForm />}
    />
  );
};
