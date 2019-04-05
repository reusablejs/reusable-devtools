/**
 * Install the hook on window, which is an event emitter.
 * Note because Chrome content scripts cannot directly modify the window object,
 * we are evaling this function by inserting a script tag.
 * That's why we have to inline the whole event emitter implementation here.
 *
 * @flow
 */

import type { DevToolsHook } from 'src/backend/types';

declare var window: any;

export function installHook(target: any): DevToolsHook | null {
  if (target.hasOwnProperty('__REUSABLE_GLOBAL_HOOK__')) return null;

  const hook = {};

  Object.defineProperty(
    target,
    '__REUSABLE_GLOBAL_HOOK__',
    ({
      enumerable: false,
      get() {
        return hook;
      },
    }: Object)
  );

  return hook;
}
