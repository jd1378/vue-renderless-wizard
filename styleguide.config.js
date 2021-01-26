const fs = require('fs');
const path = require('path');

module.exports = {
  title: 'vue-renderless-wizard',
  components: '-----',
  defaultExample: true,
  usageMode: 'collapse',
  exampleMode: 'expand',
  ribbon: {
    url: 'https://github.com/jd1378/vue-renderless-wizard',
    text: 'Fork me on GitHub',
  },
  styles: {
    TabButton: {
      button: {
        border: '1px solid rgb(183 183 183)',
        padding: '5px 10px',
        boxShadow: '0px 0px 2px 0px rgba(35, 35, 35, 0.3)',
      },
    },
  },
  sections: [
    {
      name: 'Getting Started',
      sections: [
        {
          name: 'Install',
          content: 'guide/getting-started/Install.md',
        },
        {
          name: 'Usage',
          content: 'guide/getting-started/Usage.md',
        },
        {
          name: 'Note',
          content: 'guide/getting-started/Note.md',
        },
      ],
    },
    {
      name: 'Example1',
      content: 'guide/Example1/ReadMe.md',
      exampleMode: 'expand',
      simpleEditor: false,
    },
    {
      name: 'Reference',
      components: 'src/wizard-*.vue',
      exampleMode: 'hide',
    },
    {
      name: 'Credits',
      content: 'guide/Credits.md',
    },
  ],
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props;
    if (settings && typeof settings.file === 'string') {
      const filepath = path.resolve(
        path.dirname(exampleFilePath),
        settings.file
      );
      delete settings.file;
      const content = fs.readFileSync(filepath, 'utf-8');
      return {
        content,
        settings,
        lang,
      };
    }
    return props;
  },
  styleguideDir: 'docs',
  require: [path.resolve(__dirname, 'guide/setup.js')],
};
