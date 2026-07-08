import { 
  mockPrograms, 
  mockSpecializations, 
  mockModules, 
  mockLessons, 
  mockResources, 
  mockAssignments, 
  mockProjects, 
  mockLiveSessions, 
  mockAnnouncements,
  defaultStudentUser,
  defaultStudentProfile
} from '../data/mockData';
import { 
  User, 
  Profile, 
  Enrollment, 
  LessonProgress, 
  AssignmentSubmission, 
  ProjectSubmission, 
  Certificate,
  EnrollmentStatus,
  SubmissionStatus
} from '../types';

// Safely access localStorage on the client side
const isClient = typeof window !== 'undefined';

const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key ${key} to localStorage:`, error);
  }
};

export const dbService = {
  // --- AUTH & USER ---
  getCurrentUser(): User | null {
    return getStorageItem<User | null>('cyb_user', null);
  },

  setCurrentUser(user: User | null): void {
    setStorageItem('cyb_user', user);
  },

  getProfile(userId: string): Profile | null {
    const profile = getStorageItem<Profile | null>('cyb_profile', null);
    if (profile && profile.userId === userId) {
      return profile;
    }
    if (userId === 'usr-student-aarav') {
      return defaultStudentProfile;
    }
    return null;
  },

  updateProfile(profile: Profile): void {
    setStorageItem('cyb_profile', profile);
  },

  logout(): void {
    if (!isClient) return;
    localStorage.removeItem('cyb_user');
    localStorage.removeItem('cyb_profile');
    localStorage.removeItem('cyb_enrollment');
    localStorage.removeItem('cyb_progress');
    localStorage.removeItem('cyb_asg_subs');
    localStorage.removeItem('cyb_proj_subs');
    localStorage.removeItem('cyb_certificates');
  },

  // --- ENROLLMENTS ---
  getEnrollment(studentId: string): Enrollment | null {
    const enrollment = getStorageItem<Enrollment | null>('cyb_enrollment', null);
    if (enrollment && enrollment.studentId === studentId) {
      return enrollment;
    }
    if (studentId === 'usr-student-aarav') {
      const defaultEnrollment: Enrollment = {
        id: 'enr-aarav',
        studentId: studentId,
        programId: 'prog-60-day',
        specializationId: null,
        status: 'ACTIVE',
        startDate: '2026-06-25T08:00:00Z',
        expectedEndDate: '2026-08-24T08:00:00Z',
        createdAt: '2026-06-25T08:00:00Z'
      };
      return defaultEnrollment;
    }
    return null;
  },

  createEnrollment(programId: string, specializationId: string | null = null): Enrollment {
    const user = this.getCurrentUser() || defaultStudentUser;
    const durationDays = mockPrograms.find(p => p.id === programId)?.durationDays || 30;
    
    const startDate = new Date();
    const expectedEndDate = new Date();
    expectedEndDate.setDate(startDate.getDate() + durationDays);

    const enrollment: Enrollment = {
      id: `enr-${Math.random().toString(36).substr(2, 9)}`,
      studentId: user.id,
      programId,
      specializationId,
      status: 'ACTIVE',
      startDate: startDate.toISOString(),
      expectedEndDate: expectedEndDate.toISOString(),
      createdAt: startDate.toISOString()
    };

    setStorageItem('cyb_enrollment', enrollment);
    
    // Reset progress and submissions for the new program
    this.resetStudentActivity();
    
    return enrollment;
  },

  resetStudentActivity(): void {
    setStorageItem<LessonProgress[]>('cyb_progress', []);
    setStorageItem<AssignmentSubmission[]>('cyb_asg_subs', []);
    setStorageItem<ProjectSubmission[]>('cyb_proj_subs', []);
    setStorageItem<Certificate[]>('cyb_certificates', []);
  },

  // --- PROGRESS TRACKING ---
  getLessonProgress(studentId: string): LessonProgress[] {
    if (studentId === 'usr-student-aarav') {
      const defaultProgress: LessonProgress[] = [
        { id: 'prog-1', studentId, lessonId: 'les-60-f-1', completed: true, completedAt: '2026-06-26T10:00:00Z' },
        { id: 'prog-2', studentId, lessonId: 'les-60-f-2', completed: true, completedAt: '2026-06-27T14:30:00Z' },
        { id: 'prog-3', studentId, lessonId: 'les-60-f-3', completed: true, completedAt: '2026-06-28T09:15:00Z' }
      ];
      return getStorageItem<LessonProgress[]>('cyb_progress', defaultProgress);
    }
    return getStorageItem<LessonProgress[]>('cyb_progress', []);
  },

  toggleLessonCompletion(studentId: string, lessonId: string): boolean {
    const progress = this.getLessonProgress(studentId);
    const existingIndex = progress.findIndex(p => p.lessonId === lessonId);

    let completed = false;
    if (existingIndex > -1) {
      // Toggle
      completed = !progress[existingIndex].completed;
      progress[existingIndex].completed = completed;
      progress[existingIndex].completedAt = new Date().toISOString();
    } else {
      completed = true;
      progress.push({
        id: `lp-${Math.random().toString(36).substr(2, 9)}`,
        studentId,
        lessonId,
        completed: true,
        completedAt: new Date().toISOString()
      });
    }

    setStorageItem('cyb_progress', progress);
    
    // Proactively check if they are eligible for a certificate now
    this.checkAndGenerateCertificate(studentId);
    
    return completed;
  },

  getProgramProgressPercentage(studentId: string): number {
    const enrollment = this.getEnrollment(studentId);
    if (!enrollment) return 0;

    // Get lessons corresponding to this program
    const programModules = mockModules.filter(m => m.programId === enrollment.programId);
    const programModuleIds = programModules.map(m => m.id);
    const programLessons = mockLessons.filter(l => programModuleIds.includes(l.moduleId));

    if (programLessons.length === 0) return 38; // Default mock percentage

    const progress = this.getLessonProgress(studentId);
    const completedCount = progress.filter(p => 
      p.completed && programLessons.some(l => l.id === p.lessonId)
    ).length;

    return Math.round((completedCount / programLessons.length) * 100);
  },

  // --- SUBMISSIONS ---
  getAssignmentSubmissions(studentId: string): AssignmentSubmission[] {
    if (studentId === 'usr-student-aarav') {
      const defaultSubmissions: AssignmentSubmission[] = [
        {
          id: 'sub-asg-1',
          studentId,
          assignmentId: 'asgn-60-1',
          status: 'GRADED',
          points: 92,
          fileUrl: '/uploads/cia_case_analysis_aarav.pdf',
          feedback: 'Excellent work Aarav. You correctly identified the integrity breach in Scenario B and suggested strong salted hashing mechanisms.',
          submittedAt: '2026-06-29T11:00:00Z',
          updatedAt: '2026-06-30T16:00:00Z'
        },
        {
          id: 'sub-asg-2',
          studentId,
          assignmentId: 'asgn-60-2',
          status: 'UNDER_REVIEW',
          points: null,
          fileUrl: '/uploads/port_mapping_aarav.pdf',
          feedback: null,
          submittedAt: '2026-07-05T14:00:00Z',
          updatedAt: '2026-07-05T14:00:00Z'
        }
      ];
      return getStorageItem<AssignmentSubmission[]>('cyb_asg_subs', defaultSubmissions);
    }
    return getStorageItem<AssignmentSubmission[]>('cyb_asg_subs', []);
  },

  submitAssignment(studentId: string, assignmentId: string, fileUrl: string): AssignmentSubmission {
    const submissions = this.getAssignmentSubmissions(studentId);
    const existingIndex = submissions.findIndex(s => s.assignmentId === assignmentId);

    const newSubmission: AssignmentSubmission = {
      id: existingIndex > -1 ? submissions[existingIndex].id : `sub-asg-${Math.random().toString(36).substr(2, 9)}`,
      studentId,
      assignmentId,
      status: 'SUBMITTED',
      points: null,
      fileUrl,
      feedback: null,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex > -1) {
      submissions[existingIndex] = newSubmission;
    } else {
      submissions.push(newSubmission);
    }

    setStorageItem('cyb_asg_subs', submissions);
    return newSubmission;
  },

  getProjectSubmissions(studentId: string): ProjectSubmission[] {
    const defaultSubmissions: ProjectSubmission[] = [];
    return getStorageItem<ProjectSubmission[]>('cyb_proj_subs', defaultSubmissions);
  },

  submitProject(studentId: string, projectId: string, fileUrl: string): ProjectSubmission {
    const submissions = this.getProjectSubmissions(studentId);
    const existingIndex = submissions.findIndex(s => s.projectId === projectId);

    const newSubmission: ProjectSubmission = {
      id: existingIndex > -1 ? submissions[existingIndex].id : `sub-proj-${Math.random().toString(36).substr(2, 9)}`,
      studentId,
      projectId,
      status: 'SUBMITTED',
      fileUrl,
      feedback: null,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingIndex > -1) {
      submissions[existingIndex] = newSubmission;
    } else {
      submissions.push(newSubmission);
    }

    setStorageItem('cyb_proj_subs', submissions);
    return newSubmission;
  },

  // --- CERTIFICATES ---
  getCertificates(studentId: string): Certificate[] {
    const defaultCerts: Certificate[] = [];
    return getStorageItem<Certificate[]>('cyb_certificates', defaultCerts);
  },

  checkAndGenerateCertificate(studentId: string): Certificate | null {
    const progressPercent = this.getProgramProgressPercentage(studentId);
    const enrollment = this.getEnrollment(studentId);
    
    if (!enrollment || progressPercent < 100) return null;

    const certs = this.getCertificates(studentId);
    const existing = certs.find(c => c.programId === enrollment.programId);
    if (existing) return existing;

    const idNum = Math.floor(100000 + Math.random() * 900000);
    const certificateId = `CYB-2026-${idNum}`;
    const newCert: Certificate = {
      id: `cert-${Math.random().toString(36).substr(2, 9)}`,
      certificateId,
      studentId,
      programId: enrollment.programId,
      issueDate: new Date().toISOString(),
      verificationUrl: `/certificate-verification?id=${certificateId}`
    };

    certs.push(newCert);
    setStorageItem('cyb_certificates', certs);
    return newCert;
  },

  verifyCertificate(certificateId: string): { valid: boolean; studentName?: string; programTitle?: string; durationDays?: number; issueDate?: string } {
    // Base standard valid certificate check
    if (certificateId === 'CYB-2026-000145') {
      return {
        valid: true,
        studentName: 'Aarav Sharma',
        programTitle: '60-Day Cybersecurity Internship',
        durationDays: 60,
        issueDate: '2026-07-05'
      };
    }

    // Check localStorage certs
    if (isClient) {
      const allCerts = getStorageItem<Certificate[]>('cyb_certificates', []);
      const found = allCerts.find(c => c.certificateId === certificateId);
      if (found) {
        const user = this.getCurrentUser() || defaultStudentUser;
        const program = mockPrograms.find(p => p.id === found.programId);
        return {
          valid: true,
          studentName: user.name,
          programTitle: program?.title || 'Cybersecurity Internship',
          durationDays: program?.durationDays || 30,
          issueDate: new Date(found.issueDate).toISOString().split('T')[0]
        };
      }
    }

    return { valid: false };
  },

  // --- USER DB FOR SANDBOX ---
  getRegisteredUsers(): Array<{ user: User; passwordHash: string }> {
    return getStorageItem<Array<{ user: User; passwordHash: string }>>('cyb_registered_users', [
      {
        user: defaultStudentUser,
        passwordHash: 'password123'
      }
    ]);
  },

  registerNewUser(user: User, passwordHash: string): void {
    const users = this.getRegisteredUsers();
    if (!users.some(u => u.user.email.toLowerCase() === user.email.toLowerCase())) {
      users.push({ user, passwordHash });
      setStorageItem('cyb_registered_users', users);
    }
  },

  authenticateUser(email: string, passwordHash: string): User | null {
    const users = this.getRegisteredUsers();
    const found = users.find(u => u.user.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash);
    return found ? found.user : null;
  },

  updateUserPassword(email: string, newPasswordHash: string): boolean {
    const users = this.getRegisteredUsers();
    const index = users.findIndex(u => u.user.email.toLowerCase() === email.toLowerCase());
    if (index > -1) {
      users[index].passwordHash = newPasswordHash;
      setStorageItem('cyb_registered_users', users);
      return true;
    }
    return false;
  }
};
