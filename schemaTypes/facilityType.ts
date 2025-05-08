import {defineField, defineType, type ValidationContext} from 'sanity'
import groq from 'groq';



const isUniqueOrder = async (order:number, context:ValidationContext) => {
  const { document, getClient } = context;
  const client = getClient({apiVersion:`${process.env.SANITY_STUDIO_API_VERSION}`})

  const id = document?._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    order,
  };

  /* groq */
  const query = groq`!defined(*[
    _type == 'facility' &&
    !(_id in [$draft, $published]) &&
    order == $order
  ][0]._id)`;

  return client.fetch(query, params);
};

const facilityType = defineType({
  name: 'facility',
  title: 'Facility',
  type: 'document',
  fields: [
    defineField({
      title:"設施名稱",
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      title:"設施照片",
      name: 'image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title:"設施描述",
      name: 'description',
      type: 'string',
      description:"可以寫一些關於設施的文案"
    }),
    defineField({
      title:"顯示順序",
        name: 'order',
        type: 'number',
        options:{
          
        },
        validation: (rule) => [
          rule.required(),
          rule.integer(),
          rule.custom(async(order, context)=>{
            if(!order) return true
            const isUnique = await isUniqueOrder(order, context);
            if (!isUnique) return '這個順序已經被使用了';
            return true;
          })
        ],
    }),
  ],
})

export default facilityType