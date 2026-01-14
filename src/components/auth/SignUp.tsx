import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '~alias~/contexts/AuthContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import './Login.styles.scss';

function SignUp() {
  const { signUp, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguageContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Redirect to admin page if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, location.state]);

  const onFinish = async (values: { email: string; password: string; confirmPassword: string }) => {
    try {
      setLoading(true);

      // Validate password match
      if (values.password !== values.confirmPassword) {
        message.error(
          language === 'vi'
            ? 'Mật khẩu xác nhận không khớp!'
            : 'Passwords do not match!'
        );
        setLoading(false);
        return;
      }

      // Validate password strength
      if (values.password.length < 6) {
        message.error(
          language === 'vi'
            ? 'Mật khẩu phải có ít nhất 6 ký tự!'
            : 'Password must be at least 6 characters!'
        );
        setLoading(false);
        return;
      }

      await signUp(values.email, values.password);
      message.success(
        language === 'vi'
          ? 'Đăng ký thành công! Đang chuyển hướng...'
          : 'Sign up successful! Redirecting...'
      );
      // Redirect will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error: unknown) {
      let errorMessage =
        language === 'vi'
          ? 'Đăng ký thất bại. Vui lòng thử lại.'
          : 'Sign up failed. Please try again.';

      // Handle specific Firebase errors
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage =
          language === 'vi'
            ? 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc sử dụng email khác.'
            : 'This email is already in use. Please sign in or use a different email.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage =
          language === 'vi'
            ? 'Email không hợp lệ!'
            : 'Invalid email address!';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage =
          language === 'vi'
            ? 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.'
            : 'Password is too weak. Please use a stronger password.';
      }

      message.error(errorMessage);
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      message.success(language === 'vi' ? 'Đăng nhập thành công!' : 'Login successful!');
      // Redirect will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error: unknown) {
      const errorMessage =
        language === 'vi'
          ? 'Đăng nhập với Google thất bại.'
          : 'Google sign in failed.';
      message.error(errorMessage);
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            {language === 'vi' ? 'Đăng ký Admin' : 'Admin Sign Up'}
          </h1>
          <p className="login-subtitle">
            {language === 'vi'
              ? 'Tạo tài khoản mới để truy cập Admin Panel'
              : 'Create a new account to access Admin Panel'}
          </p>
        </div>

        <Form
          name="signup"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: language === 'vi' ? 'Vui lòng nhập email!' : 'Please input your email!' },
              { type: 'email', message: language === 'vi' ? 'Email không hợp lệ!' : 'Invalid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={language === 'vi' ? 'Email' : 'Email'}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: language === 'vi' ? 'Vui lòng nhập mật khẩu!' : 'Please input your password!' },
              { min: 6, message: language === 'vi' ? 'Mật khẩu phải có ít nhất 6 ký tự!' : 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={language === 'vi' ? 'Mật khẩu' : 'Password'}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: language === 'vi' ? 'Vui lòng xác nhận mật khẩu!' : 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(language === 'vi' ? 'Mật khẩu xác nhận không khớp!' : 'Passwords do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={language === 'vi' ? 'Xác nhận mật khẩu' : 'Confirm Password'}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {language === 'vi' ? 'Đăng ký' : 'Sign Up'}
            </Button>
          </Form.Item>
        </Form>

        <Divider>{language === 'vi' ? 'Hoặc' : 'Or'}</Divider>

        <Button
          type="default"
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
          loading={loading}
          block
          size="large"
        >
          {language === 'vi' ? 'Đăng nhập với Google' : 'Sign in with Google'}
        </Button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            {language === 'vi' ? 'Đã có tài khoản? ' : 'Already have an account? '}
          </span>
          <Link
            to="/admin/login"
            style={{ color: 'var(--primary)', fontWeight: 500 }}
          >
            {language === 'vi' ? 'Đăng nhập' : 'Sign In'}
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
