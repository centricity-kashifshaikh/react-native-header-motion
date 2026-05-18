"use strict";

import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useHeaderMotionContextOrThrow } from "../context.js";
import { cloneWithOnLayout, composeOnLayoutHandlers, resolveSlottableChild } from "../utils/index.js";
import { HeaderDynamic } from "./HeaderDynamic.js";
import { HeaderPanBoundary } from "./HeaderPanBoundary.js";
import { jsx as _jsx } from "react/jsx-runtime";
const headerOverlayStyle = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  }
}).overlay;
function HeaderRoot(props) {
  const ctxValue = useHeaderMotionContextOrThrow('HeaderMotion.Header must be used within <HeaderMotion /> or <HeaderMotion.NavigationBridge />. If you are rendering inside a navigation header, bridge the context with <HeaderMotion.Bridge /> and <HeaderMotion.NavigationBridge />.');
  if (props.asChild) {
    const child = resolveSlottableChild('HeaderMotion.Header', props.children);
    return /*#__PURE__*/_jsx(HeaderPanBoundary, {
      pannable: props.pannable,
      panDecayConfig: props.panDecayConfig,
      headerPanMomentumOffset: ctxValue.headerPanMomentumOffset,
      scrollToRef: ctxValue.scrollToRef,
      withGestureHandlerRootView: props.withGestureHandlerRootView,
      children: cloneWithOnLayout(child, ctxValue.measureTotalHeight, 'HeaderMotion.Header')
    });
  }
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asChild: _asChild,
    overlay = true,
    pannable,
    panDecayConfig,
    onLayout,
    style,
    withGestureHandlerRootView,
    ...rest
  } = props;
  const resolvedOnLayout = onLayout;
  return /*#__PURE__*/_jsx(HeaderPanBoundary, {
    pannable: pannable,
    panDecayConfig: panDecayConfig,
    headerPanMomentumOffset: ctxValue.headerPanMomentumOffset,
    scrollToRef: ctxValue.scrollToRef,
    withGestureHandlerRootView: withGestureHandlerRootView,
    children: /*#__PURE__*/_jsx(Animated.View, {
      ...rest,
      onLayout: composeOnLayoutHandlers(resolvedOnLayout, ctxValue.measureTotalHeight),
      style: [overlay ? headerOverlayStyle : undefined, style]
    })
  });
}

/**
 * Header container that measures the total header height for scroll offsetting.
 *
 * It renders an `Animated.View` by default, wires the outer header measurement
 * automatically, and can optionally make the header surface pannable.
 *
 * Pair it with `Header.Dynamic` to mark the part of the header that should
 * drive the collapse threshold.
 */
export const Header = Object.assign(HeaderRoot, {
  /**
   * Marks the part of the header whose measured layout should define the
   * collapsible distance.
   *
   * In most designs, this is the section that visually disappears while the
   * header collapses. Its measured value feeds `measureDynamic`, which can in
   * turn drive `progressThreshold`.
   */
  Dynamic: HeaderDynamic
});
//# sourceMappingURL=Header.js.map