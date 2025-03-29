
export interface Post {
  id: string;
  caption: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video';
  platforms: ('facebook' | 'instagram')[];
  status: 'scheduled' | 'published' | 'failed';
  errorMessage?: string;
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailUrl?: string;
  url: string;
  size: number;
  type: 'image' | 'video';
}

export interface DriveFolder {
  id: string;
  name: string;
}
