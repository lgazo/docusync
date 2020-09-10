import { Arguments } from './types';
import { addResource as addEntry } from './SyncConfigRepository';

export const addResource = async (args: Arguments, config: any) => {
    console.log(config);

    const source = config.get('sources.default');
    if(!args.url.startsWith(source.url)) {
        throw new Error(`The resource should be from ${source.url}`);
    }
    
    const resource = args.url.substring(source.url);
    await addEntry(config)(resource);
};