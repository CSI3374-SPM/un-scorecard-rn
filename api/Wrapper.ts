import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

const apiUrl = process.env.API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

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
  const data = await request(
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
    const surveyId: string = data.id;
    return surveyId;
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
    // todo: Specify the type of the results array
    const results: any[] = data.Data;
    return results;
  }
  return null;
};

/**
 * Submit all the answers to a survey.
 *
 * @param surveyId The survey's ID we are getting results from
 * @param responses The question responses
 * @param onFail A callback to do any desired error handling
 */
export const createSurveyResponse = async (
  surveyId: string,
  responses: any[], // TODO: specify the responses type.  
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "POST",
      url: `/api/create/response/${surveyId}`,
      data: responses,
      headers: {
        "Content-Type": "application/json"
      }
    },
    onFail
  );
  if (!_.isNull(data) && data.status !== "OK") {
    onFail("Survey response creation failed");
  }
};