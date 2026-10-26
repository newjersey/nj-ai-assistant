import yaml from 'js-yaml';
import { ENV_TARGETS, LIBRECHAT_YAML_TEMPLATE, renderLibreChatYaml } from '../render';

interface RenderedModelSpec {
  name: string;
  default?: boolean;
  showInMenu?: boolean;
  preset: { model: string };
}

interface RenderedConfig {
  modelSpecs: { list: RenderedModelSpec[] };
}

const SONNET_5_5 = { name: 'Claude Sonnet 5.5', model: 'us.anthropic.claude-sonnet-5-5' };

describe('prod model specs', () => {
  const prodConfigYaml = renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, ENV_TARGETS.prod.envFile);
  const prodModelSpecs = (yaml.load(prodConfigYaml) as RenderedConfig).modelSpecs.list;
  const getNameAndModel = (specs: RenderedModelSpec[]) =>
    specs.map((spec) => ({ name: spec.name, model: spec.preset.model }));

  it('only shows Sonnet 5.5 in the model menu', () => {
    expect(getNameAndModel(prodModelSpecs.filter((spec) => spec.showInMenu !== false))).toEqual([
      SONNET_5_5,
    ]);
  });

  it('defaults new conversations to Sonnet 5.5', () => {
    expect(getNameAndModel(prodModelSpecs.filter((spec) => spec.default))).toEqual([SONNET_5_5]);
  });
});
