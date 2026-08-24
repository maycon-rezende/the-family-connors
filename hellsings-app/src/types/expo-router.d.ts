declare module 'expo-router' {
  import type { ComponentType } from 'react';
  export const Stack: ComponentType<any>;
  export const router: {
    replace(path: string): void;
    push(path: string): void;
    back(): void;
  };
}
