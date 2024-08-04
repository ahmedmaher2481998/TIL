import { Bucket } from "@/types";
import type { Database } from "./database.types";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/components";
const { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } = import.meta.env
const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
export default supabase


export async function uploadImageFile(img: File, path: string): Promise<{
  id: string;
  url: string;
  path: string;
}> {
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
    throw new Error("upload data returned empty")
  }
  const { data: imageData } = supabase.storage.from(Bucket).getPublicUrl(uploadData?.path)
  return {
    id: uploadData.id,
    url: imageData.publicUrl,
    path: uploadData.path
  }
}
