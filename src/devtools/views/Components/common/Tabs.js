import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  background: #3b444e;
`;

const Tab = styled.div`
  color: ${props => (props.isDisabled ? '#abacad' : '#fff')};
  font-size: 14px;
  padding: 5px 30px;

  ${props => props.isActive && `border-bottom: 2px solid #64b3d0;`}
  ${props =>
    props.isMain &&
    css`
      padding: 10px 30px;
      font-size: 15px;
    `}
`;

const Tabs = ({ tabs, selected, onClick, isMain }) => {
  return (
    <Container>
      {tabs.map(tab => {
        return (
          <Tab
            key={tab.name}
            isActive={selected === tab.name}
            isDisabled={tab.disabled}
            onClick={() => {
              onClick(tab.name);
            }}
            isMain={isMain}
          >
            {tab.name}
          </Tab>
        );
      })}
    </Container>
  );
};

export default Tabs;
