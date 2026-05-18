"use strict";

import { createHeaderMotionScrollable, Bridge, HeaderMotionContextProvider, FlatList, Header, NavigationBridge, ScrollManager, ScrollView, SubHeader } from "./components/index.js";
/**
 * Main HeaderMotion component.
 * Root provider and compound entrypoint for the library.
 *
 * It tracks header measurements, derives the shared `progress` value, and
 * exposes the pre-wired subcomponents used to connect headers and scrollables.
 *
 * @example
 * ```tsx
 * <HeaderMotion>
 *   <HeaderMotion.Bridge>
 *     {(value) => (
 *       <Stack.Screen
 *         options={{
 *           header: () => (
 *             <HeaderMotion.NavigationBridge value={value}>
 *               <MyAnimatedHeader />
 *             </HeaderMotion.NavigationBridge>
 *           ),
 *         }}
 *       />
 *     )}
 *   </HeaderMotion.Bridge>
 *   <HeaderMotion.ScrollView>
 *     <MyScrollableContent />
 *   </HeaderMotion.ScrollView>
 * </HeaderMotion>
 * ```
 */
const HeaderMotion = Object.assign(HeaderMotionContextProvider, {
  Header,
  Bridge,
  NavigationBridge,
  ScrollManager,
  ScrollView,
  FlatList,
  SubHeader
});
export default HeaderMotion;
export * from "./hooks/index.js";
export { ScrollablePresets } from "./utils/presets.js";
export { createHeaderMotionScrollable };
export { Bridge, Header, NavigationBridge };
//# sourceMappingURL=index.js.map