import React from "react";
import { FAB, Title } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";

export default function OptionsScreen() {
  const navigation = useNavigation<RootNavigationProp>();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <View style={styles.container}>
      <View style={styles.organizerArea}>
        <Title
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: theme.colors.darkText,
            marginLeft: 16,
          }}
        >
          Moderator
        </Title>
        <View style={styles.organizerButtons}>
          <FAB
            icon="plus"
            label="New Survey"
            style={{
              backgroundColor: theme.colors.confirm,
              width: "55%",
            }}
            color={theme.colors.surface}
            onPress={() => navigation.navigate("Generate")}
          />

          <FAB
            icon="account-arrow-right"
            label="Moderate Survey"
            color={theme.colors.surface}
            style={{ backgroundColor: theme.colors.primary, width: "55%" }}
            onPress={() => navigation.navigate("ModerateExisting")}
          >
            Join
          </FAB>
        </View>
      </View>

      <View style={styles.userArea}>
        <Title
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: theme.colors.darkText,
            marginLeft: 16,
          }}
        >
          User
        </Title>
        <View style={styles.userButtons}>
          <FAB
            color={theme.colors.surface}
            icon="account-arrow-right"
            label="Take Survey"
            style={{
              backgroundColor: theme.colors.primary,
              width: "55%",
            }}
            onPress={() => navigation.navigate("Join")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  organizerArea: {
    height: "48%",
    marginTop: "4%",
    width: "100%",
  },
  userArea: {
    height: "48%",
    width: "100%",
  },
  userButtons: {
    height: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  organizerButtons: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginLeft: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
