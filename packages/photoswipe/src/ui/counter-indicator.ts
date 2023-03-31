/** @type {import('@/ui/ui-element').UIElementData} UIElementData */
import { UIElementData } from '@/ui/ui-element';

export const counterIndicator: UIElementData = {
  name: 'counter',
  order: 5,
  onInit: (counterElement, pswp) => {
    pswp.on('change', () => {
      counterElement.innerText = pswp.currIndex + 1 + pswp.options.indexIndicatorSep + pswp.getNumItems();
    });
  },
};
