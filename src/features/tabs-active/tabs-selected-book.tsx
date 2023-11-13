import { useState } from 'react';
import { TabPanel } from '#ui/tabs/tads-panel';
import styled from 'styled-components';
import { DescriptionForm } from '#features/description/description-form';
import { AuthorsForm } from '#features/authors/authors-form';
import { RewiewsForm } from '#features/reviews/reviews-form';
import { Response } from '#features/auth/types';

type ListOfPostsProps = {
  book: Response;
};

export const TabsSelectedBook: React.FC<ListOfPostsProps> = ({ book }) => {
  const tabItems = [
    { id: 'Description', title: 'Description' },
    { id: 'Authors', title: 'Authors' },
    { id: 'Reviews', title: 'Reviews' },
  ];

  const [activeTabId, setActiveTabId] = useState(tabItems[0].id);

  return (
    <TabsWrapper>
      <TabPanel
        items={tabItems}
        activeId={activeTabId}
        onTabClick={setActiveTabId}
      />
      {activeTabId === 'Description' ? (
        <DescriptionForm response={book} />
      ) : null}
      {activeTabId === 'Authors' ? <AuthorsForm response={book} /> : null}
      {activeTabId === 'Reviews' ? <RewiewsForm /> : null}
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  border: 1px solid #e7e7e7;
  width: 1120px;

  & ul {
    justify-content: flex-start;
  }
`;
