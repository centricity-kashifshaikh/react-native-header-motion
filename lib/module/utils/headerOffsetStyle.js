"use strict";

import { DEFAULT_HEADER_OFFSET_STRATEGY } from "./defaults.js";
export function resolveHeaderOffsetStyle(originalHeaderHeight, headerOffsetStrategy = DEFAULT_HEADER_OFFSET_STRATEGY) {
  switch (headerOffsetStrategy) {
    case 'none':
      return undefined;
    case 'margin':
      return {
        marginTop: originalHeaderHeight
      };
    case 'top':
      return {
        top: originalHeaderHeight,
        paddingBottom: originalHeaderHeight
      };
    case 'translate':
      return {
        transform: [{
          translateY: originalHeaderHeight
        }],
        paddingBottom: originalHeaderHeight
      };
    case 'padding':
    default:
      return {
        paddingTop: originalHeaderHeight
      };
  }
}
//# sourceMappingURL=headerOffsetStyle.js.map