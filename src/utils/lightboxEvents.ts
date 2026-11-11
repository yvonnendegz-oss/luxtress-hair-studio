/**
 * Global Lightbox state synchronization helper.
 * Allows FloatingWhatsApp, Gallery, and Services to react when lightbox is opened/closed.
 */

export const LIGHTBOX_EVENT = 'luxtress:lightbox';

export function notifyLightboxChange(isOpen: boolean): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(LIGHTBOX_EVENT, { detail: { isOpen } })
    );
  }
}

export function onLightboxChange(callback: (isOpen: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ isOpen: boolean }>;
    if (custom.detail && typeof custom.detail.isOpen === 'boolean') {
      callback(custom.detail.isOpen);
    }
  };
  window.addEventListener(LIGHTBOX_EVENT, handler);
  return () => window.removeEventListener(LIGHTBOX_EVENT, handler);
}
