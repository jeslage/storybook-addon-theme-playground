import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, ADDON_TITLE, PANEL_ID, TOOL_ID } from "./constants";

import { Panel } from "./Panel";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, () => {
  // // Register the tool
  // addons.add(TOOL_ID, {
  //   type: types.TOOL,
  //   title: ADDON_TITLE,
  //   match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
  //   render: Tool,
  // });
  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: ADDON_TITLE,
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
  });
});
