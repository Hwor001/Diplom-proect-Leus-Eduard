import { AccountForm } from '#features/account/account-form';
import { MainTemplate } from '#ui/templates/main-template';
import { Backlink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';

export const Account: React.FC = () => {
  return (
    <MainTemplate
      header={<Header />}
      backLink={<Backlink />}
      title={<Title2>Account</Title2>}
      body={<AccountForm />}
    />
  );
};
