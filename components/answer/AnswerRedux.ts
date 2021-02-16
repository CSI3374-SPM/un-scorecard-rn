import { connect } from "react-redux";

import Answer from "./Answer";
import mapDispatchToProps from "../question/QuestionD2P";

export function mapStateToProps(state: any, myProps: any) {
  return {
    data: state.answer.data,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
