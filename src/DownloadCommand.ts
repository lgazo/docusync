import { path } from 'ramda';

import { Arguments } from './types';
import { getResources } from './SyncConfigRepository';
import { writeDocument } from './LocalStorageRepository';

import { download as xwikiDownload } from './SourceXWikiRepository';

export const download = async (args: Arguments, config: any) => {
    // console.log(args);
    const source = config.get(['sources', 'default'].join('.'));
    const module = path(['module'], source);

    if (module !== 'xwiki') {
        throw new Error(`Unsupported module ${module}`);
    }

    const resources = await getResources(config)();
    await xwikiDownload(config, resources, writeDocument(config));
};