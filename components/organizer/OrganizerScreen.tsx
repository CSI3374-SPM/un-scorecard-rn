import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import {idProps} from "../generate_code/JoinScreen";
import {fetchSurveyResults} from "../../api/Wrapper";

export default function OrganizerScreen(props: idProps) {
    const [id, setID] = useState("");
    return (
        <View style={styles.container}>
            <TextInput
                label="Organizer screen"
                value={id}
                onChangeText={(id) => setID(id)}
            />
            <Button mode="contained" onPress={() => {
                props.updateid({
                    id: id,
                });
                setID("");
            }}>

            </Button>
        </View>
    );
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
