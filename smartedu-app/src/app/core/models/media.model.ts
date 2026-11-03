export interface Album {
  id: number;
  albumId?: number;
  albumName?: string;
  name?: string;
  slug: string;
  coverImage?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface MediaItem {
  id: number;
  albumId?: number;
  albumName?: string;
  albumSlug?: string;
  name?: string;
  mediaTitle?: string;
  mediaType: 'image' | 'video';
  mediaUrl?: string;
  url?: string;
  thumbnailUrl: string;
  caption?: string;
  category?: string;
}

export interface MediaResponse {
  albums: Album[];
  items: MediaItem[];
}
