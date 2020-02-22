import { ErrorInfo, ReactNode, Component } from 'react';

type ErrorBoundaryProps = {
  /**
   * onError accepts an Error object and an ErrorInfo object for additional
   * operations, e.g. clean up, graceful navigation, error reporting to a remote
   * server, etc.
   */
  onError: (error: Error, info: ErrorInfo) => void;
  /** component will be rendered when an expection is caught. */
  component: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * ErrorBoundary renders an error page component if any descendant component
 * throws an exception. Otherwise, it renders the children.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public readonly state: Readonly<ErrorBoundaryState> = {
    hasError: false,
  };

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    this.props.onError(error, info);
  }

  public render() {
    const { component, children } = this.props;

    return this.state.hasError ? component : children;
  }
}

export default ErrorBoundary;
