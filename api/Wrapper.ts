import Constants from "expo-constants";
const { manifest } = Constants;
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import Question from "../components/question/Question";

// const apiUrl = process.env.API_URL;
const apiUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost?.split(`:`).shift()?.concat(`:5000`)}`
    : `https://unbox.ecs.baylor.edu:5000`;

const api = axios.create({
  baseURL: apiUrl,
});

export type Question = {
  question: string;
  justification: string;
};

const makeQuestion = (q: string, j: string): Question => {
  return {
    question: q,
    justification: j,
  };
};

export const questions = [
  makeQuestion(
    "A1.1 To what extent does/do the governance mechanism(s) for disaster risk management integrate the full breadth of public health considerations?",
    "Option: please provide justification for answer A1.1"
  ),
  makeQuestion(
    "A2.1 To what extent are emergencies and disasters including disease outbreaks are included in disaster risk planning? ",
    "Option: please provide justification for answer A2.1"
  ),
  makeQuestion(
    "A2.2 To what extent are public health impacts included in the city's scenario planning for other disaster risks? ",
    "Option: please provide justification for answer A2.2"
  ),
  makeQuestion(
    "A2.3 To what extent are pre-existing chronic health issues included in scenarios where disasters are likely to exacerbate these, or where they are likely to impede recovery? ",
    "Option: please provide justification for answer A2.3"
  ),
  makeQuestion(
    "A3.1 To what extent is funding identified and available to address public health risks and impacts of disasters? ",
    "Option: please provide justification for answer A3.1"
  ),
  makeQuestion(
    "A4.1 To what extent are key health facilities located and built in a manner that will allow them to continue to be operational after a disaster? ",
    "Option:  please provide justification for answer A4.1"
  ),
  makeQuestion(
    "A5.1 To what extent are ecosystem services that provide public health benefits identified and protected? ",
    "Option: please provide justification for answer A5.1"
  ),
  makeQuestion(
    "A6.1 To what extent are the workforce, competencies and skills required to plan and maintain public health systems and services for disaster resilience available to the city? ",
    "Option: please provide justification for answer A6.1"
  ),
  makeQuestion(
    "A6.2 To what extent is public health data on health vulnerabilities and capacities, as well as risks and early warning of outbreaks shared with other stakeholders who need it? ",
    "Option: please provide justification for answer A6.2"
  ),
  makeQuestion(
    "A6.2.1 To what extent is data from other critical systems shared with public health system stakeholders who need it? ",
    "Option: please provide justification for answer A6.2.1"
  ),
  makeQuestion(
    "A6.2.2 To what extent are individuals' health and prescription records protected from a disaster, and accessible in the aftermath of a disaster? ",
    "Option: please provide justification for answer A6.2.2"
  ),
  makeQuestion(
    "A7.1 To what extent do communities understand and are able to fulfil their roles in maintaining public health and well-being levels before, during and after a disaster? ",
    "Option: please provide justification for answer A7.1"
  ),
  makeQuestion(
    "A7.1.2 To what extent do communities receive, respect and are willing to act upon public health information? ",
    "Option: please provide justification for answer A7.1.2"
  ),
  makeQuestion(
    "A7.2 To what extent are communities' mental health needs addressed? ",
    "Option: please provide justification for answer A7.2"
  ),
  makeQuestion(
    "A8.1 To what extent is public health infrastructure (besides hospitals) resilient?",
    "Option: please provide justification for answer A8.1"
  ),
  makeQuestion(
    "A8.2 To what extent are hospitals and emergency care centers able to manage a sudden influx of patients? ",
    "Option: please provide justification for answer A8.2"
  ),
  makeQuestion(
    "A8.3 To what extent can care be maintained for those who are already sick or dependent?",
    "Option: please provide justification for answer A8.3"
  ),
  makeQuestion(
    "A9.1 To what extent do early warning systems exist for impending emergencies that have potential health effects?",
    "Option: please provide justification for answer A9.1"
  ),
  makeQuestion(
    "A9.2 To what extent are public health sector and professionals integrated with the emergency management team? ",
    "Option: please provide justification for answer A9.2"
  ),
  makeQuestion(
    "A9.3 To what extent are the needs of higher risk populations considered, such as citizens with preexisting medical conditions, disabilities or loss of function that may mean that they require additional support? ",
    "Option: please provide justification for answer A9.3"
  ),
  makeQuestion(
    "A9.4 To what extent can the city supply items and equipment required to maintain public health during and after a disaster. ",
    "Option: please provide justification for answer A9.4"
  ),
  makeQuestion(
    "A10.1 To what extent do comprehensive post event public health plans exist?",
    "Option: please provide justification for answer A10.1"
  ),
  makeQuestion(
    "A10.2 To what extent do formalized mechanism to learn from performance of public health system before, during and after disasters exist?",
    "Option: please provide justification for answer A10.2"
  ),
];

const makeJustification = (justification?: string | null) => {
  return _.isUndefined(justification) || _.isNull(justification)
    ? "No response given"
    : justification;
};

/**
 * Send a request to the API with the given configuration
 *
 * @param config The request configuration
 * @param onFail A callback to do any desired error handling
 */
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
};

/**
 * Create a survey and return the survey ID.
 *
 * @param city_name The name of the city to create the survey for
 * @param onFail A callback to do any desired error handling
 */
export const createSurvey = async (
  cityName?: string,
  onFail: (e: any) => void = console.log
) => {
  const data: CreateSurveyResponse = await request(
    {
      method: "GET",
      url: "/api/create/survey",
      params: {
        city_name: cityName,
      },
    },
    onFail
  );
  if (!_.isNull(data)) {
    return data;
  }
  return null;
};

/**
 * Fetch the results of a survey.
 *
 * @param surveyId The survey's ID we are getting results from
 * @param onFail A callback to do any desired error handling
 */
export const fetchSurveyResults = async (
  surveyId: string,
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "GET",
      url: "/api/get/responses",
      params: {
        survey_id: surveyId,
      },
    },
    onFail
  );
  if (!_.isNull(data)) {
    const rawResponses: any[] = data.Data;

    const results = rawResponses.map((rawResults) => {
      return Object.keys(rawResults)
        .map((key) => {
          // Find the question with the right key in the questions
          const question = questions.find(
            (question) => question.question === key
          );
          if (_.isUndefined(question)) {
            return null;
          }

          // Get the question string (e.g. 'A.1.1') and find the
          // corresponding justification key in the raw results
          let qNum = question.question.split(" ")[0];
          const justificationKey = Object.keys(rawResults).find(
            (justification) =>
              justification.startsWith("Option:") &&
              justification.endsWith(qNum)
          );
          if (_.isUndefined(justificationKey)) {
            return null;
          }

          // Get the justification and score
          const justification: string = rawResults[justificationKey];
          const score: number = parseInt(rawResults[key]);

          const index = questions.indexOf(question);
          const response: SurveyResponse = {
            questionIndex: index,
            score,
            justification:
              justification === "No response given" ? undefined : justification,
          };
          return response;
        })
        .filter((response): response is SurveyResponse => !_.isNull(response));
    });

    return results;
  }
  return null;
};

export type SurveyResponse = {
  questionIndex: number;
  score: number;
  justification?: string;
};

/**
 * Submit all the answers to a survey.
 *
 * @param surveyId The survey's ID we are getting results from
 * @param responses The question responses
 * @param responseId The response ID from the previous response addition request.
 * @param onFail A callback to do any desired error handling
 */
export const addSurveyResponse = async (
  surveyId: string,
  responses: SurveyResponse[],
  responseId: string | null,
  onFail: (e: any) => void = console.log
) => {
  let convertedResponses = {};
  responses.map((r) => convertResponse(r, convertedResponses));
  const data = await request(
    {
      method: "POST",
      url: `/api/create/response/${surveyId}`,
      data: {
        response_id: responseId,
        ...convertedResponses,
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
    onFail
  );
  if (_.isNull(data) || data.status !== "OK") {
    onFail("Survey response creation failed");
    return null;
  }

  // Return the response ID from the endpoint so that
  // subsequent requests can take advantage of it
  // for grouping answers.
  const newResponseId: string = data.responseId;
  return newResponseId;
};

const convertResponse = (response: SurveyResponse, map: any) => {
  const question = questions[response.questionIndex];
  map[question.question] = response.score;
  map[question.justification] = makeJustification(response.justification);
};
