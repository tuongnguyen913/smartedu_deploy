export interface CreateEnrollmentDto {
  parentName: string;
  phoneNumber: string;
  studentName?: string;
  email?: string;
  gradeLevel?: string;
  branchId?: number;
  courseId?: number;
  learningNeed?: string;
  sourcePage: string;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollmentId?: number;
}

