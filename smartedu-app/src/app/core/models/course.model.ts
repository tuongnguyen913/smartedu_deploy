export interface CourseCategoryTab {
  moduleId: number;
  moduleName: string;
  moduleKey: string;
  displayOrder: number;
}

export interface CourseSyllabus {
  syllabusId?: number;
  courseId?: number;
  semesterName: string;
  topicTitle: string;
  topicContent?: string;
  displayOrder?: number;
}

export interface Course {
  courseId: number;
  courseName: string;
  slug: string;
  gradeLevel: string;
  grade?: string;
  subject: string;
  shortDescription?: string;
  contentHtml?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  heroBanner?: string;
  psychologyOverview?: string;
  targetKnowledge?: string;
  targetThinking?: string;
  targetSkills?: string;
  tuitionFee?: number;
  tuitionPeriod?: string;
  scheduleSummary?: string;
  classSizeMax?: number;
  hasFreeTutoringGuarantee?: boolean;
  hasTuitionRefundGuarantee?: boolean;
  displayOrder?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  syllabuses?: CourseSyllabus[];
  syllabusList?: CourseSyllabus[];
}

export interface CourseDetail extends Course {
  syllabuses: CourseSyllabus[];
  syllabusList?: CourseSyllabus[];
}

export interface CoursesResponse {
  categories: CourseCategoryTab[];
  courses: Course[];
}
