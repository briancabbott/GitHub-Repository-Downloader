module.exports = function (api) {
    api.cache(true);
  
    const envOpts = {
        shippedProposals: true,
        modules: false,
        exclude: [
            "transform-typeof-symbol",
            // We need to enable useBuiltIns
            "proposal-object-rest-spread",
        ],
    };

    const presets = [
        ["@babel/env", envOpts],
        ["@babel/preset-env", {"targets": {"esmodules": true, "node": "current"},
                               "useBuiltIns": "entry"}],
        ["@babel/preset-typescript", { onlyRemoveTypeImports: true,  allowDeclareFields: true}],
    ];
    const plugins = [
        ["@babel/plugin-transform-typescript"],
        ["@babel/plugin-transform-typescript-metadata"],
        ["@babel/plugin-proposal-async-generator-functions"]
    ];
  
    return {
        envOpts,
        presets,
        plugins
    };
}