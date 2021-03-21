import { connect } from "react-redux";

import Answer from "./Answer";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
