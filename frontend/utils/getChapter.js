import { mapaLibros } from '@/utils/mapaLibros';

export async function getChapter(book, chapter) {
    const bookSlug = typeof book === 'string' ? book : book.value;
    const chapterNumber = typeof chapter === 'number' ? chapter : chapter.value;

    // 1. Encontrar la clave en español cuyo valor coincide con el slug inglés
    const slugEsp = Object.keys(mapaLibros).find(
        key => mapaLibros[key] === bookSlug
    );

    if (!slugEsp) {
        throw new Error(`No existe slug para el libro: ${bookSlug}`);
    }

    const slug = mapaLibros[slugEsp];

    const bookData = await $fetch(`/api/bible/${slug}`);

    const chapterData = bookData[chapterNumber - 1];

    if (!chapterData) {
        throw new Error(`Capítulo ${chapterNumber} no encontrado en ${slug}`);
    }

    return chapterData;
}
