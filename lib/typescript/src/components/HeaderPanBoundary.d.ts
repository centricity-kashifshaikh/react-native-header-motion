import { type ReactElement } from 'react';
import type { HeaderPanDecayConfig, HeaderMotionBridgeValue } from '../types';
type HeaderPanBoundaryProps = Pick<HeaderMotionBridgeValue, 'scrollToRef' | 'headerPanMomentumOffset'> & {
    children: ReactElement;
    pannable?: boolean;
    panDecayConfig?: HeaderPanDecayConfig;
    withGestureHandlerRootView?: boolean;
};
export declare function HeaderPanBoundary({ children, pannable, panDecayConfig, scrollToRef, headerPanMomentumOffset, withGestureHandlerRootView, }: HeaderPanBoundaryProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HeaderPanBoundary.d.ts.map