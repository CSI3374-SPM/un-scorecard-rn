import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Landing: undefined;
  Organizer: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type LandingParamList = {
  Generate: undefined;
  Join: undefined;
};

export type OrganizerParamList = {
  Organizer: undefined;
  Email: undefined;
};

export type RootNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "TabOne">,
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Root">,
    CompositeNavigationProp<
      StackNavigationProp<OrganizerParamList, "Organizer">,
      StackNavigationProp<LandingParamList, "Generate">
    >
  >
>;
