import React, { Component, ErrorInfo, ReactNode } from 'react';
import './error.scss';

interface Props {
    children: ReactNode;
    message: string;
    fallback: any;
    buttonText: string;
    onRetry: () => void;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false });
        if (this.props.onRetry) {
            this.props.onRetry();
        } else {
            window.location.reload();
        }
    };

    render() {
        const { hasError } = this.state;
        const { children, message, fallback, buttonText } = this.props;

        if (hasError) {
            return (
                <div className="error-container">
                    {fallback ? fallback
                        :
                        <>
                            <img src='https://cdn-icons-png.flaticon.com/512/564/564619.png' alt={"imgaes-"} />
                            <h1>{message || "Oops! Something went wrong"}.</h1>
                            <p>We're working to fix the issue. Please try again or return to the home screen.</p>
                            <button onClick={this.handleRetry}>{buttonText || 'Try Again'}</button>
                        </>
                    }
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
