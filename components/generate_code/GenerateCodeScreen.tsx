import * as React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View} from "react-native";

export default function GenerateCodeScreen({navigation}){
    const [city, setCity] = React.useState('');
    const [email, setEmail] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput label="City" value={city} onChangeText={city => setCity(city)}/>
            <TextInput label="Email" value={email} onChangeText={email => setEmail(email)}/>
            <Button  mode="contained" onPress={() => navigation.navigate('Root')}>
                Generate code
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