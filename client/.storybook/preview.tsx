/** @format */

import type { Preview } from "@storybook/react";
import "../src/global.css";
import {
  withThemeByClassName,
  withThemeByDataAttribute,
  withThemeFromJSXProvider,
} from "@storybook/addon-styling";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "twitter",
      values: [
        {
          name: "light",
          value: "white",
        },
        {
          name: "dark",
          value: "#1B1C1D",
        },
      ],
    },
  },
};

export default preview;
