'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function revalidateAll() {
  // Revalidate the entire site cache so any new/updated article shows up immediately
  revalidatePath('/', 'layout');
}

export async function deleteArticleAction(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/', 'layout');
    return true;
  } catch (err) {
    console.error('Delete article error:', err);
    throw err;
  }
}
