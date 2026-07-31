import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { configSchema } from 'librechat-data-provider';
import { ENV_TARGETS, LIBRECHAT_YAML_TEMPLATE, PARENT_DIR, renderLibreChatYaml } from '../render';

describe('Render & Repo File drift detection', () => {
  it.each(Object.entries(ENV_TARGETS))(
    "librechat.%s.yaml doesn't match: make sure you run: `npm run nj-render-configs`!",
    (_env, target) => {
      const repoFileContents = fs.readFileSync(
        path.resolve(PARENT_DIR, target.outputFilename),
        'utf8',
      );
      const renderedFileContents = renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, target.envFile);
      expect(renderedFileContents).toEqual(repoFileContents);
    },
  );
});

describe('LibreChat config parsing', () => {
  it.each(Object.entries(ENV_TARGETS))(
    "%s's rendered config is a valid LibreChat Zod config schema",
    (_env, target) => {
      const renderedFileContents = renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, target.envFile);
      const jsObject = yaml.load(renderedFileContents);
      expect(() => configSchema.strict().parse(jsObject)).not.toThrow();
    },
  );
});
