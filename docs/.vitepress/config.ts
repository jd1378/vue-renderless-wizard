import { defineConfig } from 'vitepress'
import * as path from "path";
import { globbySync } from "globby";
import { fileURLToPath } from 'url';
import vueLiveMd from './vue-live-md-it.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get all the components generated by vue-docgen-cli
const sidebarComponents = globbySync('components/**/*.md', { cwd: path.resolve(__dirname, '../src')})

export default defineConfig({
  // site-level options
  title: 'vue-renderless-wizard',
  description: 'a renderless wizard/stepper component for vue',
  base: '/docs/',
  themeConfig: {
    sidebar: [
      {  
        text: 'Getting Started',
        link: '/getting-started',
      },
      {  
        text: 'Example',
        link: '/Example1/',
      },
      {
        text: 'Components',
        items: sidebarComponents.map(comp => {
          return {
            text: comp.replace(/^components\//, '').replace(/\.md$/, ''),
            link: '/src/' + comp.replace(/\.md$/, '')
          }
        })
      },
      {  
        text: 'Credits',
        link: '/credits',
      },
    ]
  },
  markdown: {
    config(md){
      md.use(vueLiveMd)
    }
  }
});
