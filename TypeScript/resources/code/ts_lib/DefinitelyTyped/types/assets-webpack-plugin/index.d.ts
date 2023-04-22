// Type definitions for assets-webpack-plugin 7.1
// Project: https://github.com/ztoben/assets-webpack-plugin
// Definitions by: Michael Strobel <https://github.com/kryops>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.7

/// <reference types="node" />
import { Compiler } from 'webpack';

declare namespace AssetsWebpackPlugin {
    interface Assets {
        [name: string]: {
            [ext: string]: string;
        };
    }

    type ProcessOutputFn = (assets: Assets) => string;

    interface Options {
        /**
         * If the `entrypoints` option is given, the output will be limited to the entrypoints and the chunks associated with them.
         *
         * `false` by default.
         */
        entrypoints?: boolean | undefined;

        /**
         * Name for the created json file.
         *
         * `"webpack-assets.json"` by default.
         */
        filename?: string | undefined;

        /**
         * When set and `includeAllFileTypes` is set `false` , only assets matching these types will be included in the assets file.
         *
         * `['js', 'css']` by default.
         */
        fileTypes?: string[] | undefined;

        /**
         * If `false` the output will not include the full path of the generated file.
         *
         * e.g. `/public/path/bundle.js` vs `bundle.js`
         *
         * `true` by default.
         */
        fullPath?: boolean | undefined;

        /**
         * When set `false` , falls back to the "fileTypes" option array to decide which file types to include in the assets file.
         *
         * `true` by default.
         */
        includeAllFileTypes?: boolean | undefined;

        /**
         * When set, will output any files that are part of the chunk and marked as auxiliary assets.
         *
         * `false` by default.
         */
        includeAuxiliaryAssets?: boolean | undefined;

        /**
         * When set, will output any files that are part of the chunk and marked as preloadable or prefechtable child assets via a dynamic import.
         *
         * `false` by default.
         */
        includeDynamicImportedAssets?: boolean | undefined;

        /**
         * When set and `entrypoints` is set `true` , will output any files that are part of the unnamed chunk to an additional unnamed ("") entry.
         *
         * `false` by default.
         */
        includeFilesWithoutChunk?: boolean | undefined;

        /**
         * Inserts the manifest javascript as a `text` property in your assets.
         * Accepts the name or names of your manifest chunk.
         * A manifest is the last CommonChunk that only contains the webpack bootstrap code.
         * This is useful for production use when you want to inline the manifest in your HTML skeleton for long-term caching.
         *
         * `false` by default.
         */
        includeManifest?: boolean | string | string[] | undefined;

        /**
         * When set the output from `webpack-subresource-integrity` is included in the assets file.
         *
         * `false` by default.
         */
        integrity?: boolean | undefined;

        /**
         * When set the assets file will only be generated in memory while running `webpack-dev-server` and not written to disk.
         *
         * `false` by default.
         */
        keepInMemory?: boolean | undefined;

        /**
         * Orders the assets output so that manifest is the first entry.
         * This is useful for cases where script tags are generated from the assets json output, and order of import is important.
         *
         * `false` by default.
         */
        manifestFirst?: boolean | undefined;

        /**
         * Inject metadata into the output file. All values will be injected into the key `metadata`.
         */
        metadata?: object | undefined;

        /**
         * Path where to save the created JSON file.
         *
         * Defaults to the current directory.
         */
        path?: string | undefined;

        /**
         * Whether to format the JSON output for readability.
         *
         * `false` by default.
         */
        prettyPrint?: boolean | undefined;

        /**
         * Formats the assets output.
         *
         * Defaults to `JSON.stringify`.
         */
        processOutput?: ProcessOutputFn | undefined;

        /**
         * If `true` the full path will automatically be stripped of the `/auto/` prefix generated by webpack.
         *
         * `false` by default.
         */
        removeFullPathAutoPrefix?: boolean | undefined;

        /**
         * When set to `true` , the output JSON file will be updated instead of overwritten.
         *
         * `false` by default.
         */
        update?: boolean | undefined;

        /**
         * Will override the path to use the compiler output path set in your webpack config.
         *
         * `false` by default.
         */
        useCompilerPath?: boolean | undefined;
    }
}

declare class AssetsWebpackPlugin {
    constructor(options?: AssetsWebpackPlugin.Options);

    apply(compiler: Compiler): void;
}

export = AssetsWebpackPlugin;