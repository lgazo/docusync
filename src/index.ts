#!/usr/bin/env node

// @ts-ignore
import figlet from 'figlet';
import chalk from 'chalk';
// @ts-ignore
import Configstore from 'configstore';

import { download } from './DownloadCommand';
import { addResource } from './AddResourceCommand';
import { enterCredentials } from './EnterCredentialsCommand';

// Create a Configstore instance
const config = new Configstore('docusync');

import { processArguments } from './prompt';
import { askInteractively } from './inquire';

console.log(
    chalk.green(
        figlet.textSync('DocuSync', {
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
        })
    )
);

type HandlerKey = {
    handler: Function;
};
const availableCommands: Record<string, HandlerKey> = {
    // @ts-nocheck
    download: {
        handler: download,
    },
    addResource: {
        handler: addResource,
    },
    enterCredentials: {
        handler: enterCredentials,
    },
};

const run = async () => {
    // console.log(config)

    let command = processArguments();
    // console.log(command);

    if (command.name === null) {
        command = await askInteractively();
    }

    if (command.name !== null) {
        const commandName: string = command.name;
        await availableCommands[commandName].handler(command.arguments, config);
    }
};

run();
