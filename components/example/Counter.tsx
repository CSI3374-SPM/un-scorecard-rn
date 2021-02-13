import React from "react";
import { Button, Text } from "react-native-elements";
import { ExampleData } from "../../store/example/ExampleReducer";

type CounterProps = {
  data: ExampleData;
  updateNumber: (n: number) => void;
};

export default function Counter(props: CounterProps) {
  return (
    <>
      <Text h4>{props.data.n}</Text>
      <Button
        title="Increment"
        onPressOut={() => props.updateNumber(props.data.n + 1)}
      />
      <Button
        title="Decrement"
        onPressOut={() => props.updateNumber(props.data.n - 1)}
      />
    </>
  );
}
