import type { SharedValue } from 'react-native-reanimated';
import type { ScrollValue, ScrollValues } from '../types';
export declare function getInitialScrollValue(): ScrollValue;
export declare function ensureScrollValueRegistered(scrollValues: SharedValue<ScrollValues>, id: string): ScrollValues;
export declare function warnIfMissingActiveScrollId(scrollValues: ScrollValues, id: string, activeScrollId: string | undefined): void;
//# sourceMappingURL=values.d.ts.map