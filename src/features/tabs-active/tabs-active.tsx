import { useState } from 'react';
import { TabPanel } from '#ui/tabs/tads-panel';
import { SingInForm } from '#features/sing-in-form/sing-in-form';
import { SingUpForm } from '#features/sing-up-form/sing-up-form';
import styled from 'styled-components';

export const TabsActive: React.FC = () => {
  const tabItems = [
    { id: 'SING IN', title: 'SING IN' },
    { id: 'SING UP', title: 'SING UP' },
  ];

  const [activeTabId, setActiveTabId] = useState(tabItems[0].id);

  return (
    <TabsWrapper>
      <TabPanel
        items={tabItems}
        activeId={activeTabId}
        onTabClick={setActiveTabId}
      />
      {activeTabId === 'SING IN' ? <SingInForm /> : null}
      {activeTabId === 'SING UP' ? <SingUpForm /> : null}
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  border: 1px solid #e7e7e7;
`;
