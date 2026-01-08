import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Result
            status="500"
            title="500"
            subTitle="Xin lỗi, đã xảy ra lỗi không mong muốn."
            extra={
              <div className="flex gap-4 justify-center">
                <Button type="primary" onClick={this.handleReset}>
                  Thử lại
                </Button>
                <Link to="/">
                  <Button>Về trang chủ</Button>
                </Link>
              </div>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
