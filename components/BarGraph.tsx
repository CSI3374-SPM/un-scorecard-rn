import _ from "lodash";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryBar } from "victory-native";
import { VictoryChart, VictoryTheme } from "victory-native";

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Props = {
  data: number[];
  xLabel: string;
  yLabel: string;
};

export default function BarGraph(props: Props) {
  const [data, setData] = useState(props.data);
  const [max, setMax] = useState(5);

  useEffect(() => {
    setData(props.data);
    setMax(
      props.data.reduce((a, b) => {
        if (a < b) {
          return b;
        }
        if (b < 5) {
          return 5;
        }
        return b;
      })
    );
  }, [props.data]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          marginHorizontal: 0,
          position: "relative",
        }}
      >
        <View style={{ alignSelf: "center", minWidth: 12, margin: -94 }}>
          <Text
            style={{
              alignSelf: "flex-start",
              transform: [{ rotate: "270deg" }],
              marginLeft: 8,
              marginRight: -8,
            }}
          >
            {props.yLabel}
          </Text>
        </View>
        <View>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar
              barWidth={(i) => 25}
              alignment="start"
              data={data.map((y, i) => {
                return { x: i.toString(), y };
              })}
              domain={[0, max]}
            />
          </VictoryChart>
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text>{props.xLabel}</Text>
      </View>
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
