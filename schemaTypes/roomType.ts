import {defineField, defineType} from 'sanity'

const roomType = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({
      title:"房間名稱",
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title:"房間編號",
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => [
        rule.required(),
      ],
    }),
    defineField({
      title:"房間照片",
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      title:"房間細節",
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})

export default roomType