const lightTheme = {
  cursorColor: "#d1d5da",
  cursorAccentColor: "#005cc5",
  foregroundColor: "#586069",
  backgroundColor: "#f6f8fa",
  selectionColor: "#586069",
  borderColor: "#e1e4e8",
  colors: {
    black: "#24292e",
    red: "#d73a49",
    green: "#28a745",
    yellow: "#dbab09",
    blue: "#0366d6",
    magenta: "#5a32a3",
    cyan: "#1b7c83",
    white: "#6a737d",
    lightBlack: "#959da5",
    lightRed: "#cb2431",
    lightGreen: "#22863a",
    lightYellow: "#b08800",
    lightBlue: "#005cc5",
    lightMagenta: "#5a32a3",
    lightCyan: "#3192aa",
    lightWhite: "#d1d5da",
  },
  css: `
  .tabs_title {
    color: #586069;
  }
  .tab_textInner {
    color: #586069;
  }
  `,
};

const darkTheme = {
  cursorColor: "#79b8ff",
  cursorAccentColor: "#586069",
  foregroundColor: "#ffffff",
  backgroundColor: "#1f2428",
  selectionColor: "#d1d5da",
  borderColor: "#1b1f23",
  colors: {
    black: "#586069",
    red: "#ea4a5a",
    green: "#34d058",
    yellow: "#ffea7f",
    blue: "#2188ff",
    magenta: "#b392f0",
    cyan: "#39c5cf",
    white: "#d1d5da",
    lightBlack: "#959da5",
    lightRed: "#f97583",
    lightGreen: "#85e89d",
    lightYellow: "#ffea7f",
    lightBlue: "#79b8ff",
    lightMagenta: "#b392f0",
    lightCyan: "#56d4dd",
    lightWhite: "#fafbfc",
  },
};

function toggleTheme() {
  window.store.dispatch({
    type: "THEME_SWITCHER_UPDATE_THEME",
    config: config.getConfig(),
  });
}

exports.middleware = () => (next) => (action) => {
  if (action.type === "CONFIG_LOAD") {
    window.matchMedia("(prefers-color-scheme: light)").addListener(toggleTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addListener(toggleTheme);
    toggleTheme();
  }
  next(action);
};

exports.decorateConfig = (config) => {
  return Object.assign({}, config, darkTheme); // TODO: Initially set the right theme. How?
};

exports.reduceUI = (state, { type, config }) => {
  if (type != "THEME_SWITCHER_UPDATE_THEME") {
    return state;
  }

  const theme = require("@electron/remote").nativeTheme.shouldUseDarkColors
    ? darkTheme
    : lightTheme;

  return state
    .set("cursorColor", theme.cursorColor)
    .set("cursorAccentColor", theme.cursorAccentColor)
    .set("foregroundColor", theme.foregroundColor)
    .set("backgroundColor", theme.backgroundColor)
    .set("selectionColor", theme.selectionColor)
    .set("borderColor", theme.borderColor)
    .set("colors", theme.colors)
    .set("css", `${config.css || ""} ${theme.css}`);
};
