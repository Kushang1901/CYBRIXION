export type Role = 'STUDENT' | 'ADMIN';

export type LessonType =
  | 'ARTICLE'
  | 'PDF'
  | 'PPT'
  | 'PRACTICAL'
  | 'ASSIGNMENT'
  | 'QUIZ'
  | 'LIVE_SESSION'
  | 'VIDEO';

export type EnrollmentStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED';

export type SubmissionStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CHANGES_REQUIRED'
  | 'GRADED'
  | 'APPROVED';

export type LiveSessionStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export type ProjectType = 'MINI' | 'MAJOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Profile {
  id: string;
  userId: string;
  phone?: string;
  college?: string;
  degree?: string;
  currentYear?: string;
  city?: string;
  experienceLevel?: string;
  careerGoal?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatarUrl?: string;
}

export interface InternshipProgram {
  id: string;
  title: string;
  slug: string;
  durationDays: number;
  level: string; // 'Beginner' | 'Intermediate' | 'Advanced'
  description: string;
  projectsCount: number;
  certEligible: boolean;
}

export interface Specialization {
  id: string;
  title: string;
  description: string;
  programId: string;
}

export interface Module {
  id: string;
  title: string;
  weekNumber: number;
  programId: string;
  specializationId?: string | null;
}

export interface Lesson {
  id: string;
  title: string;
  orderIndex: number;
  type: LessonType;
  content: string; // Markdown or text
  moduleId: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'PDF' | 'PPT';
  url: string;
  sizeBytes: number;
  moduleId: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  programId: string;
  specializationId?: string | null;
  status: EnrollmentStatus;
  startDate: Date | string;
  expectedEndDate: Date | string;
  createdAt: Date | string;
}

export interface LessonProgress {
  id: string;
  studentId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | string;
}

export interface Assignment {
  id: string;
  title: string;
  instruction: string;
  deadline?: Date | string;
  maxPoints: number;
  moduleId: string;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  assignmentId: string;
  status: SubmissionStatus;
  points?: number | null;
  fileUrl: string;
  feedback?: string | null;
  submittedAt: Date | string;
  updatedAt: Date | string;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  requirements: string;
  deadline?: Date | string;
  programId: string;
}

export interface ProjectSubmission {
  id: string;
  studentId: string;
  projectId: string;
  status: SubmissionStatus;
  fileUrl: string;
  feedback?: string | null;
  submittedAt: Date | string;
  updatedAt: Date | string;
}

export interface LiveSession {
  id: string;
  title: string;
  startTime: Date | string;
  durationMins: number;
  instructor: string;
  status: LiveSessionStatus;
  joinUrl: string;
}

export interface Certificate {
  id: string;
  certificateId: string;
  studentId: string;
  programId: string;
  issueDate: Date | string;
  verificationUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: Date | string;
}

export interface Payment {
  id: string;
  enrollmentId: string;
  status: PaymentStatus;
  amount: number;
  paymentDate: Date | string;
}
