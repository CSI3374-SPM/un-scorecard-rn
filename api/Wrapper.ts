import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";

const apiUrl = process.env.API_URL;
const api = axios.create({
  baseURL: apiUrl,
});

/**
 * Create a survey and return the survey ID.
 *
 * @param city_name The name of the city to create the survey for
 * @param onFail A callback to do any desired error handling
 */
export const request = async (
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
  city_name?: string,
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "GET",
      url: "/api/create/survey",
      params: {
        city_name: city_name,
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
