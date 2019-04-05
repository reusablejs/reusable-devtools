import React from 'react';
import styled from 'styled-components';
import ActionList from './ActionList';
import DetailsPane from './DetailsPane';
import Tabs from '../common/Tabs';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  background: #292f39;
`;

const ActionListContainer = styled.div`
  width: 400px;
  height: 100%;
  border-right: 1px solid #5e6169;
`;

const DetailsPaneContainer = styled.div`
  flex: 1;
  height: 100%;
  border-left: 1px solid #6b6e74;
`;

const Inspector = () => {
  return (
    <React.Fragment>
      <Tabs
        tabs={[
          { name: 'Inspector' },
          { name: 'Chart', disabled: true }
        ]}
        selected="Inspector"
        isMain
        onClick={() => {}}
      />
      <Container>
        <ActionListContainer>
          <ActionList />
        </ActionListContainer>
        <DetailsPaneContainer>
          <DetailsPane />
        </DetailsPaneContainer>
      </Container>
    </React.Fragment>
  );
};

export default Inspector;
