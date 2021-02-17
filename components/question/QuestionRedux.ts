import { connect } from "react-redux";

import Question from "./Question";
import mapDispatchToProps from "./QuestionD2P";

export function mapStateToProps(state: any, myProps: any) {
  return {
    data: state.answer.data,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
