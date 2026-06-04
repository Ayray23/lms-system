import { collections } from './collections'
import {
  createRecord,
  deleteRecord,
  getRecord,
  listRecords,
  makeQueryConstraints,
  updateRecord,
} from './firestoreRepository'

export const userService = {
  createProfile: (profile) => {
    if (profile.uid) {
      return createRecord(collections.users, profile, profile.uid)
    }
    return createRecord(collections.users, profile)
  },
  updateProfile: (uid, profile) => updateRecord(collections.users, uid, profile),
  getProfile: (uid) => getRecord(collections.users, uid),
  listUsers: () => listRecords(collections.users),
}

export const courseService = {
  createCourse: (course) => createRecord(collections.courses, course),
  updateCourse: (courseId, course) => updateRecord(collections.courses, courseId, course),
  deleteCourse: (courseId) => deleteRecord(collections.courses, courseId),
  listCourses: () => listRecords(collections.courses),
  listLecturerCourses: async (lecturerId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('lecturerId', '==', lecturerId),
    ])
    return listRecords(collections.courses, constraints)
  },
}

export const enrollmentService = {
  enrollStudent: (enrollment) => createRecord(collections.enrollments, enrollment),
  listStudentEnrollments: async (studentId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('studentId', '==', studentId),
    ])
    return listRecords(collections.enrollments, constraints)
  },
}

export const materialService = {
  createMaterial: (material) => createRecord(collections.courseMaterials, material),
  updateMaterial: (materialId, material) => updateRecord(collections.courseMaterials, materialId, material),
  listCourseMaterials: async (courseId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('courseId', '==', courseId),
    ])
    return listRecords(collections.courseMaterials, constraints)
  },
}

export const studentMaterialService = {
  selectMaterial: (selection) => createRecord(collections.studentMaterialSelections, selection),
  listSelectedMaterials: async (studentId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('studentId', '==', studentId),
    ])
    return listRecords(collections.studentMaterialSelections, constraints)
  },
}

export const assignmentService = {
  createAssignment: (assignment) => createRecord(collections.assignments, assignment),
  updateAssignment: (assignmentId, assignment) => updateRecord(collections.assignments, assignmentId, assignment),
  listAssignments: () => listRecords(collections.assignments),
  listCourseAssignments: async (courseId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('courseId', '==', courseId),
    ])
    return listRecords(collections.assignments, constraints)
  },
}

export const submissionService = {
  createSubmission: (submission) => createRecord(collections.submissions, submission),
  gradeSubmission: (submissionId, grade) => updateRecord(collections.submissions, submissionId, grade),
  listAssignmentSubmissions: async (assignmentId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('assignmentId', '==', assignmentId),
    ])
    return listRecords(collections.submissions, constraints)
  },
}

export const announcementService = {
  createAnnouncement: (announcement) => createRecord(collections.announcements, announcement),
  listAnnouncements: () => listRecords(collections.announcements),
}

export const quizService = {
  createQuiz: (quiz) => createRecord(collections.quizzes, quiz),
  updateQuiz: (quizId, quiz) => updateRecord(collections.quizzes, quizId, quiz),
  createAttempt: (attempt) => createRecord(collections.quizAttempts, attempt),
  listCourseQuizzes: async (courseId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('courseId', '==', courseId),
    ])
    return listRecords(collections.quizzes, constraints)
  },
}

export const codingService = {
  createChallenge: (challenge) => createRecord(collections.codingChallenges, challenge),
  updateChallenge: (challengeId, challenge) => updateRecord(collections.codingChallenges, challengeId, challenge),
  submitCode: (submission) => createRecord(collections.codeSubmissions, submission),
  gradeCodeSubmission: (submissionId, grade) => updateRecord(collections.codeSubmissions, submissionId, grade),
}

export const discussionService = {
  createThread: (thread) => createRecord(collections.discussions, thread),
  updateThread: (threadId, thread) => updateRecord(collections.discussions, threadId, thread),
  listCourseThreads: async (courseId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('courseId', '==', courseId),
    ])
    return listRecords(collections.discussions, constraints)
  },
}

export const progressService = {
  upsertProgress: (progress) => createRecord(collections.progress, progress, progress.id),
  listStudentProgress: async (studentId) => {
    const constraints = await makeQueryConstraints((firestore) => [
      firestore.where('studentId', '==', studentId),
    ])
    return listRecords(collections.progress, constraints)
  },
}
