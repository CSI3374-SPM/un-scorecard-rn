import axios from "axios";
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
export const createSurvey = async (
  city_name?: string,
  onFail: (e: any) => void = console.log
) => {
  try {
    const response = await api.get("/api/create/survey", {
      params: {
        city_name: city_name,
      },
    });

    if (!_.isUndefined(response.data) && !_.isNull(response.data)) {
      const surveyId: string = response.data.id;
      return surveyId;
    } else {
      onFail("");
      return null;
    }
  } catch (e) {
    onFail(e);
    return null;
  }
};
