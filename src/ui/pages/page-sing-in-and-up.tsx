import { TabsActive } from '#features/tabs-active/tabs-active';
import Header from '#ui/header/header';
import { MainTemplate } from '#ui/templates/main-template';
// import { Title } from '#ui/title/title';
// import { Backlink } from '../../features/back-link/back-link';

export const PageSingInAndUp: React.FC = () => {
  return <MainTemplate header={<Header />} body={<TabsActive />} />;
};
