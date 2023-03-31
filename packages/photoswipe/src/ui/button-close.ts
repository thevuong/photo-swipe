/** @type {import('@/ui/ui-element').UIElementData} UIElementData */
import { UIElementData } from '@/ui/ui-element';

const closeButton: UIElementData = {
  name: 'close',
  title: 'Close',
  order: 20,
  isButton: true,
  html: {
    isCustomSVG: true,
    inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
    outlineID: 'pswp__icn-close',
  },
  onClick: 'close',
};

export default closeButton;
