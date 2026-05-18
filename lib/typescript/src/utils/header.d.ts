import { type ReactElement } from 'react';
import type { ViewProps } from 'react-native';
export type SlottableElementProps = {
    onLayout?: ViewProps['onLayout'];
};
export type SlottableElement = ReactElement<SlottableElementProps>;
export declare function composeOnLayoutHandlers(userHandler: ViewProps['onLayout'], internalHandler: ViewProps['onLayout']): (e: Parameters<NonNullable<ViewProps["onLayout"]>>[0]) => void;
export declare function resolveSlottableChild(componentName: string, child: ReactElement): SlottableElement;
export declare function cloneWithOnLayout(child: SlottableElement, onLayout: ViewProps['onLayout'], componentName: string): ReactElement<SlottableElementProps, string | import("react").JSXElementConstructor<any>>;
//# sourceMappingURL=header.d.ts.map