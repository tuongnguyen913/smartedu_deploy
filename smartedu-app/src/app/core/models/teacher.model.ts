export interface TeacherTimelineEvent {
  year: string;
  event: string;
}

export interface Teacher {
  teacherId: number;
  fullName: string;
  slug: string;
  academicDegree: string;
  graduatedUniversity: string;
  position?: string;
  subject: string;
  category?: 'lanhdao' | 'toan' | 'van' | 'anh' | 'khtn' | string;
  gradeLevels?: string;
  experienceYears: number;
  teachingPhilosophy?: string;
  bioTimelineJson?: string;
  timelineEvents?: TeacherTimelineEvent[];
  achievements?: string;
  avatarUrl: string;
  displayOrder?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

