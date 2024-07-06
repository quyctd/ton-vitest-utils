import { compile as originCompile, CompileOpts } from '@ton/blueprint';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const COMPILE_END = '.compile.ts';
const WRAPPERS_DIR = path.join(process.cwd(), 'wrappers');

export const compile = async (name: string, options?: CompileOpts) => {
  const esmPath = path.join(WRAPPERS_DIR, name + COMPILE_END);
  const cjsPath = path.join(WRAPPERS_DIR, `${name}-cjs` + COMPILE_END);
  // Use tsc to convert the ESM to CJS
  execSync(`tsc ${esmPath} --module commonjs --skipLibCheck`);
  // Rename the CJS file to .ts
  try {
    fs.renameSync(path.join(WRAPPERS_DIR, `${name}.compile.js`), cjsPath);
  } catch {
    console.warn(`Ignored, file ${name}.compile.js not found`);
  }

  const compiled = await originCompile(`${name}-cjs`, options);
  try {
    fs.unlinkSync(cjsPath);
  } catch {
    console.warn(`Ignored, file ${cjsPath} not found`);
  }
  return compiled;
};
