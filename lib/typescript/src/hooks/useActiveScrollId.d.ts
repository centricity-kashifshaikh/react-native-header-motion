import type { ActiveScrollIdValues, SetActiveScrollId } from '../types';
/**
 * Keeps a React state value and a shared value in sync for the currently active
 * scrollable.
 *
 * Use this when one header is shared across multiple scroll views, for example
 * pager pages or tabs. Pass `values.sv` to `HeaderMotion` and use the setter
 * whenever the active page changes.
 *
 * @template T - The type of the scroll ID string
 * @param initialActiveScrollId - The initial active scroll ID
 * @returns A tuple containing:
 * - an object with both the React `state` and shared-value `sv`
 * - a setter that updates both in lockstep
 *
 * @example
 * ```tsx
 * function TabbedScrollView() {
 *   const [activeScroll, setActiveScroll] = useActiveScrollId('tab1');
 *
 *   return (
 *     <HeaderMotion activeScrollId={activeScroll.sv}>
 *       <Tabs onTabChange={setActiveScroll}>
 *         <Tab id="tab1" />
 *         <Tab id="tab2" />
 *       </Tabs>
 *     </HeaderMotion>
 *   );
 * }
 * ```
 */
export declare function useActiveScrollId<T extends string>(initialActiveScrollId: T): [ActiveScrollIdValues<T>, SetActiveScrollId<T>];
//# sourceMappingURL=useActiveScrollId.d.ts.map