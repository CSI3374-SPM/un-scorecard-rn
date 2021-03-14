import React, { useRef, useState } from "react";
import { Button, FAB, Subheading, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { sendEmails } from "../../api/Email";
import FinishButton from "../log_out/FinishButton";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";

export default function EmailScreen() {
  const scrollViewRef = useRef<ScrollView>();
  const [emails, setEmails]: [string[], (s: string[]) => void] = useState([""]);

  return (
    <View style={styles.container}>
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
            <TextInput
              mode="flat"
              label="Enter email"
              key={`${email}-${index}`}
              value={email}
              onChangeText={(newEmail) => {
                let newEmails = _.clone(emailArr);
                newEmails[index] = newEmail.trim();
                setEmails(newEmails);
              }}
            />
          ))}
        </ScrollView>
        <FAB
          onPress={() => setEmails(emails.concat([""]))}
          small
          icon="plus"
          style={styles.fab}
        >
          Add Email
        </FAB>
      </View>
      <Button
        style={styles.item}
        mode="contained"
        onPress={async () => {
          await sendEmails(
            emails.filter((email) => email !== ""),
            "some data"
          );
        }}
      >
        Send Emails
      </Button>
      <View style={styles.item}>
        <FinishButton />
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
  item: {
    margin: 12,
  },
  scrollable: {
    maxHeight: "60%",
    flex: 1,
    flexGrow: 1,
    alignContent: "flex-start",
    padding: 4,
  },
  fab: {
    maxWidth: 56,
    padding: 8,
    marginBottom: 32,
    alignSelf: "flex-end",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
