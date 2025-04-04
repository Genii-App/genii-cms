/**
 * Schema Types
 *
 * This file exports all schema types used in the Sanity Studio.
 * Types are organized into categories for better maintainability.
 */

// Platform-wide schemas
import {notificationType} from './documents/platform/notificationType'
import {bannerType} from './documents/platform/bannerType'

// User & Student schemas
import {studentType} from './documents/student/studentType'
import {studentNoteType} from './documents/student/studentNoteType'
import {studentBadgeType} from './documents/student/studentBadgeType'
import {studentStreakType} from './documents/student/studentStreakType'
import {studentCertificateType} from './documents/student/studentCertificateType'
import {studentCourseType} from './documents/student/studentCourseType'
import {studentActivityType} from './documents/student/studentActivityType'
import {studentNotificationType} from './documents/student/studentNotificationType'

// Achievement & Gamification schemas
import {badgeType} from './documents/achievement/badgeType'

// Subscription & Payment schemas
import {subscriptionPackageType} from './documents/subscription/subscriptionPackageType'

// Course & Learning schemas
import {courseType} from './documents/course/courseType'
import {courseCategoryType} from './documents/course/courseCategoryType'
import {chapterType} from './documents/course/chapterType'
import {lessonType} from './documents/course/lessonType'
import {lessonContentType} from './documents/course/lessonContentType'
import {quizType} from './documents/course/quizType'
import {questionType} from './documents/course/questionType'
import {answerOptionType} from './documents/course/answerOptionType'
import {quizAttemptType} from './documents/course/quizAttemptType'
import {quizAttemptDetailType} from './documents/course/quizAttemptDetailType'

// Reusable object schemas
import {blockContent} from './objects/blockContentType'

// Group schemas by domain for better organization
const platformSchemas = [notificationType, bannerType]

const studentSchemas = [
  studentType,
  studentNoteType,
  studentBadgeType,
  studentStreakType,
  studentCertificateType,
  studentCourseType,
  studentActivityType,
  studentNotificationType,
]

const achievementSchemas = [badgeType]

const subscriptionSchemas = [subscriptionPackageType]

const courseSchemas = [
  courseType,
  courseCategoryType,
  chapterType,
  lessonType,
  lessonContentType,
  quizType,
  questionType,
  answerOptionType,
  quizAttemptType,
  quizAttemptDetailType,
]

const objectSchemas = [blockContent]

// Export all schema types
export const schemaTypes = [
  ...platformSchemas,
  ...studentSchemas,
  ...achievementSchemas,
  ...subscriptionSchemas,
  ...courseSchemas,
  ...objectSchemas,
]
