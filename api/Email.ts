import { Linking } from "react-native";

export const sendEmails = async (emails: string[], body: string) => {
  const subject = encodeURIComponent("UN Scorecard Survey Data");
  const emailBody = encodeURIComponent(
    `Here is the result of your Disaster Resilience Scorecard for Cities report<br><br>${body}`
  );
  const url = `mailto:${emails.join(
    ", "
  )}?subject=${subject}&body=${emailBody}`;
  console.log(url);
  try {
    await Linking.openURL(url);
  } catch (e) {
    console.log(e);
  }
};
