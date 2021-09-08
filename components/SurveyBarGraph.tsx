import React, { useState, useEffect } from "react";
import { SurveyResponse } from "../store/survey/SurveyReducer";
import BarGraph from "./BarGraph";
import _ from "lodash";
import { questions } from "../api/Wrapper";

interface Props {
  surveyData: SurveyResponse[][] | null;
  questionIndex: number;
}

const computeResponseSums = (
  surveyData: SurveyResponse[][] | null,
  ndx: number
) => {
  if (_.isNull(surveyData)) return [0, 0, 0, 0, 0, 0];

  return QuestionNum(surveyData, ndx);
};

const QuestionNum = (data: SurveyResponse[] | null, ndx: number) => {
  let scoreTotals = [0, 0, 0, 0, 0, 0];
  console.log("data in bar graph ", data);
  if (!_.isNull(data)) {
    let currentResponses = _.filter(data, { id: ndx + 1 });
    currentResponses.map((response) => {
      if (!_.isUndefined(response)) {
        if (response.score >= 0 && response.score <= 5) {
          scoreTotals[response.score]++;
        }
      }
    });
  }
  return scoreTotals;
};

export default function SurveyBarGraph(props: Props) {
  // @ts-ignore
  const [data, setData]: [number[], (n: number[]) => void] = useState([]);

  useEffect(() => {
    setData(computeResponseSums(props.surveyData, props.questionIndex));
  }, [props.surveyData, props.questionIndex]);
  //console.log("resp: " + data);
  return !_.isNull(props.surveyData) && data.length > 0 ? (
    <BarGraph
      data={data}
      xLabel="Score values"
      yLabel="Number of responders for score"
    />
  ) : (
    <></>
  );
}
