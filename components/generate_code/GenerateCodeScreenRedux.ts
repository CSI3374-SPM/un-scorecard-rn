import { connect } from "react-redux";

import GenerateCodeScreen from "./GenerateCodeScreen";
import mapDispatchToProps from "./GenerateCodeScreenD2P";

export function mapStateToProps(state: any, myProps: any) {
    return {
        data: state.authentication.data,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCodeScreen);
