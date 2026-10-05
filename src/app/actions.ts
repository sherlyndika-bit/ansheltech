'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateAll() {
  // Revalidate the entire site cache so any new/updated article shows up immediately
  revalidatePath('/', 'layout');
}
