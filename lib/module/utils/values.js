"use strict";

import { DEFAULT_SCROLL_ID } from "./defaults.js";
export function getInitialScrollValue() {
  'worklet';

  return {
    min: 0,
    current: 0
  };
}
export function ensureScrollValueRegistered(scrollValues, id) {
  'worklet';

  const values = scrollValues.get();
  if (values[id]) {
    return values;
  }
  scrollValues.modify(value => {
    if (!value[id]) {
      value[id] = getInitialScrollValue();
    }
    return value;
  });
  return scrollValues.get();
}
export function warnIfMissingActiveScrollId(scrollValues, id, activeScrollId) {
  'worklet';

  if (!__DEV__ || activeScrollId || id === DEFAULT_SCROLL_ID) {
    return;
  }
  let nonDefaultCount = 0;
  let nonDefaultIds = '';
  for (const key in scrollValues) {
    if (key === DEFAULT_SCROLL_ID) {
      continue;
    }
    nonDefaultCount += 1;
    nonDefaultIds = nonDefaultIds ? `${nonDefaultIds}, ${key}` : key;
  }
  if (nonDefaultCount < 1) {
    return;
  }
  console.warn(`[react-native-header-motion] Explicit scrollIds (${nonDefaultIds}) are registered but no activeScrollId was provided. Pass useActiveScrollId(...).sv to <HeaderMotion activeScrollId={...}> to keep header motion deterministic.`);
}
//# sourceMappingURL=values.js.map