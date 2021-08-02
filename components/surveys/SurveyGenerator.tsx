import { generateWHOSurvey, Survey } from "./Survey";
import { generateUSDASurvey } from "./Survey";

export const newSurvey = (
  surveyLanguage: string,
  surveyType: string
): Survey => {
  if (surveyType == "who") {
    return generateWHOSurvey(surveyLanguage);
  } else if (surveyType == "usda") {
    console.log("Generating USDA Survey");
    return generateUSDASurvey();
  } else {
    return generateWHOSurvey("eng");
  }
};
