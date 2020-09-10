import fs from 'fs';
import path from 'path';

import { Document, Status } from './types';

export const writeDocument = (config: Record<string, any>) => async (document: Document): Promise<Status> => {
    const documentTargetDir = config.get(['sources', 'default', 'target', 'dir'].join('.'));
    const filename = `${document.targetPath}.md`;
    const canonicalFilenamePath = path.join(__dirname, documentTargetDir, filename);

    const canonicalDirectory = canonicalFilenamePath.substring(0, canonicalFilenamePath.lastIndexOf(path.sep));

    try {
        await fs.promises.access(canonicalDirectory, fs.constants.W_OK);
    } catch(e) {
        await fs.promises.mkdir(canonicalDirectory, { recursive: true });
        console.log(`INFO: created directory ${canonicalDirectory}`);
    }

    try {
        await fs.promises.access(document.targetPath, fs.constants.W_OK)
        console.log(`INFO: document ${document.targetPath} exists`);
    } catch(e) {
        // no worries, we will create it anyway
    }

    try {
        await fs.promises.writeFile(canonicalFilenamePath, document.content);
        return Status.ok;
    } catch(e) {
        console.error(`ERROR: unable to write file ${canonicalFilenamePath}`, e);
        return Status.fail;
    }
    
}