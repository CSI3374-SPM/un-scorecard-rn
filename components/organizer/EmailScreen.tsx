import React, { useRef, useState } from "react";
import { Button, FAB, Subheading, TextInput, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { sendEmails } from "../../api/Wrapper";
import FinishButton from "../log_out/FinishButton";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

import { renderToString } from "react-dom/server";
import WebView from "react-native-webview";

import { Bar } from "react-chartjs-2";

// @ts-ignore
import { Button as ButtonWeb } from "react-native-web";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const SimpleText = () => {
  // return <WebView source={html`${}`} />;
  const styles = { marginLeft: "auto", marginRight: "auto", color: "red" };
  return (
    <div>
      <h1 style={styles}>this is some random text in the webview</h1>
      <Bar
        data={data}
        width={1000}
        height={505}
        options={{
          maintainAspectRatio: false,
        }}
      />
      <button>random button</button>
    </div>
  );
};

const SimpleTextView = () => {
  return <WebView source={{ html: renderToString(<SimpleText />) }} />;
};

export default function EmailScreen() {
  const scrollViewRef = useRef<ScrollView>();
  const [emails, setEmails]: [string[], (s: string[]) => void] = useState([""]);
  let defaultEditing = { index: -1, email: "" };
  const [editing, setEditing] = useState(defaultEditing);
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      <Text>
        {renderToString(
          <Bar
            data={data}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false,
            }}
          />
        )}
      </Text>
      <SimpleTextView />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
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
              "This is some pretty cool test data. I feel like I have to change it every time or my SMTP account gets locked!"
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
});
