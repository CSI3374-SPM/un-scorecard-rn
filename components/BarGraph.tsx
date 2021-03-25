import _ from "lodash";
import React, { useState, useEffect } from "react";
import { VictoryBar } from "victory-native";
import {
  VictoryChart,
  VictoryTheme,
} from "victory-native";

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Props = {
  data: number[][];
};

export default function BarGraph(props: Props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
      <VictoryChart theme={VictoryTheme.material}>
        {data.map((d, i) => {
          return <VictoryBar key={i} data={[
            {x: 0, y: data[i][0]},
            {x: 1, y: data[i][1]},
            {x: 2, y: data[i][2]},
            {x: 3, y: data[i][3]},
            {x: 4, y: data[i][4]},
            {x: 5, y: data[i][5]}
        ]}
        />
        })}
        
      </VictoryChart>
  );
}
