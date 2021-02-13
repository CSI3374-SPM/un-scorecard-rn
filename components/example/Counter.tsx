import React from "react";
import { Button, Text } from "react-native-paper";
import { ExampleData } from "../../store/example/ExampleReducer";

type CounterProps = {
  data: ExampleData;
  updateNumber: (n: number) => void;
};

export default function Counter(props: CounterProps) {
  return (
    <>
      <Text>{props.data.n}</Text>
      <Button
        mode="contained"
        onPress={() => props.updateNumber(props.data.n + 1)}
      >
        Increment
      </Button>
      <Button
        mode="contained"
        onPress={() => props.updateNumber(props.data.n - 1)}
      >
        Decrement
      </Button>
    </>
  );
}
