/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>
        text?: string
        _type: 'span'
        _key: string
      }>
      style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
      listItem?: 'bullet' | 'number' | 'checkbox'
      markDefs?: Array<{
        linkType?: 'href' | 'course' | 'chapter' | 'lesson'
        href?: string
        reference?:
          | {
              _ref: string
              _type: 'reference'
              _weak?: boolean
              [internalGroqTypeReferenceTo]?: 'course'
            }
          | {
              _ref: string
              _type: 'reference'
              _weak?: boolean
              [internalGroqTypeReferenceTo]?: 'chapter'
            }
          | {
              _ref: string
              _type: 'reference'
              _weak?: boolean
              [internalGroqTypeReferenceTo]?: 'lesson'
            }
        openInNewTab?: boolean
        _type: 'link'
        _key: string
      }>
      level?: number
      _type: 'block'
      _key: string
    }
  | {
      language?:
        | 'javascript'
        | 'typescript'
        | 'html'
        | 'css'
        | 'json'
        | 'markdown'
        | 'python'
        | 'bash'
      code?: string
      highlightedLines?: string
      _type: 'codeBlock'
      _key: string
    }
  | {
      asset?: {
        _ref: string
        _type: 'reference'
        _weak?: boolean
        [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
      }
      media?: unknown
      hotspot?: SanityImageHotspot
      crop?: SanityImageCrop
      alt?: string
      caption?: string
      _type: 'image'
      _key: string
    }
  | {
      url?: string
      caption?: string
      _type: 'video'
      _key: string
    }
  | {
      type?: 'info' | 'warning' | 'success' | 'error' | 'tip'
      content?: Array<{
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }>
      _type: 'callout'
      _key: string
    }
>

export type QuizAttemptDetail = {
  _id: string
  _type: 'quizAttemptDetail'
  _createdAt: string
  _updatedAt: string
  _rev: string
  quizAttempt?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quizAttempt'
  }
  question?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'question'
  }
  answer?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'answerOption'
  }
  isCorrect?: boolean
}

export type AnswerOption = {
  _id: string
  _type: 'answerOption'
  _createdAt: string
  _updatedAt: string
  _rev: string
  text?: string
  isCorrect?: 'true' | 'false'
  explanation?: string
  question?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'question'
  }
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  orderNumber?: number
}

export type Question = {
  _id: string
  _type: 'question'
  _createdAt: string
  _updatedAt: string
  _rev: string
  text?: string
  type?: 'multipleChoice' | 'trueFalse' | 'fillInTheBlank'
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  quiz?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quiz'
  }
  points?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  randomizeAnswers?: 'random' | 'fixed'
  explanation?: string
  answers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'answerOption'
  }>
}

export type SubscriptionPackage = {
  _id: string
  _type: 'subscriptionPackage'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  description?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  price?: number
  duration?: number
  features?: Array<string>
  isPopular?: boolean
  isActive?: boolean
  availableFrom?: string
  availableUntil?: string
}

export type StudentNotification = {
  _id: string
  _type: 'studentNotification'
  _createdAt: string
  _updatedAt: string
  _rev: string
  notification?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'notification'
  }
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  readAt?: string
  isRead?: boolean
  createdAt?: string
}

export type StudentActivity = {
  _id: string
  _type: 'studentActivity'
  _createdAt: string
  _updatedAt: string
  _rev: string
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  activityType?:
    | 'course_started'
    | 'course_completed'
    | 'lesson_completed'
    | 'quiz_attempted'
    | 'quiz_passed'
    | 'achievement_earned'
    | 'note_created'
  course?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'course'
  }
  lesson?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'lesson'
  }
  quiz?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quiz'
  }
  quizAttempt?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quizAttempt'
  }
  achievement?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'badge'
  }
  note?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'studentNote'
  }
  metadata?: {
    duration?: number
    score?: number
    platform?: 'web' | 'mobile' | 'tablet'
  }
}

export type QuizAttempt = {
  _id: string
  _type: 'quizAttempt'
  _createdAt: string
  _updatedAt: string
  _rev: string
  quiz?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quiz'
  }
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  feedback?: string
  score?: number
  status?: 'passed' | 'failed' | 'inProgress'
  startedAt?: string
  submittedAt?: string
  metadata?: {
    timeTaken?: number
    totalQuestions?: number
    correctAnswers?: number
    incorrectAnswers?: number
  }
}

export type StudentCourse = {
  _id: string
  _type: 'studentCourse'
  _createdAt: string
  _updatedAt: string
  _rev: string
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  course?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'course'
  }
  status?: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'dropped'
  progress?: number
  completedChapters?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'chapter'
  }>
  completedLessons?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'lesson'
  }>
  quizAttempts?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'quizAttempt'
  }>
  lastAccessedAt?: string
  enrolledAt?: string
  completedAt?: string
  certificateIssued?: 'not_eligible' | 'eligible' | 'issued'
  certificate?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'studentCertificate'
  }
  notes?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'studentNote'
  }>
}

export type StudentCertificate = {
  _id: string
  _type: 'studentCertificate'
  _createdAt: string
  _updatedAt: string
  _rev: string
  course?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'course'
  }
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  issuedAt?: string
  status?: 'issued' | 'revoked'
}

export type StudentStreak = {
  _id: string
  _type: 'studentStreak'
  _createdAt: string
  _updatedAt: string
  _rev: string
  startedAt?: string
  endedAt?: string
  status?: 'active' | 'inactive'
  streak?: number
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
}

export type StudentBadge = {
  _id: string
  _type: 'studentBadge'
  _createdAt: string
  _updatedAt: string
  _rev: string
  badge?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'badge'
  }
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  earnedAt?: string
}

export type Badge = {
  _id: string
  _type: 'badge'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  description?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  chapter?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'chapter'
  }
  points?: number
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  isActive?: boolean
}

export type StudentNote = {
  _id: string
  _type: 'studentNote'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  content?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h1' | 'h2' | 'blockquote'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
        _key: string
      }
  >
  student?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  course?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'course'
  }
  chapter?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'chapter'
  }
  lesson?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'lesson'
  }
  tags?: Array<string>
  visibility?: 'private' | 'public' | 'instructor'
  status?: 'draft' | 'published' | 'archived'
}

export type Lesson = {
  _id: string
  _type: 'lesson'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  type?: 'text' | 'video'
  estimatedTime?: number
  orderNumber?: number
  content?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'lessonContent'
  }
}

export type LessonContent = {
  _id: string
  _type: 'lessonContent'
  _createdAt: string
  _updatedAt: string
  _rev: string
  type?: 'text' | 'video'
  isDefault?: 'yes' | 'no'
  version?: number
  content?: BlockContent
  lesson?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'lesson'
  }
  createdBy?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'student'
  }
  lastUpdated?: string
}

export type Chapter = {
  _id: string
  _type: 'chapter'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
  course?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'course'
  }
  orderNumber?: number
  estimatedTime?: number
  lessons?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'lesson'
  }>
  quiz?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'quiz'
  }
}

export type Quiz = {
  _id: string
  _type: 'quiz'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  description?: string
  chapter?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'chapter'
  }
  questions?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'question'
  }>
  passingScore?: number
  timeLimit?: number
  maxAttempts?: number
  showResults?: 'afterEachAttempt' | 'afterFinalAttempt' | 'never'
  feedbackType?: 'immediateFeedback' | 'finalFeedback' | 'noFeedback'
  randomizeQuestions?: 'random' | 'fixed'
}

export type Course = {
  _id: string
  _type: 'course'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
  category?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'courseCategory'
  }
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  language?: 'indonesia' | 'english'
  isPremium?: 'free' | 'premium'
  thumbnail?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  trailer?: string
  additionalDetails?: Array<{
    title?: string
    description?: string
    _key: string
  }>
  chapters?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'chapter'
  }>
}

export type CourseCategory = {
  _id: string
  _type: 'courseCategory'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  description?: string
  icon?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type Student = {
  _id: string
  _type: 'student'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  email?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  clientId?: string
  emailVerified?: 'pending' | 'verified'
  alreadyOnboarded?: boolean
  learningPreferences?: {
    goal?: string
    focus?: string
    topic?: string
    level?: 'beginner' | 'intermediate' | 'advanced'
    studyTime?: string
    studyTimeOfDay?: string
  }
  settings?: {
    notifications?: {
      email?: 'all' | 'important' | 'none'
    }
  }
}

export type Banner = {
  _id: string
  _type: 'banner'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'promo'
  status?: 'draft' | 'scheduled' | 'active' | 'completed'
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  backgroundColor?: 'default' | 'light' | 'dark' | 'primary' | 'secondary'
  link?: {
    url?: string
    text?: string
  }
  placement?: 'top' | 'bottom' | 'float'
  targetAudience?: 'all' | 'free' | 'premium' | 'new'
  targetPages?: Array<string>
  startDate?: string
  endDate?: string
  dismissible?: 'yes' | 'no'
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Notification = {
  _id: string
  _type: 'notification'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  status?: 'draft' | 'scheduled' | 'active' | 'completed'
  link?: string
  targetAudience?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'student'
  }>
  specificUsers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'student'
  }>
  scheduledFor?: string
  expiresAt?: string
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | BlockContent
  | QuizAttemptDetail
  | AnswerOption
  | Question
  | SubscriptionPackage
  | StudentNotification
  | StudentActivity
  | QuizAttempt
  | StudentCourse
  | StudentCertificate
  | StudentStreak
  | StudentBadge
  | Badge
  | StudentNote
  | Lesson
  | LessonContent
  | Chapter
  | Quiz
  | Course
  | CourseCategory
  | Slug
  | Student
  | Banner
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Notification
export declare const internalGroqTypeReferenceTo: unique symbol
