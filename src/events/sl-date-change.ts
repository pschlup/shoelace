export type SlDateChangeEvent = CustomEvent<{ date: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'sl-date-change': SlDateChangeEvent;
  }
}
