import _ from "lodash";
import React, { useState, useEffect } from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory-native";
import useColorScheme from "../hooks/useColorScheme";

// const characterData = [
//   { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
//   { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
//   { strength: 5, intelligence: 225, luck: 3, stealth: 60, charisma: 120 },
// ];

/* <View style={{ alignSelf: "center" }}>
        <RadarGraph data={characterData} />
      </View> */

// import WebView from "react-native-webview";
// const RadarGraphWebView = () => {
//   return (
//     <WebView
//       style={styles.webview}
//       source={{
//         uri: `${visualizationUrl}/radar-graph/123`,
//       }}
//     />
//   );
// };

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Point = {
  x: string;
  y: number;
};

export type Memo = {
  [key: string]: number;
};

type GroupedData = {
  [key: string]: number[];
};

const getMaxima = (data: Memo[]): Memo => {
  const groupedData: GroupedData = Object.keys(data[0]).reduce(
    (memo: GroupedData, key: string) => {
      memo[key] = data.map((d: Memo) => d[key]);
      return memo;
    },
    {}
  );
  return Object.keys(groupedData).reduce((memo: Memo, key: string) => {
    memo[key] = 5; // Math.max(...groupedData[key]);
    return memo;
  }, {});
};

const processData = (data: Memo[]): Point[][] => {
  const maxByGroup: Memo = getMaxima(data);
  const makeDataArray = (d: Memo) => {
    return Object.keys(d).map((key: string) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum: Memo) => makeDataArray(datum));
};

type Props = {
  data: Memo[];
};

export default function RadarGraph(props: Props) {
  const isDark = useColorScheme() === "dark";
  const [data, setData] = useState(processData(props.data));
  const [maxima, setMaxima] = useState(getMaxima(props.data));

  useEffect(() => {
    setData(processData(props.data));
    setMaxima(getMaxima(props.data));
  }, [props.data]);

  return (
    <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
      <VictoryGroup
        colorScale={["gold", "orange", "tomato"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        {data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {Object.keys(maxima).map((key, i) => {
        return (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: { padding: 10, fill: isDark ? "white" : "black" },
              axis: { stroke: "none" },
              grid: {
                stroke: isDark ? "white" : "grey",
                strokeWidth: 0.25,
                opacity: 0.5,
              },
            }}
            tickLabelComponent={
              <VictoryLabel
                labelPlacement="vertical"
                style={{ fill: isDark ? "#C3C3C3" : "grey" }}
              />
            }
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => Math.ceil(t * maxima[key])}
            tickValues={[0.25, 0.5, 0.75]}
          />
        );
      })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: isDark ? "white" : "grey", opacity: 0.5 },
        }}
      />
    </VictoryChart>
  );
}
