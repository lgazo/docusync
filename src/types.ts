export type Arguments = Record<string, any>;
export type Command = {
    name: string | null,
    arguments: Arguments
};

export const CommandType = {
    download: {
        id: 'download'
    },
    addResource: {
        id: 'addResource'
    },
    enterCredentials: {
        id: 'enterCredentials'
    }
};

export const keys = () => Object.keys(CommandType);

export type Document = {
    content: string,
    resource: string,
    targetPath: string,
    url: string
};

export enum Status {
    ok = 'ok',
    fail = 'fail'
};
