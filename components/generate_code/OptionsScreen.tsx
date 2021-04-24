import React, { useState } from "react";
import { Button, FAB, Title } from "react-native-paper";
import { StyleSheet, useColorScheme, View, Image,  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types";
import { DarkTheme, DefaultTheme } from "../../constants/Colors";
//import { Tooltip, Text } from 'react-native-elements';
import { Tooltip, Text } from "react-native-elements";
import { size } from "lodash";


export default function OptionsScreen() {
  const navigation = useNavigation<RootNavigationProp>();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const [toolTipVisible, setToolTipVisible] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.organizerArea}>
        <View style={{flexDirection:"row"}}>
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
        <Tooltip backgroundColor={"#d2d5d9"} height={250} width={300} 
                  popover={<View><Text>Moderators are able to control surveys for users and view data as they are completed.</Text>
                                <Text></Text><Text></Text>
                                <Text>"New Survey" generates a new session code for a survey that can be distributed to users requested to take the survey.</Text>
                                <Text></Text><Text></Text>
                                <Text>"Moderate Survey" allows a moderator to control and view an existing survey with a previously generated session code.</Text>
                          </View>}>
          <Image source={require('../../assets/images/info.png')} style={{width:20, height:20}} >
            </Image>
       </Tooltip>
       </View>
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
        <View style={{flexDirection:"row"}}>
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
        <Tooltip backgroundColor={"#d2d5d9"} height={150} width={300} popover={<View><Text>Users are able to take a survey.</Text><Text></Text><Text></Text><Text>"Take Survey" requires a session code that is given to the moderator.</Text></View>} >
          <Image source={require('../../assets/images/info.png')} style={{width:20, height:20, justifyContent: "center"}} />
</Tooltip>
</View>
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
      <View>
        <Button style={{paddingBottom:30}} onPress={()=> navigation.navigate("QuickStart")}>Quick Start Guide</Button>
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
  image: {
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
