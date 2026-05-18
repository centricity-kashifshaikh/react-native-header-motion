"use strict";

import { useCallback } from 'react';
import { useComposedEventHandler } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
export function useConsumerScrollHandlers({
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd
}) {
  const consumerOnScroll = typeof onScroll === 'function' ? onScroll : undefined;
  const consumerOnScrollBeginDrag = typeof onScrollBeginDrag === 'function' ? onScrollBeginDrag : undefined;
  const consumerOnScrollEndDrag = typeof onScrollEndDrag === 'function' ? onScrollEndDrag : undefined;
  const consumerOnMomentumScrollBegin = typeof onMomentumScrollBegin === 'function' ? onMomentumScrollBegin : undefined;
  const consumerOnMomentumScrollEnd = typeof onMomentumScrollEnd === 'function' ? onMomentumScrollEnd : undefined;
  const onScrollBridge = useCallback(event => {
    'worklet';

    if (!consumerOnScroll) {
      return;
    }
    scheduleOnRN(consumerOnScroll, {
      nativeEvent: event
    });
  }, [consumerOnScroll]);
  const onBeginDragBridge = useCallback(event => {
    'worklet';

    if (!consumerOnScrollBeginDrag) {
      return;
    }
    scheduleOnRN(consumerOnScrollBeginDrag, {
      nativeEvent: event
    });
  }, [consumerOnScrollBeginDrag]);
  const onEndDragBridge = useCallback(event => {
    'worklet';

    if (!consumerOnScrollEndDrag) {
      return;
    }
    scheduleOnRN(consumerOnScrollEndDrag, {
      nativeEvent: event
    });
  }, [consumerOnScrollEndDrag]);
  const onMomentumBeginBridge = useCallback(event => {
    'worklet';

    if (!consumerOnMomentumScrollBegin) {
      return;
    }
    scheduleOnRN(consumerOnMomentumScrollBegin, {
      nativeEvent: event
    });
  }, [consumerOnMomentumScrollBegin]);
  const onMomentumEndBridge = useCallback(event => {
    'worklet';

    if (!consumerOnMomentumScrollEnd) {
      return;
    }
    scheduleOnRN(consumerOnMomentumScrollEnd, {
      nativeEvent: event
    });
  }, [consumerOnMomentumScrollEnd]);
  return {
    onScroll: onScrollBridge,
    onBeginDrag: onBeginDragBridge,
    onEndDrag: onEndDragBridge,
    onMomentumBegin: onMomentumBeginBridge,
    onMomentumEnd: onMomentumEndBridge
  };
}
export function useScrollHandlerComposition(ownScrollHandler, consumerScrollHandler) {
  // TODO: I guess the typing here could be more precise
  const consumerWorkletHandler = isAnimatedScrollHandler(consumerScrollHandler) ? consumerScrollHandler : null;
  return useComposedEventHandler([ownScrollHandler, consumerWorkletHandler]);
}
function isAnimatedScrollHandler(handler) {
  // FUTURE: we could be checking just by typeof handler === 'object'?
  // This seems safer for now, unless Reanimated changes this shape. Revisit
  return !!handler && 'workletEventHandler' in handler;
}
//# sourceMappingURL=useConsumerScrollHandlers.js.map