"use strict";

import { useMemo } from 'react';
import { Platform } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAnimatedReaction, withDecay } from 'react-native-reanimated';
import { jsx as _jsx } from "react/jsx-runtime";
const PLATFORM_PANNING_ENABLED = Platform.select({
  default: true,
  android: false
});
export function HeaderPanBoundary({
  children,
  pannable = false,
  panDecayConfig,
  scrollToRef,
  headerPanMomentumOffset,
  withGestureHandlerRootView = false
}) {
  useAnimatedReaction(() => headerPanMomentumOffset.get(), (offset, prevOffset) => {
    if (offset !== null) {
      const dy = offset - (prevOffset ?? 0);
      scrollToRef.current?.(dy);
    }
  });
  const isPanEnabled = PLATFORM_PANNING_ENABLED && pannable;
  const pan = useMemo(() => Gesture.Pan().enabled(isPanEnabled).onChange(e => {
    const dy = e.changeY;
    scrollToRef.current?.(dy);
  }).onEnd(e => {
    const resolvedConfig = resolvePanDecayConfig(panDecayConfig, e);
    headerPanMomentumOffset.set(withDecay(resolvedConfig, () => headerPanMomentumOffset.set(null)));
  }).shouldCancelWhenOutside(false), [headerPanMomentumOffset, isPanEnabled, panDecayConfig, scrollToRef]);
  const content = /*#__PURE__*/_jsx(GestureDetector, {
    gesture: pan,
    children: children
  });
  if (!withGestureHandlerRootView) {
    return content;
  }
  return /*#__PURE__*/_jsx(GestureHandlerRootView, {
    children: content
  });
}
function resolvePanDecayConfig(panDecayConfig, event) {
  'worklet';

  const resolvedConfig = typeof panDecayConfig === 'function' ? panDecayConfig(event) : panDecayConfig;
  return {
    ...resolvedConfig,
    velocity: resolvedConfig?.velocity ?? event.velocityY
  };
}
//# sourceMappingURL=HeaderPanBoundary.js.map