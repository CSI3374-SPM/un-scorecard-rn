import React, { useState, useEffect } from "react";
import { SurveyResponse } from "../store/survey/SurveyReducer";
import BarGraph from "./BarGraph";
import _ from "lodash";
import { questions } from "../api/Wrapper";

interface Props {
    surveyData: SurveyResponse[][] | null;
}

const computeResponseSums = (surveyData: SurveyResponse[][] | null) => {
  if (_.isNull(surveyData)) return [];

  const responseSums = questions.map((_q, i) => {
    return QuestionNum(surveyData, i);
  });

  return responseSums;
};

let scoreTotals : number[];
scoreTotals = [0,0,0,0,0,0];
const QuestionNum = (data: SurveyResponse[][], ndx: number) => {
    data.forEach((responder) => {
      const response = responder.find(
        (question) => question.questionIndex === ndx
      );
      if (!_.isUndefined(response)) {
        if(response.score == 0) {
            scoreTotals[0] = scoreTotals[0] + 1;
        } else if(response.score == 1) {
            scoreTotals[1] = scoreTotals[1] + 1;
        } else if(response.score == 2) {
            scoreTotals[2] = scoreTotals[2] + 1;
        } else if(response.score == 3) {
            scoreTotals[3] = scoreTotals[3] + 1;
        } else if(response.score == 4) {
            scoreTotals[4] = scoreTotals[4] + 1;
        } else if(response.score == 5) {
            scoreTotals[5] = scoreTotals[5] + 1;
        }
      }
    });
    return scoreTotals;
  };

  export default function SurveyBarGraph(props: Props) {
    // @ts-ignore
    const [data, setData]: [number[][], (n: number[][]) => void] = useState([]);
  
    useEffect(() => {
      setData(computeResponseSums(props.surveyData));
    }, [props.surveyData]);
    console.log("resp: " + data.length);
    return !_.isNull(props.surveyData) &&
      data.length > 0 &&
      Object.keys(data[0]).length > 0 ? (
      <BarGraph data={data} />
    ) : (
      <></>
    );
  }