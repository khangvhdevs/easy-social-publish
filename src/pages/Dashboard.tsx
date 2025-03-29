
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, FileImage, BarChart3, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Placeholder stats
  const stats = [
    { label: "Đã đăng thành công", value: 12, icon: FileImage },
    { label: "Tổng lượt tiếp cận", value: "5.2K", icon: BarChart3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Xin chào, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý và đăng bài tự động lên mạng xã hội từ Google Drive
        </p>
      </div>

      {/* Connection status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={`${user?.facebookConnected ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${user?.facebookConnected ? 'text-green-700' : 'text-amber-700'}`}>
              {user?.facebookConnected ? 'Đã kết nối' : 'Chưa kết nối'}
            </p>
            {!user?.facebookConnected && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
                onClick={() => navigate('/settings')}
              >
                Kết nối ngay
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className={`${user?.instagramConnected ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Instagram className="h-5 w-5 mr-2 text-pink-600" />
              Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${user?.instagramConnected ? 'text-green-700' : 'text-amber-700'}`}>
              {user?.instagramConnected ? 'Đã kết nối' : 'Chưa kết nối'}
            </p>
            {!user?.instagramConnected && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
                onClick={() => navigate('/settings')}
              >
                Kết nối ngay
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className={`${user?.googleConnected ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google Drive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm ${user?.googleConnected ? 'text-green-700' : 'text-amber-700'}`}>
              {user?.googleConnected ? 'Đã kết nối' : 'Chưa kết nối'}
            </p>
            {!user?.googleConnected && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-white"
                onClick={() => navigate('/settings')}
              >
                Kết nối ngay
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create post CTA */}
      <Card className="bg-gradient-to-r from-primary to-secondary">
        <CardContent className="p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Tạo bài đăng mới</h3>
            <p className="text-white/80">Đăng ảnh hoặc video từ Google Drive lên mạng xã hội</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-white text-primary hover:bg-white/90" 
            size="lg"
            onClick={() => navigate('/create')}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Tạo bài đăng
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
