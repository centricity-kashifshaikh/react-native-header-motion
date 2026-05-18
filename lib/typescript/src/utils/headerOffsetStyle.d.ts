import type { SharedValue } from 'react-native-reanimated';
import type { HeaderMotionOffsetStrategy } from '../types';
type HeaderOffsetValue = number | SharedValue<number>;
type HeaderOffsetStyle = undefined | {
    paddingTop: HeaderOffsetValue;
} | {
    marginTop: HeaderOffsetValue;
} | {
    top: HeaderOffsetValue;
    paddingBottom: HeaderOffsetValue;
} | {
    transform: [{
        translateY: HeaderOffsetValue;
    }];
    paddingBottom: HeaderOffsetValue;
};
export declare function resolveHeaderOffsetStyle(originalHeaderHeight: HeaderOffsetValue, headerOffsetStrategy?: HeaderMotionOffsetStrategy): HeaderOffsetStyle;
export {};
//# sourceMappingURL=headerOffsetStyle.d.ts.map