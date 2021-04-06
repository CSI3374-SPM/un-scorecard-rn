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
    surface: "#FFF",
    confirm: "#66BB6A",
    exit: "#db3027",
    accent: "#db2777",
    darkText: "#000",
  },
};

const darkTheme = {
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    primary: "#3498db",
    surface: "#212121",
    confirm: "#66BB6A",
    exit: "#b71c1c",
    accent: "#db2777",
    darkText: "#FFF",
  },
};

export const DefaultTheme = merge(defaultTheme, NavigationDefaultTheme);
export const DarkTheme = merge(darkTheme, NavigationDarkTheme);
