
import { useState } from "react";
import { Check, X, ExternalLink, Clock, Facebook, Instagram } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post } from "@/models/types";

const PostHistory = () => {
  const [filter, setFilter] = useState<"all" | "published" | "failed">("all");
  
  // Mock posts data
  const mockPosts: Post[] = [
    {
      id: "post1",
      caption: "Sản phẩm mới đã có mặt tại cửa hàng!",
      mediaUrls: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"],
      mediaType: "image",
      platforms: ["facebook", "instagram"],
      status: "published",
      createdAt: "2023-09-15T10:30:00Z",
      publishedAt: "2023-09-15T10:31:00Z"
    },
    {
      id: "post2",
      caption: "Đội ngũ phát triển sản phẩm",
      mediaUrls: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
      mediaType: "image",
      platforms: ["facebook"],
      status: "published",
      createdAt: "2023-09-10T14:20:00Z",
      publishedAt: "2023-09-10T14:21:00Z"
    },
    {
      id: "post3",
      caption: "Video hướng dẫn sử dụng",
      mediaUrls: ["https://example.com/video.mp4"],
      mediaType: "video",
      platforms: ["instagram"],
      status: "failed",
      errorMessage: "Không có quyền truy cập API",
      createdAt: "2023-09-05T09:15:00Z",
    }
  ];
  
  const filteredPosts = mockPosts.filter(post => {
    if (filter === "all") return true;
    return post.status === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lịch sử đăng bài</h1>
          <p className="text-muted-foreground mt-1">
            Xem trạng thái các bài đăng của bạn
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Select value={filter} onValueChange={(value: "all" | "published" | "failed") => setFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="published">Đã đăng</SelectItem>
              <SelectItem value="failed">Lỗi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Danh sách bài đăng</CardTitle>
          <CardDescription>
            Tất cả: {mockPosts.length} | Đã đăng: {mockPosts.filter(p => p.status === "published").length} | Lỗi: {mockPosts.filter(p => p.status === "failed").length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Nền tảng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          {post.mediaType === "image" ? (
                            <img 
                              src={post.mediaUrls[0]} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <video className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="truncate max-w-[200px]">{post.caption}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.mediaType === "image" ? "Ảnh" : "Video"} • {post.mediaUrls.length} file
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {post.platforms.includes("facebook") && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Facebook className="h-3 w-3 mr-1" />
                            Facebook
                          </Badge>
                        )}
                        {post.platforms.includes("instagram") && (
                          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                            <Instagram className="h-3 w-3 mr-1" />
                            Instagram
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {post.status === "published" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Check className="h-3 w-3 mr-1" />
                          Thành công
                        </Badge>
                      ) : post.status === "failed" ? (
                        <Badge variant="destructive">
                          <X className="h-3 w-3 mr-1" />
                          Lỗi
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Đang xử lý
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {post.publishedAt ? (
                          <div>
                            <p className="text-xs text-muted-foreground">Đã đăng</p>
                            <p>{formatDate(post.publishedAt)}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs text-muted-foreground">Đã tạo</p>
                            <p>{formatDate(post.createdAt)}</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground">Không có bài đăng nào</p>
              <Button variant="link" className="mt-2" asChild>
                <a href="/create">Tạo bài đăng mới</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostHistory;
