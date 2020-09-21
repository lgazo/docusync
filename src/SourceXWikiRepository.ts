//@ts-ignore
import fetch from 'node-fetch';
//@ts-ignore
import CLI from 'clui';
import { Document } from './types';

const EXPECTED_PREFIX = '/bin/view/';

const buildAuthorizationHeader = (sourceId: string, config: Record<string, any>) => {
    const credentialsPath = ['credentials', sourceId].join('.');
    console.log(`Going to read credentials from ${credentialsPath}`);

    const credentials = config.get(credentialsPath);
    const auth = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
    return `Basic ${auth}`;
};

const getWikiSpacePath = (resource: string, source: Record<string, any>) => {
    const pagePart =
        resource.indexOf(source.url) === 0
            ? resource.substring(source.url.length + EXPECTED_PREFIX.length)
            : resource.substring(EXPECTED_PREFIX.length);

    const pathSplit = pagePart.split('/');

    let wikiPath = '';

    pathSplit.forEach((fragment: string) => {
        wikiPath += 'spaces/' + fragment + '/';
    });

    return {
        pagePart,
        wikiPath,
    };
};

export const download = async (config: Record<string, any>, resources: string[], writeDocumentHandler: Function) => {
    const source = config.get(['sources', 'default'].join('.'));

    const auth = buildAuthorizationHeader('default', config);

    const status = new CLI.Spinner('Downloading resources');
    status.start();

    const baseUrl = `${source.url}/rest/wikis/xwiki`;
    const options = {
        headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            authorization: auth,
        },
    };

    const data = resources.map(async (resource) => {
        const wikiPageSpacePart = getWikiSpacePath(resource, source);
        const wikiPagePart = `${wikiPageSpacePart.wikiPath}pages/WebHome`;
        const url = `${baseUrl}/${wikiPagePart}/`;

        status.message(`Downloading ${url}`);
        try {
            const wikiDocument = await fetch(url, options);

            console.log(`Downloaded ${url}`);
            const jsonWikiDocument = await wikiDocument.json();

            const document: Document = {
                resource,
                targetPath: wikiPageSpacePart.pagePart,
                url,
                content: jsonWikiDocument.content,
            };

            status.message(`Writing document ${url}`);
            const result = await writeDocumentHandler(document);

            console.log(`Document written with status ${result}`);
            return {
                resource,
                targetPath: wikiPageSpacePart.pagePart,
                wikiPagePart,
                url,
                result,
            };
        } catch (e) {
            console.log(`Download failed ${url}`, e);
            return {
                resource,
                targetPath: wikiPageSpacePart.pagePart,
                wikiPagePart,
                url,
                result: 'download-failed',
            };
        }
    });

    status.stop();
    return data;
};
