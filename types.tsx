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
  Survey: undefined;
  Answers: undefined;
};

export type SurveyParamList = {
  Survey: undefined;
};

export type AnswersParamList = {
  Answers: undefined;
};

export type LandingParamList = {
  Generate: undefined;
  Join: undefined;
  ModerateExisting: undefined;
};

export type OrganizerParamList = {
  Organizer: undefined;
  Email: undefined;
};

export type RootNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Survey">,
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Root">,
    CompositeNavigationProp<
      StackNavigationProp<OrganizerParamList, "Organizer">,
      StackNavigationProp<LandingParamList, "Generate">
    >
  >
>;
