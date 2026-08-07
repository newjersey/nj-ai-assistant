import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { configSchema } from 'librechat-data-provider';
import { ENV_TARGETS, LIBRECHAT_YAML_TEMPLATE, PARENT_DIR, renderLibreChatYaml } from '../render';

describe('LibreChat config parsing', () => {
  it.each(Object.entries(ENV_TARGETS))(
    "%s's rendered config is a valid LibreChat Zod config schema",
    (_env, target) => {
      const renderedFileContents = renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, target.envFile);
      const jsObject = yaml.load(renderedFileContents);
      expect(() => configSchema.strict().parse(jsObject)).not.toThrow();
    },
  );

  it("kitchensink's hard-coded config is a valid LibreChat Zod config schema", () => {
    const kitchenSinkYaml = path.resolve(PARENT_DIR, 'librechat.kitchensink.yaml');
    const jsObject = yaml.load(fs.readFileSync(kitchenSinkYaml, 'utf8'));
    expect(() => configSchema.strict().parse(jsObject)).not.toThrow();
  });
});
