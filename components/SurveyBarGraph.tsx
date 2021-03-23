import React, { useState, useEffect } from "react";
import { SurveyResponse } from "../store/survey/SurveyReducer";
import BarGraph, { Memo } from "./BarGraph";
import _ from "lodash";
import { questions } from "../api/Wrapper";

interface Props {
    surveyData: SurveyResponse[][] | null;
}

//TODO: calculate running total for each score per question
const QuestionNum = (data: SurveyResponse[][], ndx: number) => {
    let total = 0;
    let numResp = 0;
    data.forEach((responder) => {
      const response = responder.find(
        (question) => question.questionIndex === ndx
      );
      if (!_.isUndefined(response)) {
        total += response.score;
        numResp++;
      }
    });
    return total / numResp;
  };