/// <reference types="node" />
import * as fs from 'fs';
import { sync as mkdirp } from 'mkdirp';
import * as prettier from 'prettier';
import { MarkOptional } from 'ts-essentials';
export interface Config {
    cwd: string;
    target: string;
    outDir?: string | undefined;
    prettier?: object | undefined;
    filesToProcess: string[];
    allFiles: string[];
    flags: CodegenConfig;
}
export interface CodegenConfig {
    alwaysGenerateOverloads: boolean;
    tsNocheck?: boolean;
    environment: 'hardhat' | undefined;
}
export declare type PublicConfig = MarkOptional<Config, 'flags'>;
export declare abstract class TypeChainTarget {
    readonly cfg: Config;
    abstract readonly name: string;
    constructor(cfg: Config);
    beforeRun(): Output | Promise<Output>;
    afterRun(): Output | Promise<Output>;
    abstract transformFile(file: FileDescription): Output | Promise<Output>;
}
export declare type Output = void | FileDescription | FileDescription[];
export interface FileDescription {
    path: string;
    contents: string;
}
export interface Services {
    fs: typeof fs;
    prettier: typeof prettier;
    mkdirp: typeof mkdirp;
}
