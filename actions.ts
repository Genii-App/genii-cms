import {PublishIcon} from '@sanity/icons'
import {useDocumentOperation, useClient} from 'sanity'
import {useState, useEffect} from 'react'

interface StudentNotification {
  _type: 'studentNotification'
  notification: {_type: 'reference'; _ref: string}
  student: {_type: 'reference'; _ref: string}
  isRead: boolean
  createdAt: string
}

interface StudentReference {
  _ref: string
  _type: 'reference'
}

export function PublishAndBroadcastAction(props: any) {
  const {publish} = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const client = useClient({apiVersion: '2023-01-01'})

  useEffect(() => {
    // Reset publishing state when draft becomes null (published)
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  const createStudentNotifications = async (notificationDoc: any) => {
    const {targetAudience} = notificationDoc

    // Create notifications for all targeted students
    if (targetAudience && targetAudience.length > 0) {
      const notifications = targetAudience.map((student: StudentReference) => ({
        _type: 'studentNotification',
        notification: {_type: 'reference', _ref: props.id},
        student: {_type: 'reference', _ref: student._ref},
        isRead: false,
        createdAt: new Date().toISOString(),
      }))

      // Create notifications in batch
      await Promise.all(
        notifications.map((notification: StudentNotification) => client.create(notification)),
      )
    }
  }

  return {
    label: isPublishing ? 'Publishing...' : 'Publish and Broadcast',
    icon: PublishIcon,
    disabled: publish.disabled,
    onHandle: async () => {
      setIsPublishing(true)

      // First publish the notification
      publish.execute()

      // Then create student notifications if this is a notification document
      if (props.type === 'notification') {
        try {
          await createStudentNotifications(props.draft)
        } catch (error) {
          console.error('Error creating student notifications:', error)
        }
      }
    },
  }
}
