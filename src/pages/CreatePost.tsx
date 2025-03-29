
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Upload, X, FileImage, Film, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { MediaFile } from "@/models/types";

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [caption, setCaption] = useState("");
  const [selectedTab, setSelectedTab] = useState("image");
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);
  const [platforms, setPlatforms] = useState<{facebook: boolean, instagram: boolean}>({
    facebook: true,
    instagram: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock media files
  const mockImageFiles: MediaFile[] = [
    {
      id: "img1",
      name: "product-photo.jpg",
      mimeType: "image/jpeg",
      thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      size: 1024000,
      type: "image"
    },
    {
      id: "img2",
      name: "team-photo.jpg",
      mimeType: "image/jpeg",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      size: 2048000,
      type: "image"
    }
  ];
  
  const mockVideoFiles: MediaFile[] = [
    {
      id: "vid1",
      name: "demo-video.mp4",
      mimeType: "video/mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
      url: "https://example.com/video.mp4",
      size: 5120000,
      type: "video"
    }
  ];

  const handleSelectMedia = (media: MediaFile) => {
    if (selectedTab === "video") {
      setSelectedMedia([media]);
    } else {
      if (selectedMedia.find(m => m.id === media.id)) {
        setSelectedMedia(selectedMedia.filter(m => m.id !== media.id));
      } else {
        setSelectedMedia([...selectedMedia, media]);
      }
    }
  };

  const handleRemoveMedia = (mediaId: string) => {
    setSelectedMedia(selectedMedia.filter(media => media.id !== mediaId));
  };

  const handlePlatformChange = (platform: 'facebook' | 'instagram') => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform]
    });
  };

  const handleSubmit = async () => {
    if (selectedMedia.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ảnh hoặc video");
      return;
    }

    if (!platforms.facebook && !platforms.instagram) {
      toast.error("Vui lòng chọn ít nhất một nền tảng để đăng");
      return;
    }

    if (!caption) {
      toast.error("Vui lòng nhập nội dung bài đăng");
      return;
    }

    setIsSubmitting(true);

    // Mock API submission
    setTimeout(() => {
      toast.success("Đã gửi bài đăng thành công");
      setIsSubmitting(false);
      navigate("/history");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tạo bài đăng mới</h1>
        <p className="text-muted-foreground mt-1">
          Đăng ảnh hoặc video từ Google Drive lên mạng xã hội
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Media Selection */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Chọn media từ Google Drive</h2>
              
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="image" className="flex items-center">
                    <FileImage className="h-4 w-4 mr-2" />
                    Ảnh
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center">
                    <Film className="h-4 w-4 mr-2" />
                    Video
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="image" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mockImageFiles.map(file => (
                      <div 
                        key={file.id}
                        className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                          selectedMedia.find(m => m.id === file.id) 
                            ? 'border-primary ring-2 ring-primary/30' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleSelectMedia(file)}
                      >
                        <img 
                          src={file.thumbnailUrl} 
                          alt={file.name} 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs p-1 truncate max-w-full">{file.name}</p>
                        </div>
                        {selectedMedia.find(m => m.id === file.id) && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn folder khác
                  </Button>
                </TabsContent>
                
                <TabsContent value="video" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mockVideoFiles.map(file => (
                      <div 
                        key={file.id}
                        className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                          selectedMedia.find(m => m.id === file.id) 
                            ? 'border-primary ring-2 ring-primary/30' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleSelectMedia(file)}
                      >
                        <img 
                          src={file.thumbnailUrl} 
                          alt={file.name} 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <Film className="h-8 w-8 text-white/80" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs p-1 truncate max-w-full">{file.name}</p>
                        </div>
                        {selectedMedia.find(m => m.id === file.id) && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn video khác
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Caption input */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Nội dung bài đăng</h2>
              <Textarea 
                placeholder="Nhập nội dung bài đăng của bạn ở đây..."
                className="min-h-32 resize-none"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="text-right text-sm text-muted-foreground">
                {caption.length} ký tự
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Xem trước</h2>
              {selectedMedia.length > 0 ? (
                <div className="space-y-3">
                  {selectedMedia.map((media) => (
                    <div key={media.id} className="relative rounded-md overflow-hidden">
                      <img 
                        src={media.thumbnailUrl || media.url} 
                        alt={media.name}
                        className="w-full aspect-square object-cover"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                        onClick={() => handleRemoveMedia(media.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      {media.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Film className="h-12 w-12 text-white/80" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="p-3 bg-muted rounded-md mt-2">
                    <p className="text-sm whitespace-pre-wrap">{caption || "Chưa có nội dung"}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 bg-muted/50 rounded-md">
                  <p className="text-muted-foreground">Chưa chọn media</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Platform selection */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Đăng lên</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="facebook"
                    checked={platforms.facebook}
                    onCheckedChange={() => handlePlatformChange('facebook')}
                    disabled={!user?.facebookConnected}
                  />
                  <label 
                    htmlFor="facebook"
                    className={`flex items-center space-x-2 ${!user?.facebookConnected ? 'text-muted-foreground' : ''}`}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                    {!user?.facebookConnected && (
                      <span className="text-xs text-destructive">(Chưa kết nối)</span>
                    )}
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="instagram"
                    checked={platforms.instagram}
                    onCheckedChange={() => handlePlatformChange('instagram')}
                    disabled={!user?.instagramConnected}
                  />
                  <label 
                    htmlFor="instagram"
                    className={`flex items-center space-x-2 ${!user?.instagramConnected ? 'text-muted-foreground' : ''}`}
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span>Instagram</span>
                    {!user?.instagramConnected && (
                      <span className="text-xs text-destructive">(Chưa kết nối)</span>
                    )}
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleSubmit}
            disabled={
              isSubmitting || 
              !caption || 
              selectedMedia.length === 0 || 
              (!platforms.facebook && !platforms.instagram)
            }
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang gửi...
              </>
            ) : (
              "Đăng bài"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
