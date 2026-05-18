"use strict";

import { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { Extrapolation, interpolate, useAnimatedReaction, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { HeaderMotionContext } from "../context.js";
import { DEFAULT_MEASURE_DYNAMIC, DEFAULT_PROGRESS_THRESHOLD, DEFAULT_SCROLL_ID, getInitialScrollValue } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const resolveScrollIdForProgress = (scrollValues, activeScrollIdValue) => {
  'worklet';

  if (activeScrollIdValue) {
    return activeScrollIdValue;
  }
  let onlyNonDefaultId = null;
  for (const key in scrollValues) {
    if (key === DEFAULT_SCROLL_ID) {
      continue;
    }
    if (onlyNonDefaultId !== null) {
      return DEFAULT_SCROLL_ID;
    }
    onlyNonDefaultId = key;
  }
  return onlyNonDefaultId ?? DEFAULT_SCROLL_ID;
};
/**
 * Root provider for a header-motion setup.
 *
 * It tracks the measured header layout, the active scroll position, and the
 * derived `progress` shared value consumed by your animated header UI.
 *
 * @template T - The type of scroll ID string
 */
function HeaderMotionContextProvider({
  progressThreshold = DEFAULT_PROGRESS_THRESHOLD,
  measureDynamic = DEFAULT_MEASURE_DYNAMIC,
  measureDynamicMode = 'mount',
  activeScrollId,
  progressExtrapolation = Extrapolation.CLAMP,
  children
}) {
  const dynamicMeasurement = useSharedValue(undefined);
  const [originalHeaderHeight, setOriginalHeaderHeight] = useState(0);
  const [subHeaderHeights, setSubHeaderHeights] = useState({});
  const progressThresholdValue = useSharedValue(typeof progressThreshold === 'number' ? progressThreshold : Infinity);
  const headerPanMomentumOffset = useSharedValue(null);
  const setOrUpdateDynamicMeasurement = useCallback(e => {
    const prevMeasurement = dynamicMeasurement.get();
    if (prevMeasurement !== undefined && measureDynamicMode === 'mount') {
      return;
    }
    const measured = measureDynamic(e);
    if (prevMeasurement === measured) {
      return;
    }
    dynamicMeasurement.set(measured);
    const nextThreshold = typeof progressThreshold === 'number' ? progressThreshold : progressThreshold(measured);
    progressThresholdValue.set(nextThreshold);
  }, [measureDynamicMode, measureDynamic, dynamicMeasurement, progressThreshold, progressThresholdValue]);
  useEffect(() => {
    if (typeof progressThreshold === 'number') {
      progressThresholdValue.set(progressThreshold);
      return;
    }
    const measured = dynamicMeasurement.get();
    const nextThreshold = measured === undefined ? Infinity : progressThreshold(measured);
    progressThresholdValue.set(nextThreshold);
  }, [progressThreshold, dynamicMeasurement, progressThresholdValue]);
  const measureTotalHeight = useCallback(e => {
    const measuredValue = e.nativeEvent.layout.height;
    setOriginalHeaderHeight(measuredValue);
  }, [setOriginalHeaderHeight]);
  const setSubHeaderHeight = useCallback((id, height, topInset = 0) => {
    setSubHeaderHeights(prev => {
      const current = prev[id];
      const heightDelta = Math.abs((current?.height ?? 0) - height);
      const insetDelta = Math.abs((current?.topInset ?? 0) - topInset);
      if (heightDelta < 0.5 && insetDelta < 0.5) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          height,
          topInset
        }
      };
    });
  }, []);
  const scrollValues = useSharedValue({
    [DEFAULT_SCROLL_ID]: getInitialScrollValue()
  });
  useAnimatedReaction(() => activeScrollId?.get(), id => {
    if (!id || scrollValues.get()[id]) {
      return;
    }
    scrollValues.modify(value => {
      value[id] = getInitialScrollValue();
      return value;
    });
  });
  const progress = useDerivedValue(() => {
    const values = scrollValues.get();
    const id = resolveScrollIdForProgress(values, activeScrollId?.get());
    const scrollValue = values[id];
    const threshold = progressThresholdValue.get();
    if (!scrollValue) {
      return 0;
    }
    const {
      min,
      current
    } = scrollValue;
    return interpolate(current, [min, min + threshold], [0, 1], progressExtrapolation);
  });
  const scrollToRef = useRef(null);
  // FUTURE: SharedValue-based scrollTo was removed for now because function updates
  // were not propagating reliably, while it works for refs. Revisit later.
  // We need to be updating the scrollTo on active scroll ID changes and doing it via state would cause re-renders.
  // It's a bit of an anti-pattern to use refs for this as well, but I am yet to figure out a better way to pass those if SV won't work.
  const ctxValue = useMemo(() => ({
    progress,
    originalHeaderHeight,
    measureDynamic: setOrUpdateDynamicMeasurement,
    measureTotalHeight,
    headerPanMomentumOffset,
    progressThreshold: progressThresholdValue,
    scrollValues,
    scrollToRef,
    activeScrollId: activeScrollId,
    subHeaderHeights,
    setSubHeaderHeight
  }), [originalHeaderHeight, progress, measureTotalHeight, headerPanMomentumOffset, setOrUpdateDynamicMeasurement, scrollValues, activeScrollId, progressThresholdValue, subHeaderHeights, setSubHeaderHeight]);
  return /*#__PURE__*/_jsx(HeaderMotionContext.Provider, {
    value: ctxValue,
    children: children
  });
}
export { HeaderMotionContextProvider };
//# sourceMappingURL=HeaderMotion.js.map