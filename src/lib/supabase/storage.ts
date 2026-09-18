import { createClient } from './client';

export async function uploadArticleCover(file: File, slug: string): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${slug}-${Date.now()}.${fileExt}`;
  const filePath = `covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('article-covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload cover gagal: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('article-covers')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
