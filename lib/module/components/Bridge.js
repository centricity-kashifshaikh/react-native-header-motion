"use strict";

import { useHeaderMotionBridge } from "../hooks/useHeaderMotionBridge.js";
/**
 * Reads the current HeaderMotion context and exposes it through a render
 * function so it can be forwarded into another subtree.
 */
export function Bridge({
  children
}) {
  if (typeof children !== 'function') {
    throw new Error('HeaderMotion.Bridge only accepts a render function as its child.');
  }
  return children(useHeaderMotionBridge());
}
//# sourceMappingURL=Bridge.js.map