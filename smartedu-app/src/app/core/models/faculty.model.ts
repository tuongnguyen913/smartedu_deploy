import { Teacher } from './teacher.model';
import { PageHeader } from './page-header.model';

export interface FacultyHeader extends PageHeader {
}

export interface SubjectCount {
  subject: string;
  count: number;
}

export interface FacultyTeachersResponse {
  totalTeachers: number;
  subjects: SubjectCount[];
  teachers: Teacher[];
}
