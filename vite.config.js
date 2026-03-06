import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        tokens: resolve(__dirname, 'tokens.preview.html'),
        accordion: resolve(__dirname, 'Accordion.preview.html'),
        button: resolve(__dirname, 'Button.preview.html'),
        checkbox: resolve(__dirname, 'Checkbox.preview.html'),
        textfield: resolve(__dirname, 'TextField.preview.html'),
        toast: resolve(__dirname, 'Toast.preview.html'),
        toggle: resolve(__dirname, 'Toggle.preview.html'),
      },
    },
  },
});
