import React, { ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from 'utils/types';

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  public render() {
    if (this.state.hasError) {
      console.log('error');
      return <h2>Sorry, something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
