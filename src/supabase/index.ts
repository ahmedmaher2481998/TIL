import { Bucket } from '@/types'
import type { Database } from './database.types'
import { createClient } from '@supabase/supabase-js'
import { useToast } from '@/components'
import { notify, slugify } from '@/utils'
const { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } = import.meta.env
const supabaseUrl = VITE_SUPABASE_URL
const supabaseKey = VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
supabase.auth.initialize()
export default supabase

// ---------------------------Supabase Storage logic------------------------
type ImageType = 'cover' | 'avatar'
function getImageUploadPath({ img, str, type }: { img: File; str: string; type: ImageType }) {
  if (type === 'cover') return `blogs/covers/${str}-${Date.now()}-${img?.name}`
  if (type === 'avatar') return `avatars/${str}-${Date.now()}-${img?.name}`
  else throw new Error('un-recognized image type ')
}
export async function uploadImageFile({
  img,
  str,
  type
}: {
  img: File
  str: string
  type: ImageType
}): Promise<{
  id: string
  url: string
  path: string
}> {
  const path = getImageUploadPath({ img, str, type }) as string
  if (!path) {
    notify.error({
      title: 'failed uploading image',
      description: 'image upload type not supported'
    })
    throw new Error('failed uploading image')
  }
  const { data: uploadData, error } = await supabase.storage.from(Bucket).upload(path, img)
  if (error) {
    const { toast } = useToast()
    toast({
      title: 'sorry! something went wrong .',
      description: `${error.message}`,
      variant: 'destructive'
    })
  }
  if (!uploadData) {
    console.log('error', error)
    console.log('upload data', uploadData)
    throw new Error('upload data returned empty')
  }
  const { data: imageData } = supabase.storage.from(Bucket).getPublicUrl(uploadData?.path)
  return {
    id: uploadData.id,
    url: imageData.publicUrl,
    path: uploadData.path
  }
}
