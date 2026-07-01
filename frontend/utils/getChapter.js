import { supabase } from '@/utils/supabase';

export async function getChapter(book, chapter) {
    const bookName = typeof book === 'string' ? book : book.value;
    const chapterNumber = typeof chapter === 'number' ? chapter : chapter.value;

    const { data, error } = await supabase
        .from('cached_chapters')
        .select('content')
        .eq('book', bookName)
        .eq('chapter', chapterNumber)
        .single();
    
    if (error && error.code !== 'PGRST116') {
        console.error('Error al buscar el capítulo en Supabase:', error);
    }
    
    //console.log('Loaded from cache');
    if (data) return data.content;

    const response = await fetch(`https://api.midvash.com/v1/rvr1960/${bookName}/${chapterNumber}`);
    if (!response.ok) {
        throw new Error(`API error, error al cargar el capítulo: ${response.status}`);
    }
    const json = await response.json();
    const content = json.data; 
    
    const { error: insertError } = await supabase
        .from('cached_chapters')
        .insert({
            book: bookName,
            chapter: chapterNumber,
            content
        });
    
    if (insertError) { 
        console.error("supabase insert error:", insertError);
    }
    console.log('Saved to cache');

    return content;
}
