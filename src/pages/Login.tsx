
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState<'facebook' | 'google' | null>(null);

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const handleLogin = (provider: 'facebook' | 'google') => {
    setLoggingIn(provider);
    login(provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-primary">EasySocial</CardTitle>
          <CardDescription className="text-lg">
            Đăng bài tự động lên Facebook và Instagram
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-muted-foreground">Đăng nhập để bắt đầu</p>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-lg h-14"
            onClick={() => handleLogin('facebook')}
            disabled={isLoading || !!loggingIn}
          >
            {loggingIn === 'facebook' ? (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Facebook className="mr-2 h-5 w-5 text-blue-600" />
            )}
            Đăng nhập với Facebook
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center text-lg h-14"
            onClick={() => handleLogin('google')}
            disabled={isLoading || !!loggingIn}
          >
            {loggingIn === 'google' ? (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <div className="mr-2 h-5 w-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
            )}
            Đăng nhập với Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Ứng dụng này kết nối với Facebook, Instagram, và Google Drive để đăng bài tự động.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
