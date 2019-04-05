import React, { useState } from 'react';
import styled from 'styled-components';
import SegmentedControl from '../../devui/SegmentedControl/SegmentedControl';
import Tabs from '../common/Tabs';
import StateView from './DiffView';

const Container = styled.div``;

const Header = styled.div`
  background: #5e6169;
  height: 40px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #5e636a;
  display: flex;
`;

const Title = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const DetailsPane = () => {
  const [selectedTab, setSelectedTab] = useState('Tree');

  return (
    <Container>
      <Header>
        <Title>Diff</Title>
        <SegmentedControl
          values={['State', 'Diff']}
          selected="State"
          onClick={null}
        />
      </Header>
      <Tabs
        tabs={[{ name: 'Tree' }, { name: 'Raw' }]}
        selected={selectedTab}
        main
        onClick={tabName => setSelectedTab(tabName)}
        collapsible
      />
      { selectedTab === 'Tree' && <StateView /> }
    </Container>
  );
};

export default DetailsPane;
