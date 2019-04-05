// @flow

import React, { useEffect, useState } from 'react';
import { BridgeContext } from './context';

import styles from './DevTools.css';

import './root.css';

import type { Bridge } from '../../types';

export type BrowserName = 'Chrome' | 'Firefox';
export type BrowserTheme = 'dark' | 'light';
export type TabID = 'components' | 'profiler' | 'settings';

export type Props = {|
  bridge: Bridge,
  browserName: BrowserName,
  browserTheme: BrowserTheme,
  defaultTab?: TabID,
  showTabBar?: boolean,
  store: Store,
  viewElementSource?: ?Function,

  // This property is used only by the web extension target.
  // The built-in tab UI is hidden in that case, in favor of the browser's own panel tabs.
  // This is done to save space within the app.
  // Because of this, the extension needs to be able to change which tab is active/rendered.
  overrideTab?: TabID,

  // To avoid potential multi-root trickiness, the web extension uses portals to render tabs.
  // The root <DevTools> app is rendered in the top-level extension window,
  // but individual tabs (e.g. Components, Profiling) can be rendered into portals within their browser panels.
  componentsPortalContainer?: Element,
  profilerPortalContainer?: Element,
  settingsPortalContainer?: Element,
|};

export default function DevTools({
  bridge,
  browserName,
  browserTheme = 'light',
  defaultTab = 'components',
  componentsPortalContainer,
  overrideTab,
  profilerPortalContainer,
  settingsPortalContainer,
  showTabBar = false,
  store,
  viewElementSource = null,
}: Props) {
  return (
    <BridgeContext.Provider value={bridge}>Hello world</BridgeContext.Provider>
  );
}
