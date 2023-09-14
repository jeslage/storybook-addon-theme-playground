/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  addons: ['storybook-addon-theme-playground'],
};

export default config;
