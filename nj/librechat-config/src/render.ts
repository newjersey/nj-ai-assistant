import fs from 'fs';
import path from 'path';
import * as njk from 'nunjucks';
import dotenv from 'dotenv';

interface RenderTarget {
  envFile: string;
  outputFilename: string;
}

export const LIBRECHAT_YAML_TEMPLATE = 'librechat.yaml.njk';
export const PARENT_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PARENT_DIR, '..', '..');
const RENDERED_FILE_WARNING = `# WARNING: This is an auto-generated file, do not edit it manually!
# To edit this file, edit the librechat.yaml.njk template and then run: npm run nj-render-configs
`;

const NUNJUCKS_ENV = new njk.Environment(new njk.FileSystemLoader(PARENT_DIR), {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
});

export const ENV_TARGETS: Record<string, RenderTarget> = {
  dev: { envFile: path.resolve(REPO_ROOT, '.env.nj-dev'), outputFilename: 'librechat.dev.yaml' },
  prod: { envFile: path.resolve(REPO_ROOT, '.env.nj-prod'), outputFilename: 'librechat.prod.yaml' },
};

export const LOCAL_DEVELOPMENT_TARGET: RenderTarget = {
  envFile: path.resolve(REPO_ROOT, '.env'),
  outputFilename: 'librechat.local.yaml',
};

export function renderLibreChatYaml(templateFile: string, envFile: string): string {
  const envVars = dotenv.parse(fs.readFileSync(envFile));
  const renderedLibreChatYamlTemplate = NUNJUCKS_ENV.render(templateFile, envVars);
  return `${RENDERED_FILE_WARNING}\n${renderedLibreChatYamlTemplate}`;
}

export function writeLibreChatYamlFile(
  fileContents: string,
  outputFilename: string,
  outputFilePath: string,
): void {
  const outputFileLocation = path.join(outputFilePath, outputFilename);
  fs.writeFileSync(outputFileLocation, fileContents);
}

function main(): void {
  const renderLocal = process.argv.includes('-l') || process.argv.includes('--local');
  const targets = renderLocal ? [LOCAL_DEVELOPMENT_TARGET] : Object.values(ENV_TARGETS);

  targets.forEach((target) => {
    const fileContents = renderLibreChatYaml(LIBRECHAT_YAML_TEMPLATE, target.envFile);
    writeLibreChatYamlFile(fileContents, target.outputFilename, PARENT_DIR);
    console.log(`Rendered ${target.outputFilename} using ${path.basename(target.envFile)}`);
  });
}

if (require.main === module) {
  main();
}
