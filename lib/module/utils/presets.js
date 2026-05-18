"use strict";

export const ScrollablePresets = {
  FlashList: {
    displayName: 'HeaderMotionFlashList',
    isComponentAnimated: false,
    contentContainerMode: 'renderScrollComponent',
    managedRefTarget: 'inner'
  },
  AnimatedLegendList: {
    displayName: 'HeaderMotionLegendList',
    isComponentAnimated: true,
    contentContainerMode: 'renderScrollComponent',
    managedRefTarget: 'inner'
  }
};
//# sourceMappingURL=presets.js.map