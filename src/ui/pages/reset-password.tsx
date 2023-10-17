import { ResetPasswordForm } from '#features/reset-password/reset-password-form';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Backlink } from '../../features/back-link/back-link';

export const ResetPassword: React.FC = () => {
  return <MainTemplate header={<Header />} body={<ResetPasswordForm />} />;
};
