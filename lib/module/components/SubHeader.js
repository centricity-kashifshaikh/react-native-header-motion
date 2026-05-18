"use strict";

import { cloneElement, isValidElement, useEffect } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useHeaderMotionContextOrThrow } from "../context.js";
import { composeOnLayoutHandlers, resolveSlottableChild } from "../utils/index.js";
import { DEFAULT_SCROLL_ID } from "../utils/defaults.js";
import { jsx as _jsx } from "react/jsx-runtime";
const baseStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 20
};
export function SubHeader(props) {
  const ctx = useHeaderMotionContextOrThrow('HeaderMotion.SubHeader must be used within <HeaderMotion /> or <HeaderMotion.NavigationBridge />.');
  const scrollId = props.scrollId ?? DEFAULT_SCROLL_ID;
  const topInset = props.topInset ?? 0;
  const staticHeight = props.height;
  const handleLayout = e => {
    if (staticHeight !== undefined) {
      return;
    }
    ctx.setSubHeaderHeight(scrollId, e.nativeEvent.layout.height, topInset);
  };
  useEffect(() => {
    if (staticHeight === undefined) {
      return;
    }
    ctx.setSubHeaderHeight(scrollId, staticHeight, topInset);
  }, [ctx, scrollId, staticHeight, topInset]);
  const stickyStyle = useAnimatedStyle(() => {
    const collapsedHeaderHeight = Math.max(0, ctx.originalHeaderHeight - ctx.progressThreshold.get());
    const currentHeaderHeight = ctx.originalHeaderHeight - ctx.progress.get() * (ctx.originalHeaderHeight - collapsedHeaderHeight);
    return {
      top: currentHeaderHeight + topInset
    };
  }, [ctx.originalHeaderHeight, topInset]);
  if (props.asChild) {
    const child = resolveSlottableChild('HeaderMotion.SubHeader', props.children);
    if (! /*#__PURE__*/isValidElement(child)) {
      return null;
    }
    const childAsAny = child;
    return /*#__PURE__*/cloneElement(childAsAny, {
      onLayout: composeOnLayoutHandlers(childAsAny.props.onLayout, handleLayout),
      style: [childAsAny.props.style, baseStyle, stickyStyle]
    });
  }
  const {
    style,
    onLayout,
    ...rest
  } = props;
  const userOnLayout = onLayout;
  return /*#__PURE__*/_jsx(Animated.View, {
    ...rest,
    onLayout: composeOnLayoutHandlers(userOnLayout, handleLayout),
    style: [baseStyle, stickyStyle, style]
  });
}
//# sourceMappingURL=SubHeader.js.map