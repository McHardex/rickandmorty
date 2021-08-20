import { Component, ErrorInfo, ReactNode } from "react";
import { Box, IconButton, Typography } from "@material-ui/core";
import { Restore as RestoreIcon } from "@material-ui/icons";
import snapTheMoment from "../images/snapTheMoment.svg";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent=" center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h4">SNAP THE MOMENT</Typography>
          <IconButton onClick={() => window.location.reload()} title="Restore">
            <RestoreIcon style={{ fontSize: "80px" }} />
          </IconButton>
          <img
            src={snapTheMoment}
            alt="an error occurred"
            style={{ width: "50%" }}
          />
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
