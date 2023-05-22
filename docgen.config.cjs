/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const { defineConfig } = require('vue-docgen-cli');
const { parseMulti } = require('vue-docgen-api');
const path = require('path');
const { createComponentMetaChecker } = require('vue-component-meta');

const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
const checker = createComponentMetaChecker(tsconfigPath);

module.exports = defineConfig({
  docsRepo: 'jd1378/vue-renderless-wizard',
  docsBranch: 'main',
  docsFolder: 'guide',
  componentsRoot: './src/components/',
  components: './[a-zA-Z-]*.vue',
  outDir: './docs/',
  getDestFile: (componentPath, { outDir }) => {
    const name = componentPath.split('/').pop() || 'unknown';
    return path.join(
      outDir,
      'src/components',
      name.replace(/\.(vue|ts)$/, '.md')
    );
  },
  defaultExamples: false,
  async propsParser(componentPath, _, event) {
    if (event === 'add') {
      checker.reload();
    }
    const exportNames = checker.getExportNames(componentPath);
    const docs = await parseMulti(componentPath).catch(() => []);
    return exportNames.map((exportName) => {
      const meta = checker.getComponentMeta(componentPath, exportName);

      const docgen = docs.find((d) => d.exportName === exportName);

      const nonGlobalProps = meta.props.filter((prop) => {
        return (
          !prop.global &&
          !prop.declarations.some((d) => d.file.includes('/node_modules/')) &&
          !prop.name.includes('-')
        );
      });

      // massage the output of meta to match the docgen format
      const props = nonGlobalProps.length
        ? nonGlobalProps.map((p) => {
            return {
              ...p,
              type: renderType(p),
              tags: p.tags.reduce((acc, t) => {
                acc[t.name] = [{ title: t.name, content: t.text }];
                return acc;
              }, {}),
            };
          })
        : undefined;

      const events = meta.events.length
        ? meta.events.map((e) => {
            const event = docgen.events.find((d) => d.name === e.name) ?? {};

            const typeArray =
              e.type === 'any[]' ? [] : e.type.slice(1, -1).split(',');
            return {
              ...event,
              properties: e.schema.map((s, i) => {
                const name = typeArray[i]?.split(':')[0].trim();
                const propDef = event.properties?.find(
                  (p) => p.name === name
                ) ?? { name };

                return {
                  ...propDef,
                  ...renderEventProperty(s),
                };
              }),
            };
          })
        : undefined;

      const slots = meta.slots.length
        ? meta.slots.map((slotMeta) => {
            const props = {
              ...(docgen.slots?.find((d) => d.name === slotMeta.meta) || {}),
              ...slotMeta,
            };
            const slot = {
              ...props,
              bindings: extractBindings(slotMeta.schema, props?.bindings),
            };
            return slot;
          })
        : undefined;

      let fileBasename = 'unknown';
      if (componentPath) {
        const fileExtension = path.extname(componentPath);
        fileBasename = path.basename(componentPath, fileExtension);
        fileBasename = fileBasename.replace(/\.(ts|js|vue)/, '');
      }

      return {
        props,
        slots,
        events,
        displayName: fileBasename,
        exportName,
        tags: {},
      };
    });
  },
});

/**
 * Renders a string representation of the type of a prop
 * @param {import('vue-component-meta').PropertyMeta} p
 * @returns {{ name: string, schema?: any }}
 */
function renderType(p) {
  const nonUndefinedType = p.type.replace(' | undefined', '');

  // avoid passing the schema for primitive types
  if (['boolean', 'number', 'string'].includes(nonUndefinedType)) {
    return { name: nonUndefinedType };
  }

  return { name: nonUndefinedType, schema: p.schema };
}

/**
 *
 * @param {import('vue-component-meta').SlotMeta['schema']} schema
 * @param {import('vue-docgen-api').SlotDescriptor['bindings']} bindings
 * @returns {import('vue-docgen-api').SlotDescriptor['bindings']}
 */
function extractBindings(schema, bindings) {
  if (typeof schema === 'string') {
    return undefined;
  }

  if (schema.kind === 'object') {
    return Object.entries(schema.schema).map(([schemaKey, schemaVal]) => {
      const binding = bindings?.find((b) => b.title === schemaKey) ?? schemaVal;
      return {
        ...binding,
        type: renderType(schema.schema[schemaKey]),
        name: schemaKey,
      };
    });
  }

  return undefined;
}

/**
 * Renders a string representation of the type of a prop
 * @param {import('vue-component-meta').EventMeta['schema'][number]} p
 * @returns {import('vue-docgen-api').EventDescriptor['properties'][number] & { schema?: any }}
 */
function renderEventProperty(p) {
  if (typeof p === 'string') {
    return { type: { names: [p] }, name: p };
  }

  const serializedType = p.type;

  // avoid passing the schema for primitive types
  if (['boolean', 'number', 'string'].includes(serializedType)) {
    return { type: { names: [serializedType] }, name: serializedType };
  }

  return {
    type: { names: [serializedType] },
    name: serializedType,
    schema: {
      kind: 'object',
      type: serializedType,
      schema: p.schema,
    },
  };
}
