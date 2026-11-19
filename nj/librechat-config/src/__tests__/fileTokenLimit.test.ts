import yaml from 'js-yaml';
import { mergeFileConfig } from 'librechat-data-provider';
import { ENV_TARGETS, LIBRECHAT_YAML_TEMPLATE, renderLibreChatYaml } from '../render';

interface RenderedConfig {
  fileConfig?: Parameters<typeof mergeFileConfig>[0];
}

const NJ_FILE_TOKEN_LIMIT = 175_000;

describe('per-file upload token limit', () => {
  it.each(Object.entries(ENV_TARGETS))('%s is configured for 175,000 tokens', (_env, target) => {
    const renderedConfig = yaml.load(
      renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, target.envFile),
    ) as RenderedConfig;
    expect(mergeFileConfig(renderedConfig.fileConfig).fileTokenLimit).toBe(NJ_FILE_TOKEN_LIMIT);
  });
});
