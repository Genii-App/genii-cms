import {StructureResolver} from 'sanity/structure'
import {
  UsersIcon,
  BookIcon,
  TagIcon,
  DocumentsIcon,
  EditIcon,
  RocketIcon,
  CogIcon,
  BellIcon,
  ImageIcon,
  TrendUpwardIcon,
  StarIcon,
  CreditCardIcon,
} from '@sanity/icons'

export const structure: StructureResolver = async (S, context) => {
  return S.list()
    .title('Genii CMS')
    .items([
      // Platform Section
      S.listItem()
        .title('Platform')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Platform Settings')
            .items([
              S.listItem()
                .title('Notifications')
                .icon(BellIcon)
                .child(S.documentTypeList('notification')),
              S.listItem().title('Banners').icon(ImageIcon).child(S.documentTypeList('banner')),
            ]),
        ),

      S.divider(),

      // Students Section
      S.listItem()
        .title('Students')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Student Management')
            .items([
              S.listItem()
                .title('All Students')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('student')
                    .title('All Students')
                    .menuItems([
                      S.menuItem()
                        .title('Create New Student')
                        .icon(UsersIcon)
                        .intent({type: 'create', params: {type: 'student'}}),
                    ]),
                ),
              S.listItem()
                .title('Student Progress')
                .icon(TrendUpwardIcon)
                .child(
                  S.list()
                    .title('Progress Tracking')
                    .items([
                      S.listItem()
                        .title('Course Progress')
                        .child(S.documentTypeList('studentCourse')),
                      S.listItem().title('Activities').child(S.documentTypeList('studentActivity')),
                      S.listItem().title('Notes').child(S.documentTypeList('studentNote')),
                    ]),
                ),
              S.listItem()
                .title('Achievements')
                .icon(StarIcon)
                .child(
                  S.list()
                    .title('Student Achievements')
                    .items([
                      S.listItem().title('Badges').child(S.documentTypeList('studentBadge')),
                      S.listItem().title('Streaks').child(S.documentTypeList('studentStreak')),
                      S.listItem()
                        .title('Certificates')
                        .child(S.documentTypeList('studentCertificate')),
                    ]),
                ),
              S.listItem()
                .title('Notifications')
                .icon(BellIcon)
                .child(
                  S.list()
                    .title('Student Notifications')
                    .items([
                      S.listItem()
                        .title('All Notifications')
                        .child(S.documentTypeList('studentNotification')),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // Course Management Section
      S.listItem()
        .title('Course Management')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Course Management')
            .items([
              // Course Categories
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('courseCategory')
                    .title('Course Categories')
                    .menuItems([
                      S.menuItem()
                        .title('Create New Category')
                        .icon(TagIcon)
                        .intent({type: 'create', params: {type: 'courseCategory'}}),
                    ]),
                ),

              // Courses
              S.listItem()
                .title('Courses')
                .icon(BookIcon)
                .child(
                  S.documentTypeList('course')
                    .title('All Courses')
                    .menuItems([
                      S.menuItem()
                        .title('Create New Course')
                        .icon(BookIcon)
                        .intent({type: 'create', params: {type: 'course'}}),
                    ]),
                ),

              // Course Content
              S.listItem()
                .title('Course Content')
                .icon(DocumentsIcon)
                .child(
                  S.list()
                    .title('Course Content')
                    .items([
                      // Chapters
                      S.listItem()
                        .title('Chapters')
                        .icon(DocumentsIcon)
                        .child(
                          S.documentTypeList('chapter')
                            .title('All Chapters')
                            .menuItems([
                              S.menuItem()
                                .title('Create New Chapter')
                                .icon(DocumentsIcon)
                                .intent({type: 'create', params: {type: 'chapter'}}),
                            ]),
                        ),

                      // Lessons
                      S.listItem()
                        .title('Lessons')
                        .icon(EditIcon)
                        .child(
                          S.documentTypeList('lesson')
                            .title('All Lessons')
                            .menuItems([
                              S.menuItem()
                                .title('Create New Lesson')
                                .icon(EditIcon)
                                .intent({type: 'create', params: {type: 'lesson'}}),
                            ]),
                        ),

                      // Lesson Content Versions
                      S.listItem()
                        .title('Content Versions')
                        .icon(EditIcon)
                        .child(
                          S.documentTypeList('lessonContent')
                            .title('All Content Versions')
                            .menuItems([
                              S.menuItem()
                                .title('Create New Content Version')
                                .icon(EditIcon)
                                .intent({type: 'create', params: {type: 'lessonContent'}}),
                            ]),
                        ),

                      // Quizzes
                      S.listItem()
                        .title('Quizzes')
                        .icon(RocketIcon)
                        .child(
                          S.list()
                            .title('Quiz Management')
                            .items([
                              S.listItem()
                                .title('All Quizzes')
                                .child(
                                  S.documentTypeList('quiz')
                                    .title('All Quizzes')
                                    .menuItems([
                                      S.menuItem()
                                        .title('Create New Quiz')
                                        .icon(RocketIcon)
                                        .intent({type: 'create', params: {type: 'quiz'}}),
                                    ]),
                                ),
                              S.listItem().title('Questions').child(S.documentTypeList('question')),
                              S.listItem()
                                .title('Answer Options')
                                .child(S.documentTypeList('answerOption')),
                              S.listItem()
                                .title('Quiz Attempts')
                                .child(S.documentTypeList('quizAttempt')),
                            ]),
                        ),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // Achievements Section
      S.listItem()
        .title('Achievements')
        .icon(StarIcon)
        .child(
          S.list()
            .title('Achievement Management')
            .items([S.listItem().title('Badges').child(S.documentTypeList('badge'))]),
        ),

      // Subscription Section
      S.listItem()
        .title('Subscriptions')
        .icon(CreditCardIcon)
        .child(
          S.list()
            .title('Subscription Management')
            .items([
              S.listItem().title('Packages').child(S.documentTypeList('subscriptionPackage')),
            ]),
        ),
    ])
}
