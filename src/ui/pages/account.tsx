import { AccountForm } from '#features/account/account-form';
import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';

interface Props {
  handleSearch: (searchText: string) => void;
}

export const Account: React.FC<Props> = ({ handleSearch }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      backLink={<BackLink />}
      title={<Title2>Account</Title2>}
      body={<AccountForm />}
    />
  );
};
