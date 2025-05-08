import { type SlugValidationContext } from "sanity"

export default async function isUniqueAcrossAllDocuments(slug:string, context:SlugValidationContext) :Promise<boolean>{
    const {document, getClient} = context
    const client = getClient({apiVersion: `${process.env.SANITY_STUDIO_API_VERSION}`})
    const id = document?._id.replace(/^drafts\./, '')
    const params = {
      draft: `drafts.${id}`,
      published: id,
      slug,
    }
    const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`
    const result = await client.fetch(query, params)
    return result
  }