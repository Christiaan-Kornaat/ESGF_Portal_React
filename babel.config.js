// babel.config.js
// Necessary for Jest to run.
module.exports = function(api) {
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react"
    ];
    const plugins = [
        'macros',
        "transform-object-rest-spread",
        "transform-react-jsx"
    ];

    api.cache(false);

    return {
        presets,
        plugins
    };
};