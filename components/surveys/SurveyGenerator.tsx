import { generateWHOSurvey, Survey } from "./Survey";
import { generateUSDASurvey } from "./USDASurvey";

export const newSurvey = (
  surveyLanguage: string,
  surveyType: string
): Survey => {
  if (surveyType == "who") {
    return generateWHOSurvey(surveyLanguage);
  } else if(surveyType == "usda"){
      return generateUSDASurvey();
  } else{
    return generateWHOSurvey("eng");
  }
};
