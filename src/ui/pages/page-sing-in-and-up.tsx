import { TabsActive } from '#features/tabs-active/tabs-active';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const PageSingInAndUp: React.FC<Props> = ({ handleSearch, post }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      body={<TabsActive />}
    />
  );
};
