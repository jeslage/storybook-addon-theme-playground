/* eslint-disable react/display-name */
import * as React from 'react';
import addons, { makeDecorator } from '@storybook/addons';

import { Theme, ConfigProps } from './types';
import events from './events';

type ThemePlaygroundProps = {
  channel: any;
  story: any;
  options: {
    theme: Theme;
    provider: any;
    overrides: object;
    config: ConfigProps;
  };
};

type ThemePlaygroundState = Theme;

export class WithThemePlayground extends React.Component<
  ThemePlaygroundProps,
  ThemePlaygroundState
> {
  state = Array.isArray(this.props.options.theme)
    ? this.props.options.theme[0].theme
    : this.props.options.theme;

  channel = this.props.channel ? this.props.channel : addons.getChannel();

  handleReset = () => {
    return this.channel.emit(events.resetOptions, this.props.options);
  };

  componentDidMount() {
    this.channel.on(events.updateTheme, (t) => this.setState(t));
    this.channel.on(events.reset, this.handleReset);

    this.channel.emit(events.receiveOptions, this.props.options);
  }

  componentWillUnmount() {
    this.channel.removeListener(events.updateTheme, (t) => this.setState(t));
    this.channel.removeListener(events.reset, this.handleReset);
  }

  render() {
    const { story, options } = this.props;

    if (!options.provider) {
      throw Error(
        'Missing ThemeProvider in withThemePlayground decorator options.'
      );
    }

    if (!options.theme) {
      throw Error(
        'Missing theme key in withThemePlayground decorator options.'
      );
    }

    const ThemeProvider = options.provider;

    return <ThemeProvider theme={this.state}>{story}</ThemeProvider>;
  }
}

export const withThemePlayground = makeDecorator({
  name: 'withThemePlayground',
  parameterName: 'theme-playground',
  wrapper: (getStory, context, { options }) => {
    return <WithThemePlayground story={getStory(context)} options={options} />;
  },
});
