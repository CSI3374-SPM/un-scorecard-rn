import { connect } from "react-redux";

import Counter from "./Counter";
import mapDispatchToProps from "./CounterD2P";

export function mapStateToProps(state: any, myProps: any) {
  return {
    data: state.example.data,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
