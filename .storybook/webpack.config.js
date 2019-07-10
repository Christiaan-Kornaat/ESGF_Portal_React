const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');
//dont need stories path if you have your stories inside your //components folder
module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH, STORIES_PATH],
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './.storybook/tsconfig.json'
          }
        },
        { loader: require.resolve('react-docgen-typescript-loader') }
      ]
  });
  config.module.rules.push({
    test: /\.(scss)$/,
    include: [SRC_PATH, STORIES_PATH],
      use: [
        {
            loader: "style-loader" // inject CSS to page
        }, {
            loader: "css-loader" // translates CSS into CommonJS modules
        }, {
            loader: "postcss-loader", // Run post css actions
            options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                        require("precss"),
                        require("autoprefixer")
                    ];
                }
            }
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};