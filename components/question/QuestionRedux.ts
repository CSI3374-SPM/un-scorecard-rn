import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../store/survey/SurveyReducer";

import Question from "./Question";

export default connect(mapStateToProps, mapDispatchToProps)(Question);
