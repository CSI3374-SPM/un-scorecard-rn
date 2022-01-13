import Constants from "expo-constants";
import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import { SurveyResponse } from "../store/survey/SurveyReducer";
import io from "socket.io-client";
import { languageDictionary } from "../languages/LanguageDictionary";

const { manifest } = Constants;

export type QuestionType = {
  id: number;
  number: number;
  text: string;
  category: string;
  options: OptionType[];
};

export type OptionType = {
  text: string;
  score: number;
};

// const apiUrl = process.env.API_URL;
export const apiUrl =
  //typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
  //? `http://${manifest.debuggerHost?.split(`:`).shift()?.concat(`:5001`)}`
  `http://unboxdev.ecs.baylor.edu:5000`;

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

  const options: OptionType[] = await Promise.all(
    data.map((questionData: any[]) => {
      return getQuestionOptions(questionData[0]);
    })
  ).catch((e: Error) => console.log(e));

  if (!_.isNull(data)) {
    return data.map((questionData: any[], index: number) => {
      const question: QuestionType = {
        id: questionData[0],
        number: questionData[1],
        text: questionData[2],
        category: questionData[3],
        options: options[index],
      };
      return question;
    });
  }
  return null;
};

export const getQuestionOptions = async (
  questionId: string,
  onFail: (e: any) => void = console.log
) => {
  const data: OptionType[] = await request(
    {
      method: "GET",
      url: `/api/get/question_options`,
      params: {
        question_id: questionId,
      },
    },
    onFail
  );

  if (!_.isNull(data)) {
    return data;
  }
};

export const addSurveyResponseV2 = async (
  surveyId: string,
  responses: SurveyResponse[],
  userID: string | null,
  onFail: (e: any) => void = console.log
) => {
  let convertedResponses = {};
  console.log("Sending responses");
  responses.map((response) =>
    convertResponse(response, userID, convertedResponses)
  );
  const data = await request(
    {
      method: "POST",
      url: `/api/create/response/${surveyId}`,
      data: {
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
  console.log("data user id ", data);
  return data;
};

const convertResponse = (
  response: SurveyResponse,
  userID: string | null,
  map: any
) => {
  map["user_id"] = userID;
  map["question_id"] = response.id;
  map["score"] = response.score;
  map["justification"] = makeJustification(response.justification);
};

export const fetchSurveyResultsV2 = async (
  surveyId: string,
  questionID: number | null,
  onFail: (e: any) => void = console.log
) => {
  return await request(
    {
      method: "GET",
      url: "/api/get/responses",
      params: {
        survey_id: surveyId,
        question_id: questionID,
      },
    },
    onFail
  );
};

const makeSocket = () => {
  return io(apiUrl, { transports: ["websocket"], timeout: 30000 });
};
const closeSocket = (socket: SocketIOClient.Socket) => {
  console.log("WebSocket connection closing");
  socket.off("connect");
  socket.off("disconnect");
  socket.close();
};

export const closeResultsSocketV2 = (socket: SocketIOClient.Socket) => {
  socket.off("survey_responses_updated");
  closeSocket(socket);
};

export const closeProgressSocketV2 = (socket: SocketIOClient.Socket) => {
  socket.off("survey_progress_updated");
  closeSocket(socket);
};

export const fetchConnectedUsers = (callback: (clients: number) => void) => {
  const socket = makeSocket();
  socket.on("get_clients", (connectedClients: number) => {
    console.log("clients on wrapper: ", connectedClients);
    callback(connectedClients.connections);
  });

  return socket;
};

// @ts-ignore
export const getSurveyLanguages = async (
  surveyType,
  callback,
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "GET",
      url: `api/get/language_options/${surveyType}`,
    },
    onFail
  );
  console.log("Language data: ", data);

  let languages = data.map((language: string) => {
    let currentLanguage = languageDictionary[language];
    return {
      label: currentLanguage.flag + " - " + currentLanguage.name,
      value: language,
    };
  });
  console.log("Setting languages: ", languages);
  callback(languages);
};

// @ts-ignore
export const getSurveyOptions = async (
  callback,
  onFail: (e: any) => void = console.log
) => {
  const data = await request(
    {
      method: "GET",
      url: "api/get/options/",
    },
    onFail
  );
  let options = data.map((option: string) => {
    return { label: option, value: option };
  });
  callback(options);
};

export const fetchSurveyResultsStreamV2 = (
  surveyId: string,
  callback: (results: SurveyResponse[] | null) => void,
  onFail: (socket: SocketIOClient.Socket) => void = closeResultsSocketV2
) => {
  const socket = makeSocket();
  socket.on("connect", () => {
    console.log("connected to responses");
    socket.emit("survey_responses_subscribe", {
      surveyId,
    });
  });

  socket.on("survey_responses_updated", (rawData: any) => {
    if (!_.isNull(rawData)) {
      const rawResponses: any[] = rawData.Data;
      if (rawData.status === "ERROR" || _.isUndefined(rawResponses)) {
        socket.emit("survey_responses_unsubscribe", { surveyId });
        onFail(socket);
      }
      console.log("Raw data ", rawResponses);
      const results = rawResponses.map((rawResults) => {
        const response: SurveyResponse = {
          userId: rawResults["user_id"],
          id: rawResults["question_id"],
          score: rawResults["score"],
          justification: rawResults["justification"],
          questionNumber: rawResults["question_num"],
        };

        return response;
      });
      callback(results);
    }
  });
  return socket;
};

export const getSurveyProgressV2 = async (
  surveyId: string,
  onFail: (e: any) => void = console.log
): Promise<SurveyProgressResponse | null> => {
  const data = await request(
    {
      method: "GET",
      url: `api/survey/${surveyId}/progress`,
      headers: { Accept: "appliaction/json" },
    },
    onFail
  );

  if (_.isNull(data) || data.status !== "OK") {
    onFail("Failed to get survey progress");
    return null;
  }
  return {
    status: data.status,
    currentQuestion: data.currentQuestion,
    surveyId: data.survey_id,
  };
};

export const getSurveyProgressStreamV2 = (
  surveyId: string,
  callback: (currentProgress: number) => void,
  onFail: (socket: SocketIOClient.Socket) => void = closeProgressSocketV2
) => {
  const socket = makeSocket();
  socket.on("connect", () => {
    console.log("progress socket connected");
    socket.emit("survey_progress_subscribe", {
      surveyId,
    });
  });

  socket.on("survey_progress_updated", (rawData: any) => {
    console.log("Got progress update");
    if (_.isNull(rawData) || rawData.status !== "OK") {
      socket.emit("survey_progress_unsubscribe", {
        surveyId,
      });
      onFail(socket);
    }
    let data: SurveyProgressResponse = {
      status: rawData.status,
      currentQuestion: rawData.currentQuestion,
      surveyId: rawData.survey_id,
    };

    if (!_.isUndefined(data.currentQuestion)) {
      console.log("Current question in wrapper: ", data.currentQuestion);
      callback(data.currentQuestion);
    }
  });
  return socket;
};

export const updateSurveyProgressV2 = async (
  surveyId: string,
  currentQuestion: number,
  onFail: (e: any) => void = console.log
): Promise<SurveyProgressResponse | null> => {
  console.log("Updating survey progress ", currentQuestion);
  const data = await request(
    {
      method: "POST",
      url: `api/survey/${surveyId}/progress/update`,
      data: {
        currentQuestion,
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    onFail
  );

  if (_.isNull(data) || data.status !== "OK") {
    onFail("Failed to update survey progress");
    return null;
  }
  return {
    status: data.status,
    currentQuestion: data.currentQuestion,
    surveyId: data.survey_id,
  };
};

export type SurveyProgressResponse = ApiResponse & {
  currentQuestion?: number;
  surveyId?: string;
};
const makeJustification = (justification?: string | null) => {
  return _.isUndefined(justification) || _.isNull(justification)
    ? "No response given"
    : justification;
};
