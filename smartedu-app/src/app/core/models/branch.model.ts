export interface Branch {
  branchId: number;
  branchName: string;
  address: string;
  phone?: string;
  hotline?: string;
  email?: string;
  workingHours?: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

