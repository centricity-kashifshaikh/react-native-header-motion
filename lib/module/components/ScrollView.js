"use strict";

import Animated from 'react-native-reanimated';
import { createHeaderMotionScrollable } from "./createHeaderMotionScrollable.js";
/**
 * Animated ScrollView component that integrates with HeaderMotion.
 * Automatically handles scroll tracking and header animation synchronization.
 * Must be used within a HeaderMotion component.
 *
 * @example
 * ```tsx
 * <HeaderMotion>
 *   <HeaderMotion.ScrollView>
 *     <MyScrollableContent />
 *   </HeaderMotion.ScrollView>
 * </HeaderMotion>
 * ```
 */
export const ScrollView = createHeaderMotionScrollable(Animated.ScrollView, {
  displayName: 'HeaderMotion.ScrollView',
  contentContainerMode: 'children',
  isComponentAnimated: true
});
//# sourceMappingURL=ScrollView.js.map