"use strict";

import { useScrollManager } from "../hooks/index.js";
/**
 * Render-prop wrapper around `useScrollManager()`.
 *
 * **Most code should prefer `createHeaderMotionScrollable()` instead.**
 *
 * Use `ScrollManager` only when the factory approach is not enough and you
 * still need HeaderMotion to manage a custom scrollable through render-prop
 * composition.
 *
 * @example
 * ```tsx
 * <HeaderMotion>
 *   <HeaderMotion.ScrollManager>
 *     {(scrollableProps, { originalHeaderHeight }) => (
 *       <CustomScrollView {...scrollableProps}>
 *         <View style={{ paddingTop: originalHeaderHeight }}>
 *           <Text>Content</Text>
 *         </View>
 *       </CustomScrollView>
 *     )}
 *   </HeaderMotion.ScrollManager>
 * </HeaderMotion>
 * ```
 */
export function ScrollManager({
  children,
  scrollId,
  animatedRef,
  refreshControl,
  refreshing,
  onRefresh,
  progressViewOffset,
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd
}) {
  if (typeof children !== 'function') {
    throw new Error('HeaderMotion.ScrollManager only accepts render function as the only child.');
  }
  const {
    scrollableProps,
    headerMotionContext
  } = useScrollManager(scrollId, {
    animatedRef,
    refreshControl,
    refreshing,
    onRefresh,
    progressViewOffset,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd
  });
  return children(scrollableProps, headerMotionContext);
}
//# sourceMappingURL=ScrollManager.js.map