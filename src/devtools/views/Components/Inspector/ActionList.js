import React from 'react';
import styled from 'styled-components';

const ActionRow = styled.div`
  border-bottom: 1px solid #65686f;
  color: #fff;
  padding: 10px;

  &:hover {
    background: #3a444d;
  }
`;

const Filter = styled.input`
  width: 100%;
  background: transparent;
  padding: 10px;
  border: none;
  outline: none;
  color: #fff;

  ::-webkit-input-placeholder {
    color: #fff;
    opacity: 0.6;
  }
`;

const ActionsList = () => {
  return (
    <div>
      <div>
        <Filter placeholder="Filter..." />
      </div>
      <ActionRow>INIT UNIT</ActionRow>
      <ActionRow>SET UNIT HOOK_NAME</ActionRow>
      <ActionRow>DISPATCH UNIT ACTION_TYPE</ActionRow>
    </div>
  );
};

export default ActionsList;
