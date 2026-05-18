"use strict";

import { useHeaderMotionContextOrThrow } from "../context.js";
/**
 * Returns the full internal HeaderMotion context value.
 *
 * Most app code should use `useMotionProgress()` instead. Reach for this hook
 * only when you need to carry HeaderMotion context across a tree boundary and
 * re-provide it somewhere else.
 */
export function useHeaderMotionBridge() {
  return useHeaderMotionContextOrThrow('useHeaderMotionBridge must be used within <HeaderMotion />. Use it only when bridging context into a separate subtree with <HeaderMotion.Bridge /> and <HeaderMotion.NavigationBridge />.');
}
//# sourceMappingURL=useHeaderMotionBridge.js.map