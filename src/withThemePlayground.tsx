/* eslint-disable react/display-name */
import * as React from 'react';
import addons from '@storybook/addons';

import { Theme, ConfigProps } from './types';
import events from './events';

interface ThemePlaygroundProps {
  theme: Theme;
  provider: any;
  overrides: object;
  config: ConfigProps;
}

type ThemePlaygroundState = Theme;

export class WithThemePlayground extends React.Component<
  ThemePlaygroundProps,
  ThemePlaygroundState
> {
  state = Array.isArray(this.props.theme)
    ? this.props.theme[0].theme
    : this.props.theme;

  channel = addons.getChannel();

  handleReset = () => {
    const { theme, config, overrides } = this.props;
    return this.channel.emit(events.resetOptions, { theme, config, overrides });
  };

  componentDidMount() {
    const { theme, config, overrides } = this.props;

    this.channel.on(events.updateTheme, (t) => this.setState(t));
    this.channel.on(events.reset, this.handleReset);

    this.channel.emit(events.receiveOptions, { theme, config, overrides });
  }

  componentWillUnmount() {
    this.channel.removeListener(events.updateTheme, (t) => this.setState(t));
    this.channel.removeListener(events.reset, this.handleReset);
  }

  render() {
    const ThemeProvider = this.props.provider;

    return (
      <ThemeProvider theme={this.state}>{this.props.children}</ThemeProvider>
    );
  }
}

export const withThemePlayground = (props: ThemePlaygroundProps) => {
  if (!props.provider) {
    throw Error(
      'Missing ThemeProvider in withThemePlayground decorator options.'
    );
  }

  if (!props.theme) {
    throw Error('Missing theme key in withThemePlayground decorator options.');
  }

  return (storyFn) => (
    <WithThemePlayground
      theme={props.theme}
      provider={props.provider}
      config={props.config}
      overrides={props.overrides}
    >
      {storyFn()}
    </WithThemePlayground>
  );
};
