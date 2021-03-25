import _ from "lodash";
import React, { useState, useEffect } from "react";
import { VictoryBar } from "victory-native";
import { VictoryChart, VictoryTheme } from "victory-native";

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Props = {
  data: number[];
};

export default function BarGraph(props: Props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryBar
        data={[
          { x: 0, y: data[0] },
          { x: 1, y: data[1] },
          { x: 2, y: data[2] },
          { x: 3, y: data[3] },
          { x: 4, y: data[4] },
          { x: 5, y: data[5] },
        ]}
      />
    </VictoryChart>
  );
}
