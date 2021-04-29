import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Organizer: {
        screens: {
          Organizer: "organizer",
          Email: "email",
        },
      },
      Landing: {
        screens: {
          Generate: "generate",
          Join: "join",
          ModerateExisting: "modExisting",
          QuickStart: "introduction"
        },
      },
      Root: {
        screens: {
          Survey: {
            screens: {
              Survey: "one",
            },
          },
          Answers: {
            screens: {
              Answers: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
