export interface HonorStudent {
  id: number;
  name: string;
  avatar: string;
  category: 'chuyen' | 'tuyensinh10' | 'daihoc' | string;
  badge: string;
  passedSchool: string;
  score: string;
  quote?: string;
}

export interface Testimonial {
  id: number;
  parentName: string;
  parentRole: string;
  studentName: string;
  studentGrade: string;
  avatar: string;
  content: string;
  stars: number;
}

