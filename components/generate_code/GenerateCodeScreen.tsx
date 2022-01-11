import React, { useEffect, useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { SurveyProps } from "../../store/survey/SurveyReducer";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import {
  createSurveyV2,
  getSurveyLanguages,
  getSurveyOptions,
} from "../../api/WrapperV2";

export type SurveyOption = {
  label: string;
  value: string;
};

export default function GenerateCodeScreen(props: SurveyProps) {
  const [city, setCity] = useState("");
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [items, setItems] = useState([
    { label: "🇺🇸 - English", value: "en" },
    //{ label: "🇯🇵 - 日本語", value: "ja" },
  ]);

  const [openSurvey, setOpenSurvey] = useState(false);
  const [survey, setSurvey] = useState(null);
  // @ts-ignore
  const [surveyItems, setSurveyItems] = useState([
    {
      label: "who",
      value: "who",
    },
  ]);

  useEffect(() => {
    async function loadSurveyOptions() {
      await getSurveyOptions(setSurveyItems);
    }
    loadSurveyOptions();
  }, []);

  useEffect(() => {
    async function loadSurveyLanguages() {
      await getSurveyLanguages(survey, setItems);
    }
    loadSurveyLanguages();
  }, [survey]);
  // @ts-ignore
  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        value={city}
        onChangeText={(city) => setCity(city)}
      />

      <DropDownPicker
        open={openSurvey}
        value={survey}
        items={surveyItems}
        setOpen={setOpenSurvey}
        setValue={setSurvey}
        setItems={setSurveyItems}
        placeholder="Survey Type"
      />

      <DropDownPicker
        open={open}
        value={language}
        items={items}
        setOpen={setOpen}
        setValue={setLanguage}
        setItems={setItems}
        placeholder="Survey language"
      />

      <FAB
        icon=""
        label="Create Survey"
        style={{
          backgroundColor: theme.colors.confirm,
          width: "55%",
          alignSelf: "center",
        }}
        color={theme.colors.surface}
        onPress={async () => await generateID(city, props, language, survey)}
      />
    </View>
  );
}

async function generateID(
  city: string,
  props: SurveyProps,
  selectedLanguage: string,
  selectedSurvey: string
) {
  var surveyData = await createSurveyV2(selectedLanguage, selectedSurvey, city);

  let id = surveyData?.id;
  if (id != null) {
    console.log("generated survey id " + id);

    props.updateAuthentication({
      isOrganizer: true,
      surveyId: id,
      responseId: null,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
