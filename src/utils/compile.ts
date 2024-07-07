import { compile as originCompile, CompileOpts } from '@ton/blueprint';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';

export const COMPILE_END = '.compile.ts';
const WRAPPERS_DIR = path.join(process.cwd(), 'wrappers');
const CACHE_DIR = path.join(os.tmpdir(), 'ton-vitest-utils-cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

const getFileHash = (filePath: string) => {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
};

export const compile = async (name: string, options?: CompileOpts) => {
  const uniqueName = name + Math.random().toString(36).substring(2);
  const sourcePath = path.join(WRAPPERS_DIR, name + COMPILE_END);
  const sourceHash = getFileHash(sourcePath);
  const cachePath = path.join(CACHE_DIR, `${sourceHash}.cjs`);
  const esmPath = path.join(WRAPPERS_DIR, uniqueName + COMPILE_END);
  const compiledCjsPath = path.join(WRAPPERS_DIR, `${uniqueName}.compile.js`);
  const compiledCtsPath = path.join(WRAPPERS_DIR, `${uniqueName}.cjs` + COMPILE_END);

  try {
    if (fs.existsSync(cachePath)) {
      // Copy cached compiled file back to wrappers directory
      const cachedFileName = `${uniqueName}.cjs`;
      const cachedFilePath = path.join(WRAPPERS_DIR, cachedFileName + COMPILE_END);
      fs.copyFileSync(cachePath, cachedFilePath);

      const compiled = await originCompile(cachedFileName, options);
      fs.unlinkSync(cachedFilePath);
      return compiled;
    }

    // Clone the file user provided
    fs.copyFileSync(sourcePath, esmPath);

    // Use tsc to convert the ESM to CJS
    execSync(`tsc ${esmPath} --module commonjs --skipLibCheck`);

    // Copy the CJS compiled file to the unique name
    fs.copyFileSync(compiledCjsPath, compiledCtsPath);

    // Cache the compiled file
    fs.copyFileSync(compiledCjsPath, cachePath);

    const compiled = await originCompile(`${uniqueName}.cjs`, options);

    fs.existsSync(esmPath) && fs.unlinkSync(esmPath);
    fs.existsSync(compiledCjsPath) && fs.unlinkSync(compiledCjsPath);
    fs.existsSync(compiledCtsPath) && fs.unlinkSync(compiledCtsPath);

    return compiled;
  } catch {
    fs.existsSync(esmPath) && fs.unlinkSync(esmPath);
    fs.existsSync(compiledCjsPath) && fs.unlinkSync(compiledCjsPath);
    fs.existsSync(compiledCtsPath) && fs.unlinkSync(compiledCtsPath);
  }
};
