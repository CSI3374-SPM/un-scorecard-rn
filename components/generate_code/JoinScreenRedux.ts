import { connect } from "react-redux";

import JoinScreen from "./JoinScreen";
import mapDispatchToProps from "./JoinScreenD2P";

export function mapStateToProps(state: any, myProps: any) {
    return {
        data: state.id.data,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinScreen);
