import { NewPasswordForm } from '#features/new-password/new-password-form';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Backlink } from '../../features/back-link/back-link';

export const NewPassword: React.FC = () => {
  return <MainTemplate header={<Header />} body={<NewPasswordForm />} />;
};
