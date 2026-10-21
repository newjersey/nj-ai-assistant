import React from 'react';
<<<<<<< HEAD
=======
import { reportBoundaryError } from '~/lib/rum/logs';
>>>>>>> upstream/main

interface MermaidErrorBoundaryProps {
  children: React.ReactNode;
  code: string;
}

interface MermaidErrorBoundaryState {
  hasError: boolean;
}

class MermaidErrorBoundary extends React.Component<
  MermaidErrorBoundaryProps,
  MermaidErrorBoundaryState
> {
  constructor(props: MermaidErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): MermaidErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Mermaid rendering error:', error, errorInfo);
<<<<<<< HEAD
=======
    reportBoundaryError('mermaid', error);
>>>>>>> upstream/main
  }

  componentDidUpdate(prevProps: MermaidErrorBoundaryProps) {
    if (prevProps.code !== this.props.code && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
<<<<<<< HEAD
        <div className="w-full overflow-hidden rounded-md border border-border-light">
          <div className="rounded-t-md bg-surface-secondary px-4 py-2 font-sans text-xs text-text-secondary">
            {'mermaid'}
          </div>
          <pre className="overflow-auto whitespace-pre-wrap rounded-b-md bg-surface-primary-alt p-4 font-mono text-xs text-text-secondary">
=======
        <div className="border-border-light w-full overflow-hidden rounded-md border">
          <div className="bg-surface-secondary text-text-secondary rounded-t-md px-4 py-2 font-sans text-xs">
            {'mermaid'}
          </div>
          <pre className="bg-surface-primary-alt text-text-secondary overflow-auto rounded-b-md p-4 font-mono text-xs whitespace-pre-wrap">
>>>>>>> upstream/main
            {this.props.code}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MermaidErrorBoundary;
