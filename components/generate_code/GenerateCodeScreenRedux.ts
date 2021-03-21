import { connect } from "react-redux";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";

import GenerateCodeScreen from "./GenerateCodeScreen";

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodeScreen);
