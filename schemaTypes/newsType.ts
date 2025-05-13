import {defineField, defineType, type ValidationContext} from 'sanity'
import isUniqueAcrossAllDocuments from '../lib/isUniqueAcrossAllDocuments'


const newsType = defineType({
  name: 'news',
  title: '最新消息',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title:"標題",
      type: 'string',
      description: '文章標題',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title:"URL slug",
      description: "網址最後反斜線的那一部份，例如：https://shie-villa.com/news/whats-new 的URL Slug 就是 「whats-new」。",
      options: {source: 'title',maxLength: 96, isUnique: isUniqueAcrossAllDocuments},
      validation: (rule) => [
        rule.required(),

      ],
    }),
    defineField({
      title:"封面照片",
      name: 'coverImage',
      type: 'image',
      options: {
        hotspot: true, // 允許在圖片上定義熱點，用於裁剪等操作
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '圖片替代文字',
          description: '只有當圖片無法顯示時才會顯示的替代文字，目的是為了提高 SEO 和可訪問性',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: '文章內容',
      type: 'array', // 內容通常是多個區塊組成的陣列
      of: [
        {
          type: 'block', // Sanity 的富文本區塊類型
          styles: [ // 定義可用的文字樣式
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: { // 定義可用的文字標記 (例如粗體、斜體)
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [ // 定義可用的註解 (例如連結)
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
              {
                type: 'textColor',
              },
            ],
          },
        },
        {
          type: 'image', // 允許在內容中插入圖片
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '圖片替代文字',
              description: '只有當圖片無法顯示時才會顯示的替代文字，目的是為了提高 SEO 和可訪問性',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: '發佈時間',
      type: 'datetime',
      description: '網頁上會根據發布時間的先後順序做排序，最新的會放在最前面',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (Rule) => Rule.required(),
      initialValue:  (new Date()).toISOString()
    }),
    defineField({
      name: 'excerpt',
      title: '文章摘要',
      type: 'text',
      description: '文章的摘要，用於列表頁面和 SEO',
    }),
    defineField({
      name: 'hidden',
      title: '是否隱藏',
      type: 'boolean',
      description: '是否隱藏顯示在網頁上，如果設定true，就不會在網頁上顯示',
      initialValue: false
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
    },
  },
})

export default newsType