import { TabsActive } from '#features/tabs-active/tabs-active';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Title } from '#ui/title/title';
// import { Backlink } from '../../features/back-link/back-link';

interface Props {
  handleSearch: (searchText: string) => void;
}

export const PageSingInAndUp: React.FC<Props> = ({ handleSearch }) => {
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      body={<TabsActive />}
    />
  );
};
