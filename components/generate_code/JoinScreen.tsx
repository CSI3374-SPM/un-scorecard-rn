import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import {StyleSheet, View} from "react-native";

export default function JoinScreen({navigation}){
    const [id, setID] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput label="Session code" value={id} onChangeText={id => setID(id)}/>
            <Button  mode="contained" onPress={() => navigation.navigate('Root')}>
                Join
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
