import { connect } from "react-redux";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "../../store/survey/SurveyReducer";

import Answer from "./Answer";

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
