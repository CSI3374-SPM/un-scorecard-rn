import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../store/survey/SurveyReducer";

import GenerateCodeScreen from "./GenerateCodeScreen";

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodeScreen);
