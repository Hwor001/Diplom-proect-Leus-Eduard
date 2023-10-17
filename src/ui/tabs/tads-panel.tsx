import React from 'react';
import styled from 'styled-components';

type Item = {
  id: string;
  title: string;
};

type Props = {
  items: Item[];
  activeId: string;
  onTabClick: (id: string) => void;
};

export const TabPanel: React.FC<Props> = ({ items, activeId, onTabClick }) => {
  return (
    <TabPanelWrapper>
      {items.map(({ id, title }) => (
        <Tab
          key={id}
          id={id}
          title={title}
          isActive={id === activeId}
          onClick={onTabClick}
        />
      ))}
    </TabPanelWrapper>
  );
};

const css = String.raw;

const TabPanelWrapper = styled.ul`
  all: unset;
  display: flex;
  color: var(--text-primary-color);
  justify-content: center;
  & > * + * {
    margin-inline-start: 20px;
  }
`;

type TabProps = Item & {
  isActive: boolean;
  onClick: (id: string) => void;
};

const Tab: React.FC<TabProps> = ({ id, title, isActive, onClick }) => {
  return (
    <TabWrapper $isActive={isActive}>
      <TabButton type="button" onClick={() => onClick(id)}>
        {title}
      </TabButton>
    </TabWrapper>
  );
};

const TabWrapper = styled.li<{ $isActive: boolean }>`
  display: block;
  border-bottom: ${({ $isActive }) => {
    return $isActive && css`1px solid var(--text-primary-color)`;
  }};
`;

const TabButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 20px 88px;
  font-family: 'Bebas Neue';
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;

  &:hover {
    color: blue;
  }

  &:active {
    color: silver;
  }
`;
