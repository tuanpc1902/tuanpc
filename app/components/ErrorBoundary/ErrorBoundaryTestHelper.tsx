/**
 * Helper component để test ErrorBoundary trong development
 * Sử dụng component này để trigger errors và test ErrorBoundary behavior
 */

'use client';
import { useState } from 'react';
import { Button, Card, Space, Divider } from 'antd';
import Link from 'next/link';
import ErrorBoundary from './ErrorBoundary';

// Component sẽ throw error khi shouldError = true
const ErrorComponent = ({ shouldError, errorType = 'render' }: { shouldError: boolean; errorType?: string }) => {
  if (shouldError) {
    if (errorType === 'render') {
      throw new Error('Test error: Render error from ErrorBoundaryTestHelper');
    } else if (errorType === 'type') {
      // @ts-ignore - Intentional type error for testing
      const invalid: string = 123;
      return <div>{invalid.toUpperCase()}</div>;
    }
  }
  return (
    <div className="p-4 text-green-500 border border-green-300 rounded bg-green-50">
      ✅ No error - Component working correctly
    </div>
  );
};

// Component với custom fallback
const ComponentWithCustomFallback = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('Error with custom fallback');
  }
  return <div className="p-4 text-blue-500">Component with custom fallback</div>;
};

/**
 * Test Helper Component
 * Sử dụng trong development để test ErrorBoundary
 * 
 * Truy cập: /test-error-boundary
 */
export default function ErrorBoundaryTestHelper() {
  const [shouldError1, setShouldError1] = useState(false);
  const [shouldError2, setShouldError2] = useState(false);
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);

  const reset1 = () => {
    setKey1(prev => prev + 1);
    setShouldError1(false);
  };

  const reset2 = () => {
    setKey2(prev => prev + 1);
    setShouldError2(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ErrorBoundary Test Helper</h1>
        <p className="text-gray-600">Test ErrorBoundary component trong browser</p>
        <Link href="/" className="text-blue-500 hover:underline">
          ← Về trang chủ
        </Link>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        {/* Test 1: Basic ErrorBoundary */}
        <Card title="Test 1: Basic ErrorBoundary" className="w-full">
          <Space direction="vertical" className="w-full">
            <div>
              <Button 
                type="primary" 
                danger 
                onClick={() => setShouldError1(true)}
                disabled={shouldError1}
              >
                Trigger Error
              </Button>
              <Button onClick={reset1} className="ml-2">
                Reset Component
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 p-4 rounded min-h-[100px]">
              <ErrorBoundary>
                <ErrorComponent key={key1} shouldError={shouldError1} />
              </ErrorBoundary>
            </div>
          </Space>
        </Card>

        {/* Test 2: ErrorBoundary với Custom Fallback */}
        <Card title="Test 2: ErrorBoundary với Custom Fallback" className="w-full">
          <Space direction="vertical" className="w-full">
            <div>
              <Button 
                type="primary" 
                danger 
                onClick={() => setShouldError2(true)}
                disabled={shouldError2}
              >
                Trigger Error với Custom Fallback
              </Button>
              <Button onClick={reset2} className="ml-2">
                Reset Component
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 p-4 rounded min-h-[100px]">
              <ErrorBoundary 
                fallback={
                  <div className="p-4 text-orange-500 border border-orange-300 rounded bg-orange-50">
                    🎨 Custom Fallback UI - Error đã được bắt!
                  </div>
                }
              >
                <ComponentWithCustomFallback key={key2} shouldError={shouldError2} />
              </ErrorBoundary>
            </div>
          </Space>
        </Card>

        {/* Instructions */}
        <Card title="📖 Hướng dẫn sử dụng" className="w-full">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>`Trigger Error`</strong> để xem ErrorBoundary bắt lỗi và hiển thị error UI
            </li>
            <li>
              <strong>`Thử lại`</strong> trong error UI để reset error state (chỉ reset state, không remount)
            </li>
            <li>
              <strong>`Reset Component`</strong> để remount component hoàn toàn
            </li>
            <li>
              <strong>`Test Custom Fallback`</strong> để xem cách hiển thị custom error UI
            </li>
          </ol>
          
          <Divider />
          
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Lưu ý:</h3>
            <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
              <li>ErrorBoundary chỉ bắt được errors trong render methods</li>
              <li>ErrorBoundary KHÔNG bắt được errors trong event handlers (cần try-catch)</li>
              <li>ErrorBoundary KHÔNG bắt được async errors (setTimeout, promises)</li>
            </ul>
          </div>
        </Card>
      </Space>
    </div>
  );
}

