"use strict";

import { cloneElement, createElement, isValidElement } from 'react';
import { RefreshControl } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

// FIXME: Types are a mess here
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatedRefreshControl = Animated.createAnimatedComponent(RefreshControl);
export function resolveRefreshControl({
  refreshControl,
  refreshing,
  onRefresh,
  progressViewOffset
}) {
  if (!refreshControl) {
    return createRefreshControlWithOffset({
      refreshing,
      onRefresh,
      progressViewOffset
    });
  }
  return /*#__PURE__*/isValidElement(refreshControl) ? injectProgressViewOffset(refreshControl, progressViewOffset) : undefined;
}
function createRefreshControlWithOffset({
  refreshing,
  onRefresh,
  progressViewOffset
}) {
  if (!onRefresh) {
    return undefined;
  }
  return /*#__PURE__*/createElement(ResolvedRefreshControl, {
    refreshing: refreshing ?? false,
    onRefresh: onRefresh,
    progressViewOffset: progressViewOffset
  });
}
function injectProgressViewOffset(refreshControl, progressViewOffset) {
  const offset = refreshControl.props.progressViewOffset ?? progressViewOffset;
  if (!isSharedValue(offset)) {
    return /*#__PURE__*/cloneElement(refreshControl, {
      progressViewOffset: offset
    });
  }
  return /*#__PURE__*/createElement(ResolvedRefreshControl, {
    ...refreshControl.props,
    progressViewOffset: progressViewOffset
  });
}
function ResolvedRefreshControl({
  refreshing,
  onRefresh,
  progressViewOffset,
  ...props
}) {
  const animatedProps = useAnimatedProps(() => {
    return {
      ...(isSharedValue(refreshing) ? {
        refreshing: refreshing.value
      } : {}),
      ...(isSharedValue(onRefresh) ? {
        onRefresh: onRefresh.value
      } : {}),
      ...(isSharedValue(progressViewOffset) ? {
        progressViewOffset: progressViewOffset.value
      } : {})
    };
  });
  const nonAnimatedProps = {
    ...(isSharedValue(refreshing) ? {} : {
      refreshing
    }),
    ...(isSharedValue(onRefresh) ? {} : {
      onRefresh
    }),
    ...(isSharedValue(progressViewOffset) ? {} : {
      progressViewOffset
    })
  };
  return /*#__PURE__*/_jsx(AnimatedRefreshControl, {
    ...props,
    ...nonAnimatedProps,
    refreshing: nonAnimatedProps.refreshing,
    animatedProps: animatedProps
  });
}
function isSharedValue(value) {
  'worklet';

  return typeof value === 'object' && value !== null && 'value' in value;
}
//# sourceMappingURL=refreshControl.js.map