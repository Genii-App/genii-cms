import {defineArrayMember, defineType, defineField} from 'sanity'
import {CodeIcon, ImageIcon, VideoIcon, BlockquoteIcon, LinkIcon} from '@sanity/icons'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
        {title: 'Checklist', value: 'checkbox'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Highlight', value: 'highlight'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    {title: 'External URL', value: 'href'},
                    {title: 'Course', value: 'course'},
                    {title: 'Chapter', value: 'chapter'},
                    {title: 'Lesson', value: 'lesson'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is External URL'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'reference',
                type: 'reference',
                to: [{type: 'course'}, {type: 'chapter'}, {type: 'lesson'}],
                hidden: ({parent}) => parent?.linkType === 'href' || parent?.linkType == null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType !== 'href' && !value) {
                      return 'Reference is required when linking to internal content'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
            preview: {
              select: {
                linkType: 'linkType',
                href: 'href',
                reference: 'reference.title',
              },
              prepare({linkType, href, reference}) {
                return {
                  title: linkType === 'href' ? href : reference || 'Untitled',
                  subtitle: `${linkType.charAt(0).toUpperCase() + linkType.slice(1)} Link`,
                }
              },
            },
          },
        ],
      },
    }),
    // Code Block
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      icon: CodeIcon,
      preview: {
        select: {
          language: 'language',
          code: 'code',
        },
        prepare({language, code}) {
          return {
            title: language || 'No language specified',
            subtitle: code ? code.slice(0, 50) + '...' : 'Empty code block',
          }
        },
      },
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'JSON', value: 'json'},
              {title: 'Markdown', value: 'markdown'},
              {title: 'Python', value: 'python'},
              {title: 'Bash', value: 'bash'},
            ],
          },
          validation: (rule) => rule.required().error('Please specify the code language'),
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 10,
          validation: (rule) => rule.required().error('Code content is required'),
        }),
        defineField({
          name: 'highlightedLines',
          title: 'Highlighted Lines',
          type: 'string',
          description: 'Comma separated line numbers to highlight (e.g. 1,3-5,8)',
        }),
      ],
    }),
    // Image Block
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
          description: 'Describe the image for screen readers and SEO',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption to display below the image',
        }),
      ],
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'alt',
          caption: 'caption',
        },
        prepare({title, caption, imageUrl}) {
          return {
            title: title || 'Missing alt text',
            subtitle: caption,
            media: imageUrl ? imageUrl : ImageIcon,
          }
        },
      },
    }),
    // Video Block
    defineArrayMember({
      type: 'object',
      name: 'video',
      title: 'Video',
      icon: VideoIcon,
      preview: {
        select: {
          url: 'url',
          caption: 'caption',
        },
        prepare({url, caption}) {
          return {
            title: caption || 'Untitled Video',
            subtitle: url,
            media: VideoIcon,
          }
        },
      },
      fields: [
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'Supports YouTube, Vimeo, or direct video URLs',
          validation: (rule) => rule.required().error('Video URL is required'),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption to display below the video',
        }),
      ],
    }),
    // Callout Block
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      icon: BlockquoteIcon,
      preview: {
        select: {
          type: 'type',
          blocks: 'content',
        },
        prepare({type, blocks}) {
          const block = (blocks || []).find((block: {_type: string}) => block._type === 'block')
          return {
            title: block
              ? block.children
                  .filter((child: {_type: string}) => child._type === 'span')
                  .map((span: {text: string}) => span.text)
                  .join('')
              : 'Empty callout',
            subtitle: `${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'No type'} callout`,
            media: BlockquoteIcon,
          }
        },
      },
      fields: [
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Warning', value: 'warning'},
              {title: 'Success', value: 'success'},
              {title: 'Error', value: 'error'},
              {title: 'Tip', value: 'tip'},
            ],
            layout: 'radio',
          },
          validation: (rule) => rule.required().error('Please specify the callout type'),
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}],
          validation: (rule) => rule.required().error('Callout content is required'),
        }),
      ],
    }),
  ],
})
