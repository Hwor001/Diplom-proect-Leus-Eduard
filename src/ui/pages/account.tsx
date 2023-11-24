import { AccountForm } from '#features/account/account-form';
import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const Account: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      backLink={<BackLink />}
      title={<Title>Account</Title>}
      body={<AccountForm />}
    />
  );
};
