import fs from 'fs';
import path from 'path';

const EMPTY_CONFIG = {};

// const getFile = () => path.join(__dirname, '.docusync.json');
const getFile = (baseDir: string) => path.join(baseDir, '.docusync.json');

const readConfig = async (config: any, syncConfig: Record<string, any>) => {
    const baseDir = config.get(['base','dir'].join('.')) || process.cwd();
    const syncConfigFile: string = getFile(baseDir);

    try {
        // console.log(`Checking access`);
        await fs.promises.access(syncConfigFile, fs.constants.R_OK | fs.constants.W_OK);
        

        const data: Buffer = await fs.promises.readFile(syncConfigFile);
        //@ts-ignore
        const newSyncConfig = JSON.parse(data);
        // console.log(`Parsed data from ${syncConfigFile}, data = ${newSyncConfig}`);
        return newSyncConfig;
    } catch (e) {
        // no worries
        return syncConfig;
    }
};

export const addResource = (config: any) => async (resource: string) => {
    const baseDir = config.get(['base','dir'].join('.')) || process.cwd();
    const syncConfigFile: string = getFile(baseDir);
    console.log(`Fetching sync config from ${syncConfigFile}`);

    let syncConfig: Record<string, any> = {};
    syncConfig = await readConfig(config, syncConfig);

    if(!syncConfig.resources) {
        syncConfig.resources = [];
    }
    syncConfig.resources.push(resource);

    const syncConfigString = JSON.stringify(syncConfig);
    // console.log(`Prepared data ${syncConfigString}`);
    await fs.promises.writeFile(syncConfigFile, syncConfigString);
    console.log(`Data written to ${syncConfigFile}`);
}

export const getResources = (config: any) => async (): Promise<string[]> => {
    const syncConfig = await readConfig(config, EMPTY_CONFIG);
    if(syncConfig.resources === undefined || syncConfig.resources === null) {
        return [];
    }
    return syncConfig.resources;
}