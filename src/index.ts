import type { App, Plugin } from 'vue';
import * as components from './components';

// Import CSS Design Tokens
import './tokens/index.css';

// Re-export Atomic Design Components & Types
export * from './components';

// Vue Plugin installer for app.use(CrmlUI)
export const CrmlUI: Plugin = {
  install(app: App) {
    const allComponents = [
      ...Object.entries(components.Atoms),
      ...Object.entries(components.Molecules),
      ...Object.entries(components.Organisms),
    ];

    allComponents.forEach(([name, component]) => {
      if (name.startsWith('Crml') && component) {
        app.component(name, component as any);
      }
    });
  },
};

export default CrmlUI;
