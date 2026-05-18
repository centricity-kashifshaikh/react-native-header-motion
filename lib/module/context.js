"use strict";

import { createContext, useContext } from 'react';
export const HeaderMotionContext = /*#__PURE__*/createContext(null);
export function useHeaderMotionContextOrThrow(errorMessage) {
  const ctxValue = useContext(HeaderMotionContext);
  if (!ctxValue) {
    throw new Error(errorMessage);
  }
  return ctxValue;
}
//# sourceMappingURL=context.js.map