// @flow

import { createContext } from 'react';

import type { Bridge } from '../../types';

export const BridgeContext = createContext<Bridge>(((null: any): Bridge));
BridgeContext.displayName = 'BridgeContext';
