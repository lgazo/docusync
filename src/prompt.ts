//@ts-ignore
import yargs from 'yargs';

import { Command, CommandType } from './types';

export const processArguments = (): Command => {
    yargs
        .usage('Usage: $0 <command> [options]')
        .command(CommandType.download.id, 'Download the data from the source')
        .command(`${CommandType.addResource.id} <url>`, 'Add new page/resource to import')
        .command(
            `${CommandType.enterCredentials.id} <username> [password]`,
            'Enter credentials to authenticate against the source'
        );
    const argv = yargs.argv;

    const all = argv._;
    const command: Command = {
        name: all.length > 0 ? all[0] : null,
        arguments: {
            ...argv,
        },
    };
    return command;
};
