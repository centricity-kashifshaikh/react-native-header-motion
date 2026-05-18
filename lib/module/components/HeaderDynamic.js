"use strict";

import Animated from 'react-native-reanimated';
import { useHeaderMotionContextOrThrow } from "../context.js";
import { cloneWithOnLayout, composeOnLayoutHandlers, resolveSlottableChild } from "../utils/index.js";

/**
 * Marks the part of the header whose layout should define the collapsible
 * distance.
 *
 * In most designs, this is the section that visually disappears while the
 * header collapses. Its measured value feeds `measureDynamic`, which in turn
 * can drive `progressThreshold`.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function HeaderDynamic(props) {
  const ctxValue = useHeaderMotionContextOrThrow('HeaderMotion.Header.Dynamic must be used within <HeaderMotion /> or <HeaderMotion.NavigationBridge />. If you are rendering inside a navigation header, bridge the context with <HeaderMotion.Bridge /> and <HeaderMotion.NavigationBridge />.');
  if (props.asChild) {
    return cloneWithOnLayout(resolveSlottableChild('HeaderMotion.Header.Dynamic', props.children), ctxValue.measureDynamic, 'HeaderMotion.Header.Dynamic');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    asChild: _asChild,
    onLayout,
    ...rest
  } = props;
  const resolvedOnLayout = onLayout;
  return /*#__PURE__*/_jsx(Animated.View, {
    ...rest,
    onLayout: composeOnLayoutHandlers(resolvedOnLayout, ctxValue.measureDynamic)
  });
}
//# sourceMappingURL=HeaderDynamic.js.map