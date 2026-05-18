import { type AnimatedScrollViewProps, type ScrollHandler, type ScrollHandlerProcessed } from 'react-native-reanimated';
import type { ScrollHandlerContext } from '../types';
type AnimatedScrollViewOnScroll = AnimatedScrollViewProps['onScroll'];
type ScrollEvent = Parameters<ScrollHandler<Record<string, unknown>>>[0];
export type ConsumerScrollEventHandlers = Pick<AnimatedScrollViewProps, 'onScroll' | 'onScrollBeginDrag' | 'onScrollEndDrag' | 'onMomentumScrollBegin' | 'onMomentumScrollEnd'>;
export interface ConsumerScrollBridges {
    onScroll?: (event: ScrollEvent) => void;
    onBeginDrag?: (event: ScrollEvent) => void;
    onEndDrag?: (event: ScrollEvent) => void;
    onMomentumBegin?: (event: ScrollEvent) => void;
    onMomentumEnd?: (event: ScrollEvent) => void;
}
export declare function useConsumerScrollHandlers({ onScroll, onScrollBeginDrag, onScrollEndDrag, onMomentumScrollBegin, onMomentumScrollEnd, }: ConsumerScrollEventHandlers): ConsumerScrollBridges;
export declare function useScrollHandlerComposition(ownScrollHandler: ScrollHandlerProcessed<ScrollHandlerContext>, consumerScrollHandler: AnimatedScrollViewOnScroll | undefined): (event: Readonly<{
    bubbles: boolean | undefined;
    cancelable: boolean | undefined;
    currentTarget: number | import("react-native").HostInstance;
    defaultPrevented: boolean | undefined;
    dispatchConfig: Readonly<{
        registrationName: string;
    }>;
    eventPhase: number | undefined;
    preventDefault: () => void;
    isDefaultPrevented: () => boolean;
    stopPropagation: () => void;
    isPropagationStopped: () => boolean;
    isTrusted: boolean | undefined;
    nativeEvent: Readonly<{
        contentInset: Readonly<{
            bottom: number;
            left: number;
            right: number;
            top: number;
        }>;
        contentOffset: Readonly<{
            y: number;
            x: number;
        }>;
        contentSize: Readonly<{
            height: number;
            width: number;
        }>;
        layoutMeasurement: Readonly<{
            height: number;
            width: number;
        }>;
        velocity?: Readonly<{
            y: number;
            x: number;
        }>;
        zoomScale?: number;
        responderIgnoreScroll?: boolean;
        targetContentOffset?: Readonly<{
            y: number;
            x: number;
        }>;
    }>;
    persist: () => void;
    target: (number | undefined) | import("react-native").HostInstance;
    timeStamp: number;
    type: string | undefined;
}>, context?: ScrollHandlerContext | undefined) => void;
export {};
//# sourceMappingURL=useConsumerScrollHandlers.d.ts.map