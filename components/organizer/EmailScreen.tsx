import React, { useRef, useState } from "react";
import { Button, FAB, Subheading, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { sendEmails } from "../../api/Wrapper";
import FinishButton from "../log_out/FinishButton";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import {
  mapDispatchToProps,
  mapStateToProps,
  SurveyProps,
} from "../../store/survey/SurveyReducer";
import { connect } from "react-redux";

const visualizationUrl = process.env.GRAPH_URL;
const emailMessage = (surveyId: string) => {
  return `
Here is the result of your Disaster Resilience Scorecard for Cities report.
  
Radar Graph: ${visualizationUrl}/radar-graph/${surveyId}
  `;
};

function EmailScreen(props: SurveyProps) {
  const scrollViewRef = useRef<ScrollView>();
  const [emails, setEmails]: [string[], (s: string[]) => void] = useState([""]);
  let defaultEditing = { index: -1, email: "" };
  const [editing, setEditing] = useState(defaultEditing);
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Subheading>Enter Emails</Subheading>
            <ScrollView
              style={styles.scrollable}
              // @ts-ignore
              ref={scrollViewRef}
              onContentSizeChange={() =>
                // @ts-ignore
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {emails.map((email, index, emailArr) => (
                <View style={styles.email} key={`email-${index}`}>
                  <TextInput
                    mode="flat"
                    label="Enter email"
                    value={editing.index === index ? editing.email : email}
                    onChangeText={(newEmail) => {
                      setEditing({ index, email: newEmail.trim() });
                    }}
                    onFocus={() => {
                      setEditing({ index, email: emails[index] });
                    }}
                    onBlur={() => {
                      let newEmails = _.clone(emailArr);
                      newEmails[editing.index] = editing.email;
                      setEmails(newEmails);
                      setEditing(defaultEditing);
                    }}
                    style={styles.emailInput}
                  />
                  {/* Remove email button */}
                  <FAB
                    onPress={() => {
                      let newEmails = _.clone(emails);
                      newEmails.splice(index, 1);
                      setEmails(newEmails);
                    }}
                    small
                    icon="minus"
                    style={styles.fabMinus}
                  />
                </View>
              ))}
            </ScrollView>
            {/* Add Email button */}
            <FAB
              onPress={() => setEmails(emails.concat([""]))}
              small
              icon="plus"
              style={styles.fabAdd}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Subheading>{message}</Subheading>
      <View style={styles.buttonGroup}>
        <Button
          style={styles.item}
          mode="contained"
          onPress={async () => {
            sendEmails(
              emails.filter((email) => email !== ""),
              emailMessage(props.data.authentication.surveyId)
            );
            if (emails.filter((email) => email !== "").length > 0) {
              setMessage("Survey data was sent via email");
            } else {
              setMessage("");
            }
            setEmails([""]);
          }}
        >
          Send Emails
        </Button>
        <View style={styles.item}>
          <FinishButton />
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexGrow: 1,
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollable: {
    maxHeight: "60%",
    flex: 1,
    flexGrow: 1,
    alignContent: "flex-start",
    marginTop: 8,
    marginBottom: 16,
  },
  fabAdd: {
    maxWidth: 56,
    padding: 8,
    marginBottom: 32,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  fabMinus: {
    padding: 8,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  email: {
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  emailInput: {
    flex: 1,
    maxWidth: "80%",
    alignSelf: "stretch",
  },
  item: {
    margin: 12,
    alignSelf: "stretch",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  webview: {
    // margin: 100,
  },
});
