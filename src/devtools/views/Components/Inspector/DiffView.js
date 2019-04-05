import React from 'react';
import styled from 'styled-components';
import JSONTree from 'react-json-tree';
import DiffPatcher from '../../../utils/diff';
import getItemString from './getItemString';

const RemovedValue = styled.span`
  background: #7f5c6a;
  text-decoration: line-through;
  padding: 3px;
  border-radius: 7px;
`;

const AddedValue = styled.span`
  background: #586b49;
  padding: 3px;
  border-radius: 7px;
`;

const BetweenArrow = styled.span`
  color: #ba72a9;
`;

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#282f38',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

const json = {
  numbers: [1, 2, 3],
  isBoolean: true,
  FooDome: {
    foo: 'bar',
  },
};

const json2 = {
  numbers: [1, 2],
  isBoolean: false,
  FooDome: {
    foo: 'bar',
    bar: 'foo',
  },
};

function prepareDelta(value) {
  if (value && value._t === 'a') {
    const res = {};
    for (let key in value) {
      if (key !== '_t') {
        if (key[0] === '_' && !value[key.substr(1)]) {
          res[key.substr(1)] = value[key];
        } else if (value['_' + key]) {
          res[key] = [value['_' + key][0], value[key][0]];
        } else if (!value['_' + key] && key[0] !== '_') {
          res[key] = value[key];
        }
      }
    }
    return res;
  }

  return value;
}

const DiffView = () => {
  function valueRenderer(raw, value) {
    console.log({ raw, value });

    if (!Array.isArray(value)) {
      return raw;
    }

    switch (value.length) {
      case 1: {
        return <AddedValue>{String(value[0])}</AddedValue>;
      }
      case 2: {
        return (
          <span>
            <RemovedValue>{String(value[0])}</RemovedValue>{' '}
            <BetweenArrow>=></BetweenArrow>{' '}
            <AddedValue>{String(value[1])}</AddedValue>
          </span>
        );
      }
      case 3: {
        return <RemovedValue>{String(value[0])}</RemovedValue>;
      }
    }
  }

  // console.log(diffPatcher.diff(json, json2));
  const diff = DiffPatcher.diff(json, json2);

  console.log(diff);

  //      postprocessValue={prepareDelta}
  return (
    <JSONTree
      data={diff}
      theme={theme}
      invertTheme={false}
      hideRoot
      getItemString={getItemString}
      isCustomNode={Array.isArray}
      postprocessValue={prepareDelta}
      shouldExpandNode={(keyName, data, level) => level <= 1}
      valueRenderer={(raw, value) => {
        console.log(raw, value);
        return valueRenderer(raw, value);
      }}
    />
  );
};

export default DiffView;
