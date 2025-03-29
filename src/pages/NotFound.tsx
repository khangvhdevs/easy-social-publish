
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Không tìm thấy trang bạn yêu cầu
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/")}
          className="mx-auto"
        >
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
