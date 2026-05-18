"use strict";

import { forwardRef, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useScrollManager } from "../hooks/index.js";
import { resolveHeaderOffsetStyle } from "../utils/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function createHeaderMotionScrollable(ScrollableComponent, options) {
  const {
    isComponentAnimated = false,
    contentContainerMode = 'renderScrollComponent',
    managedRefTarget = 'outer',
    displayName = `HeaderMotion(${getDisplayName(ScrollableComponent)})`
  } = options || {};
  const AnimatedScrollable = isComponentAnimated ? ScrollableComponent : Animated.createAnimatedComponent(ScrollableComponent);
  function HeaderMotionScrollable(props) {
    const {
      scrollId,
      animatedRef,
      headerOffsetStrategy,
      ensureScrollableContentMinHeight = false,
      contentContainerStyle,
      refreshControl,
      refreshing,
      onRefresh,
      progressViewOffset,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      ...rest
    } = props;
    const {
      scrollableProps,
      headerMotionContext
    } = useScrollManager(scrollId, {
      refreshControl: refreshControl ?? undefined,
      refreshing: refreshing ?? undefined,
      onRefresh: onRefresh ?? undefined,
      progressViewOffset,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      animatedRef: managedRefTarget === 'inner' ? undefined : animatedRef,
      ensureScrollableContentMinHeight
    });
    const {
      onScroll: managedOnScroll,
      onLayout: managedOnLayout,
      refreshControl: managedRefreshControl,
      ref,
      ...scrollViewProps
    } = scrollableProps;
    const {
      originalHeaderHeight,
      contentContainerMinHeight,
      subHeaderHeight
    } = headerMotionContext;
    const userOnLayoutRef = useRef(rest.onLayout);
    useLayoutEffect(() => {
      userOnLayoutRef.current = rest.onLayout;
    });
    const managedContentContainerStyle = useMemo(() => [ensureScrollableContentMinHeight && contentContainerMinHeight !== undefined ? {
      minHeight: contentContainerMinHeight
    } : undefined, resolveHeaderAndSubHeaderOffsetStyle(originalHeaderHeight, headerOffsetStrategy, subHeaderHeight ?? 0), contentContainerStyle], [contentContainerStyle, contentContainerMinHeight, ensureScrollableContentMinHeight, headerOffsetStrategy, originalHeaderHeight, subHeaderHeight]);
    const refreshControlProps = managedRefreshControl && {
      refreshControl: managedRefreshControl
    };
    const handleLayout = useCallback(e => {
      managedOnLayout?.(e);
      userOnLayoutRef.current?.(e);
    }, [managedOnLayout]);
    const contentContainerProps = useContentContainerProps({
      children: rest.children,
      mode: contentContainerMode,
      style: managedContentContainerStyle,
      scrollRef: managedRefTarget === 'inner' ? ref : undefined
    });
    return /*#__PURE__*/_jsx(AnimatedScrollable, {
      ...scrollViewProps,
      ...rest,
      ...refreshControlProps,
      ...contentContainerProps,
      ref: managedRefTarget === 'inner' ? animatedRef : ref,
      onLayout: handleLayout,
      onScroll: managedOnScroll
    });
  }
  const TypedHeaderMotionScrollable = HeaderMotionScrollable;
  TypedHeaderMotionScrollable.displayName = displayName;
  return TypedHeaderMotionScrollable;
}
function resolveHeaderAndSubHeaderOffsetStyle(originalHeaderHeight, headerOffsetStrategy, subHeaderHeight) {
  const totalOffset = originalHeaderHeight + subHeaderHeight;
  const base = resolveHeaderOffsetStyle(originalHeaderHeight, headerOffsetStrategy);
  if (!base) {
    return undefined;
  }
  if ('paddingTop' in base) {
    return {
      paddingTop: totalOffset
    };
  }
  if ('marginTop' in base) {
    return {
      marginTop: totalOffset
    };
  }
  if ('top' in base) {
    return {
      top: totalOffset,
      paddingBottom: totalOffset
    };
  }
  return {
    transform: [{
      translateY: totalOffset
    }],
    paddingBottom: totalOffset
  };
}
function useContentContainerProps({
  children: rawChildren,
  mode,
  style,
  scrollRef
}) {
  const renderScrollComponent = useCallback(props => {
    const {
      ref: outerScrollRef,
      ...scrollProps
    } = props;
    return /*#__PURE__*/_jsx(AnimatedScrollContainer, {
      ...scrollProps,
      ref: mergeRefs(outerScrollRef, scrollRef),
      contentContainerStyle: style
    });
  }, [scrollRef, style]);
  const children = /*#__PURE__*/_jsx(Animated.View, {
    style: style,
    children: rawChildren
  });
  if (mode === 'children') {
    return {
      children
    };
  }
  return {
    renderScrollComponent
  };
}
const AnimatedScrollContainer = /*#__PURE__*/forwardRef(({
  children,
  contentContainerStyle,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsx(Animated.ScrollView, {
    ...rest,
    ref: ref,
    children: /*#__PURE__*/_jsx(Animated.View, {
      style: contentContainerStyle,
      children: children
    })
  });
});
function getDisplayName(ScrollableComponent) {
  return ScrollableComponent.displayName ?? ScrollableComponent.name ?? 'Scrollable';
}
function mergeRefs(...refs) {
  return value => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(value);
        return;
      }
      ref.current = value;
    });
  };
}

// TODO: From here below Codex did some absolute TypeScript magic but it seems to work
// Having limited time, I can't spend more on adjusting this to make it less convoluted
// But what matters is that it seems that for the user the types work very well
//# sourceMappingURL=createHeaderMotionScrollable.js.map