import React from "react";
import { Button } from "react-native-paper";

import { authenticationProps } from "../generate_code/GenerateCodeScreen";
import { connect } from "react-redux";
import { mapStateToProps } from "../generate_code/GenerateCodeScreenRedux";
import mapDispatchToProps from "../generate_code/GenerateCodeScreenD2P";

function FinishButton(props: authenticationProps) {
  return (
    <Button
      mode="contained"
      onPress={() => {
        props.updateAuthentication({ isOrganizer: false, id: "" });
      }}
    >
      Finish Survey
    </Button>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishButton);
