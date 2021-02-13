import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";

// Example custom light and dark themes
const defaultTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const darkTheme = {
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export const DefaultTheme = merge(defaultTheme, NavigationDefaultTheme);
export const DarkTheme = merge(darkTheme, NavigationDarkTheme);
