import React, { Fragment, useState } from "react";
import {
  useAddonState,
  useChannel,
  useParameter,
} from "@storybook/manager-api";
import { AddonPanel, Link, Loader, Placeholder } from "@storybook/components";

import { ADDON_ID, EVENTS, PARAM_KEY } from "./constants";

import { PanelContent } from "./components/PanelContent";
import { PanelState, ThemePlaygroundProps } from "./types";
import { defaultOptions } from "./withThemePlayground";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const parameters = useParameter<ThemePlaygroundProps>(
    PARAM_KEY,
    defaultOptions
  );

  const [state, setState] = useAddonState<PanelState>(ADDON_ID);

  useChannel({
    [EVENTS.INIT]: setState,
  });

  if (!(parameters || state || state?.initialized)) return <Loader size={32} />;

  if (state && !state.theme) {
    return (
      <Placeholder>
        <Fragment key="title">You have not configured the addon yet</Fragment>

        <Fragment key="desc">
          Read more about how to configure&nbsp;
          <Link
            href="https://github.com/jeslage/storybook-addon-theme-playground#readme"
            cancel={false}
          >
            the addon
          </Link>
        </Fragment>
      </Placeholder>
    );
  }

  if (parameters && parameters.disabled) {
    return (
      <Placeholder>
        <Fragment key="title">
          Theme Playground is disabled for this story
        </Fragment>
        <Fragment key="desc">
          Read more about how to configure&nbsp;
          <Link
            href="https://github.com/jeslage/storybook-addon-theme-playground#readme"
            cancel={false}
          >
            the addon
          </Link>
        </Fragment>
      </Placeholder>
    );
  }

  return (
    <AddonPanel {...props}>
      {!state ? <Loader size={32} /> : <PanelContent />}
    </AddonPanel>
  );
};
