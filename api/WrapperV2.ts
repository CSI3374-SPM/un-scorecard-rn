import Constants from "expo-constants";
const { manifest } = Constants;
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import Question from "../components/question/QuestionRedux";
export type Question = {
  number: number;
  text: string;
  category: string;
};
// const apiUrl = process.env.API_URL;
export const apiUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost?.split(`:`).shift()?.concat(`:5000`)}`
    : `http://unboxdev.ecs.baylor.edu:5000`;

const api = axios.create({
  baseURL: apiUrl,
});

const request = async (
  config: AxiosRequestConfig,
  onFail: (e: any) => void = console.log
) => {
  try {
    const response = await api.request(config);
    if (!_.isUndefined(response.data)) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    onFail(e);
    return null;
  }
};

export interface ApiResponse {
  status: "OK" | "ERROR";
}

export type CreateSurveyResponse = ApiResponse & {
  id: string;
  city: string;
  type: string;
  language: string;
};

export const createSurveyV2 = async (
  surveyLanguage: string,
  surveyType: string,
  cityName?: string,

  onFail: (e: any) => void = console.log
) => {
  console.log(
    "language: ",
    surveyLanguage,
    " type: ",
    surveyType,
    " city: ",
    cityName
  );
  console.log("set survey language to: ", surveyLanguage);
  const data: CreateSurveyResponse = await request(
    {
      method: "GET",
      url: "/api/create/survey/",
      // TODO: Update parameters to match database
      params: {
        city_name: cityName,
        survey_language: surveyLanguage,
        survey_type: surveyType,
      },
    },
    onFail
  );
  if (!_.isNull(data)) {
    return data;
  }
  return null;
};

export const getQuestions = async (
  surveyID: string,
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "GET",
      url: "/api/get/questions",
      params: {
        survey_id: surveyID,
      },
    },
    onFail
  );

  if (!_.isNull(data)) {
    console.log("Data from fetch survey: ", data);
    const questions = data.map((questionData: any[]) => {
      const question: Question = {
        number: questionData[0],
        text: questionData[1],
        category: questionData[2],
      };
      return question;
    });
    console.log("question 1 number: ", questions[0].number);
    console.log("question 1 text: ", questions[0].text);
    console.log("question 1 category: ", questions[0].category);
    console.log("question 2 number: ", questions[1].number);
    console.log("question 2 text: ", questions[1].text);
    console.log("question 2 category: ", questions[1].category);
    return questions;
  }
  return null;
};
