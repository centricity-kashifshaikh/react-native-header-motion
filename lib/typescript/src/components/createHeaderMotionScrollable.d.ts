import { type ReactElement, type Ref } from 'react';
import { type AnimatedProps, type AnimatedRef } from 'react-native-reanimated';
import type { InstanceOrElement } from 'react-native-reanimated/lib/typescript/commonTypes';
import type { HeaderMotionOffsetProps } from '../types';
export type HeaderMotionScrollableOwnProps<TRef extends InstanceOrElement = any> = HeaderMotionOffsetProps & {
    /**
     * Unique identifier for this scrollable when one header is shared across
     * multiple scrollables.
     */
    scrollId?: string;
    /**
     * Animated ref to reuse instead of letting HeaderMotion create one.
     */
    animatedRef?: AnimatedRef<TRef> | AnimatedRef;
};
type CreateHeaderMotionScrollableCommonOptions<TIsComponentAnimated extends boolean = boolean> = {
    displayName?: string;
    /**
     * If true, this function will NOT call Animated.createAnimatedComponent internally.
     * Useful when you are creating a HeaderMotionScrollable from lists that already export their
     * own (Re)animated components (e.g. LegendList).
     *
     * @default false
     */
    isComponentAnimated?: TIsComponentAnimated;
    /**
     * Controls how HeaderMotion injects content-container spacing.
     *
     * - `children`: wraps `children` in an inner `Animated.View`
     * - `renderScrollComponent`: injects a custom scroll component that wraps the content
     *
     * Use `children` for ScrollView-like components. Use
     * `renderScrollComponent` for FlatList-like components that own their
     * internal scroll container.
     *
     * @default 'renderScrollComponent'
     */
    contentContainerMode?: ContentContainerMode;
};
type CreateHeaderMotionScrollableChildrenOptions<TIsComponentAnimated extends boolean = boolean> = CreateHeaderMotionScrollableCommonOptions<TIsComponentAnimated> & {
    contentContainerMode: 'children';
    managedRefTarget?: never;
};
type CreateHeaderMotionScrollableRenderOptions<TIsComponentAnimated extends boolean = boolean> = CreateHeaderMotionScrollableCommonOptions<TIsComponentAnimated> & {
    contentContainerMode?: 'renderScrollComponent';
    /**
     * Controls which ref HeaderMotion uses for imperative scroll synchronization.
     *
     * - `outer`: attach the managed ref to the wrapped scrollable component itself
     * - `inner`: attach the managed ref to the injected inner scroll component
     *
     * Use `inner` for list abstractions like FlashList or LegendList whose outer
     * ref is not the actual native scroll view that Reanimated `scrollTo()`
     * should target.
     *
     * @default 'outer'
     */
    managedRefTarget?: ManagedRefTarget;
};
export type CreateHeaderMotionScrollableOptions<TIsComponentAnimated extends boolean = boolean> = CreateHeaderMotionScrollableChildrenOptions<TIsComponentAnimated> | CreateHeaderMotionScrollableRenderOptions<TIsComponentAnimated>;
export declare function createHeaderMotionScrollable<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean = false>(ScrollableComponent: TScrollableComponent, options?: CreateHeaderMotionScrollableOptions<TIsComponentAnimated>): HeaderMotionScrollableComponent<TScrollableComponent, TIsComponentAnimated>;
type ManagedRefTarget = 'outer' | 'inner';
type ContentContainerMode = 'children' | 'renderScrollComponent';
type ScrollableComponent = ((props: any) => ReactElement | null) | (new (...args: any[]) => any);
declare const noListItemSymbol: unique symbol;
type NoListItem = {
    readonly [noListItemSymbol]: true;
};
type ScrollableComponentProps<TScrollableComponent> = TScrollableComponent extends new (props: infer TProps, ...args: any[]) => any ? TProps : TScrollableComponent extends (props: infer TProps, ...args: any[]) => any ? TProps : never;
type IsUnknown<TValue> = unknown extends TValue ? [keyof TValue] extends [never] ? true : false : false;
type ReplaceUnknownDeep<TValue, TReplacement> = IsUnknown<TValue> extends true ? TReplacement : TValue extends (...args: infer TArgs) => infer TResult ? (...args: {
    [TIndex in keyof TArgs]: ReplaceUnknownDeep<TArgs[TIndex], TReplacement>;
}) => TResult : TValue extends readonly (infer TItem)[] ? readonly ReplaceUnknownDeep<TItem, TReplacement>[] : TValue extends object ? {
    [TKey in keyof TValue]: ReplaceUnknownDeep<TValue[TKey], TReplacement>;
} : TValue;
type MaybeAnimatedProps<TProps extends object, TIsComponentAnimated> = TIsComponentAnimated extends true ? TProps : AnimatedProps<TProps>;
type ResolveListItemProps<TProps extends object, TListItem> = [
    TListItem
] extends [NoListItem] ? TProps : ReplaceUnknownDeep<TProps, TListItem>;
type ExtractDataProp<TProps> = TProps extends {
    data?: infer TData;
} ? TData : TProps extends {
    data: infer TData;
} ? TData : never;
type ExtractListItemFromData<TData> = TData extends ReadonlyArray<infer TItem> | null | undefined ? TItem : TData extends ArrayLike<infer TItem> | null | undefined ? TItem : never;
type HasGenericDataProp<TProps> = IsUnknown<ExtractListItemFromData<ExtractDataProp<TProps>>>;
type ExtractRefTargetFromRef<TRef> = TRef extends Ref<infer TInstance> ? TInstance : TRef extends AnimatedRef<infer TInstance> ? TInstance : never;
type ExtractRefTargetFromProps<TProps> = TProps extends {
    ref?: infer TRef;
} ? ExtractRefTargetFromRef<TRef> : TProps extends {
    ref: infer TRef;
} ? ExtractRefTargetFromRef<TRef> : never;
type ResolveScrollableRefTarget<TScrollableComponent, TProps> = [
    ExtractRefTargetFromProps<TProps>
] extends [never] ? TScrollableComponent extends new (...args: any[]) => infer TInstance ? TInstance extends InstanceOrElement ? TInstance : any : any : ExtractRefTargetFromProps<TProps> extends InstanceOrElement ? ExtractRefTargetFromProps<TProps> : any;
type HeaderMotionScrollableBaseProps<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean, TListItem = NoListItem> = ResolveListItemProps<MaybeAnimatedProps<ScrollableComponentProps<TScrollableComponent>, TIsComponentAnimated>, TListItem>;
type HeaderMotionScrollablePublicProps<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean, TListItem = NoListItem> = HeaderMotionScrollableBaseProps<TScrollableComponent, TIsComponentAnimated, TListItem> & HeaderMotionScrollableOwnProps<ResolveScrollableRefTarget<TScrollableComponent, HeaderMotionScrollableBaseProps<TScrollableComponent, TIsComponentAnimated, TListItem>>>;
type HeaderMotionGenericScrollableComponent<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean> = {
    <TListItem = any>(props: HeaderMotionScrollablePublicProps<TScrollableComponent, TIsComponentAnimated, TListItem>): ReactElement | null;
    displayName?: string;
};
type HeaderMotionStaticScrollableComponent<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean> = {
    (props: HeaderMotionScrollablePublicProps<TScrollableComponent, TIsComponentAnimated>): ReactElement | null;
    displayName?: string;
};
type HeaderMotionScrollableComponent<TScrollableComponent extends ScrollableComponent, TIsComponentAnimated extends boolean> = HasGenericDataProp<ScrollableComponentProps<TScrollableComponent>> extends true ? HeaderMotionGenericScrollableComponent<TScrollableComponent, TIsComponentAnimated> : HeaderMotionStaticScrollableComponent<TScrollableComponent, TIsComponentAnimated>;
export {};
//# sourceMappingURL=createHeaderMotionScrollable.d.ts.map