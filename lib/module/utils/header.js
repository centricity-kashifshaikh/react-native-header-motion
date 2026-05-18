"use strict";

import { Fragment, cloneElement, isValidElement } from 'react';
export function composeOnLayoutHandlers(userHandler, internalHandler) {
  return e => {
    internalHandler?.(e);
    userHandler?.(e);
  };
}
export function resolveSlottableChild(componentName, child) {
  if (! /*#__PURE__*/isValidElement(child) || child.type === Fragment) {
    throw new Error(`${componentName} with \`asChild\` expects a single valid React element child that accepts \`onLayout\`.`);
  }
  return child;
}
export function cloneWithOnLayout(child, onLayout, componentName) {
  if (! /*#__PURE__*/isValidElement(child)) {
    throw new Error(`${componentName} with \`asChild\` expects a valid React element child.`);
  }
  return /*#__PURE__*/cloneElement(child, {
    onLayout: composeOnLayoutHandlers(child.props.onLayout, onLayout)
  });
}
//# sourceMappingURL=header.js.map