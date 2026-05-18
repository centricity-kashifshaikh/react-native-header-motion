"use strict";

import { HeaderMotionContext } from "../context.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Re-provides HeaderMotion context in a different part of the React tree.
 *
 * This is primarily useful for navigation libraries that render headers outside
 * the screen subtree where `HeaderMotion` itself lives.
 */
export function NavigationBridge({
  value,
  children
}) {
  return /*#__PURE__*/_jsx(HeaderMotionContext.Provider, {
    value: value,
    children: children
  });
}
//# sourceMappingURL=NavigationBridge.js.map