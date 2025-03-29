
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  facebookConnected: boolean;
  instagramConnected: boolean;
  googleConnected: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (provider: 'facebook' | 'google') => void;
  logout: () => void;
  connectAccount: (provider: 'facebook' | 'instagram' | 'google') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking for stored authentication
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mock login function - in a real app, this would connect to OAuth endpoints
  const login = (provider: 'facebook' | 'google') => {
    setIsLoading(true);
    
    // Mock successful login
    setTimeout(() => {
      const mockUser: User = {
        id: "user123",
        name: "Demo User",
        email: "demo@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
        facebookConnected: provider === 'facebook',
        instagramConnected: false,
        googleConnected: provider === 'google',
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      
      toast({
        title: "Đăng nhập thành công",
        description: `Đã đăng nhập với ${provider === 'facebook' ? 'Facebook' : 'Google'}`,
      });
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Đã đăng xuất",
      description: "Bạn đã đăng xuất khỏi tài khoản.",
    });
  };

  const connectAccount = (provider: 'facebook' | 'instagram' | 'google') => {
    if (!user) return;

    setIsLoading(true);
    
    // Mock connection
    setTimeout(() => {
      const updatedUser = { ...user };
      
      if (provider === 'facebook') {
        updatedUser.facebookConnected = true;
      } else if (provider === 'instagram') {
        updatedUser.instagramConnected = true;
      } else if (provider === 'google') {
        updatedUser.googleConnected = true;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsLoading(false);
      
      toast({
        title: "Kết nối thành công",
        description: `Đã kết nối với ${
          provider === 'facebook' ? 'Facebook' : 
          provider === 'instagram' ? 'Instagram' : 'Google Drive'
        }`,
      });
    }, 1500);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        connectAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
