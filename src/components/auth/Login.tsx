import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '~alias~/contexts/AuthContext';
import { useLanguageContext } from '~alias~/contexts/LanguageContext';
import './Login.styles.scss';

function Login() {
  const { signIn, signInWithGoogle, isAuthenticated, loading: authLoading } = useAuth();
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

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await signIn(values.email, values.password);
      message.success(language === 'vi' ? 'Đăng nhập thành công!' : 'Login successful!');
      // Redirect will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error: unknown) {
      const errorMessage =
        language === 'vi'
          ? 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.'
          : 'Login failed. Please check your email and password.';
      message.error(errorMessage);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            {language === 'vi' ? 'Đăng nhập Admin' : 'Admin Login'}
          </h1>
          <p className="login-subtitle">
            {language === 'vi'
              ? 'Vui lòng đăng nhập để truy cập Admin Panel'
              : 'Please login to access Admin Panel'}
          </p>
        </div>

        <Form
          name="login"
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
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={language === 'vi' ? 'Mật khẩu' : 'Password'}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {language === 'vi' ? 'Đăng nhập' : 'Login'}
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
            {language === 'vi' ? 'Chưa có tài khoản? ' : "Don't have an account? "}
          </span>
          <Link
            to="/admin/signup"
            style={{ color: 'var(--primary)', fontWeight: 500 }}
          >
            {language === 'vi' ? 'Đăng ký' : 'Sign Up'}
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;