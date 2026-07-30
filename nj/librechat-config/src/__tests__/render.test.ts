import fs from 'fs';
import os from 'os';
import path from 'path';
import { renderLibreChatYaml, writeLibreChatYamlFile } from '../render';

const TEST_TEMPLATE = 'src/__tests__/resources/librechat-test.yaml.njk';

const ENABLED_ENV = 'src/__tests__/resources/enabled-feature.env';
const EXPECTED_ENABLED_YAML = `
# WARNING: This is an auto-generated file, do not edit it manually!
# To edit this file, edit the librechat.yaml.njk template and then run: npm run render

name: my-app
feature:
  enabled: true
trailing: 12345
`.trimStart();

const DISABLED_ENV = 'src/__tests__/resources/disabled-feature.env';
const EXPECTED_DISABLED_YAML = `
# WARNING: This is an auto-generated file, do not edit it manually!
# To edit this file, edit the librechat.yaml.njk template and then run: npm run render

name: my-app2
trailing: 12345
`.trimStart();

describe('renderLibreChatYaml', () => {
  it('substitutes env vars and includes a block based on feature flags', () => {
    expect(renderLibreChatYaml(TEST_TEMPLATE, ENABLED_ENV)).toBe(EXPECTED_ENABLED_YAML);
  });

  it('can omit a conditional block based on feature flags', () => {
    expect(renderLibreChatYaml(TEST_TEMPLATE, DISABLED_ENV)).toBe(EXPECTED_DISABLED_YAML);
  });
});

describe('writeLibreChatYamlFile', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'librechat-config-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('writes the rendered contents to the output location', () => {
    writeLibreChatYamlFile(EXPECTED_ENABLED_YAML, 'librechat.test.yaml', tmpDir);

    const written = fs.readFileSync(path.join(tmpDir, 'librechat.test.yaml'), 'utf8');
    expect(written).toBe(EXPECTED_ENABLED_YAML);
  });
});
