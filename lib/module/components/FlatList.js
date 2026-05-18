"use strict";

import Animated from 'react-native-reanimated';
import { createHeaderMotionScrollable } from "./createHeaderMotionScrollable.js";
/**
 * Animated FlatList component that integrates with HeaderMotion.
 * Automatically handles scroll tracking and header animation synchronization.
 * Must be used within a HeaderMotion component.
 *
 * @template T - The type of items in the FlatList
 *
 * @example
 * ```tsx
 * <HeaderMotion>
 *   <HeaderMotion.FlatList
 *     data={items}
 *     renderItem={({ item }) => <Text>{item}</Text>}
 *   />
 * </HeaderMotion>
 * ```
 */
export const FlatList = createHeaderMotionScrollable(Animated.FlatList, {
  displayName: 'HeaderMotion.FlatList',
  contentContainerMode: 'renderScrollComponent',
  isComponentAnimated: true
});
//# sourceMappingURL=FlatList.js.map