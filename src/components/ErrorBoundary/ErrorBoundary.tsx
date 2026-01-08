import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import type { AppError } from '~alias~/lib/types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: AppError) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError: AppError = {
      message: error.message,
      code: error.name,
      timestamp: Date.now(),
    };

    // Log error for debugging
    console.error('[ErrorBoundary] Caught an error:', {
      error,
      errorInfo,
      appError,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(appError);
    }

    // Update state with error info
    this.setState({
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-[#2c3e50]">
          <Result
            status="500"
            title="500"
            subTitle="Xin lỗi, đã xảy ra lỗi không mong muốn."
            extra={
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  type="primary" 
                  onClick={this.handleReset}
                  className="bg-[#3498db] hover:bg-[#2980b9]"
                >
                  Thử lại
                </Button>
                <Link to="/">
                  <Button className="bg-[#34495e] hover:bg-[#2c3e50] text-white border-none">
                    Về trang chủ
                  </Button>
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
