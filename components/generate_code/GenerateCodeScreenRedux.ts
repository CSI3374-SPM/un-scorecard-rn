import { connect } from "react-redux";
import mapDispatchToProps from "../question/QuestionD2P";
import { mapStateToProps } from "../question/QuestionRedux";

import GenerateCodeScreen from "./GenerateCodeScreen";
// import mapDispatchToProps from "./GenerateCodeScreenD2P";

// export function mapStateToProps(state: any, myProps: any) {
//     return {
//         data: state.authentication.data,
//     };
// }

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodeScreen);
