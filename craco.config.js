const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#40a9ff',
              '@link-color': 'black',
              '@success-color':'#52c41a',
              '@font-size-base': '14px',
              '@border-radius-base': '4px', 
              '@border-color-base': '#d9d9d9',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};