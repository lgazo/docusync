// @ts-ignore
import inquirer from 'inquirer';

import { CommandType, keys, Command } from './types';

const askCommandName = async () => {
    const questions = [
        {
            name: 'name',
            type: 'list',
            message: 'What do you command, my lord?',
            choices: keys(),
        },
    ];
    return inquirer.prompt(questions);
};

const askArguments = async (commandName: string) => {
    switch (commandName) {
        case CommandType.addResource.id:
            return inquirer.prompt([
                {
                    name: 'url',
                    type: 'string',
                    message:
                        'Enter absolute URL to the resource you would like to download and synchronize in the future',
                },
            ]);
        case CommandType.enterCredentials.id:
            return inquirer.prompt([
                {
                    name: 'datasource',
                    type: 'list',
                    choices: ['xwiki'],
                    message: 'Select the datasource you want to assign credentials to',
                },
                {
                    name: 'username',
                    type: 'string',
                    message: 'User name',
                },
                {
                    name: 'password',
                    type: 'password',
                    message: 'Password',
                },
            ]);
        default:
            return Promise.resolve([]);
    }
};

export const askInteractively = async () => {
    const commandName = await askCommandName();
    const commandArguments = await askArguments(commandName.name);
    const command: Command = {
        name: commandName.name,
        arguments: commandArguments,
    };
    // console.log(`Inquired command ${command}`);
    return command;
};
