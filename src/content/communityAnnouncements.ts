import { CommunityAnnouncement } from './types';

// Avisos temporales para la portada; actualizar fechas y vigencia al publicar el calendario real.
export const communityAnnouncements: CommunityAnnouncement[] = [
  {
    id: 'procesion-todos-los-santos-2026',
    title: 'Procesión de Todos los Santos',
    description: '¡Ven vestido de tu santo favorito!',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-11-01',
    eventTime: '4:00 p. m.',
    location: 'Plaza',
    status: 'draft',
  },
  {
    id: 'venta-libros-catecismo-noviembre-2026',
    title: 'Venta de libros del catecismo',
    description: 'Ya están disponibles los libros y materiales para todos los niveles.',
    category: 'aviso',
    publishedAt: '2026-11-01',
    location: 'Oficina de catequesis · 6:00 p. m. a 8:00 p. m.',
    imageKey: 'books',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'curso-sacramentos-jovenes-2026',
    title: 'Curso de sacramentos de iniciación cristiana',
    description: 'Formación para jóvenes de 15 a 21 años que desean recibir Bautismo, Primera Comunión o Confirmación.',
    category: 'inscripcion',
    publishedAt: '2026-11-01',
    location: 'Salón parroquial',
    audience: 'Jóvenes de 15 a 21 años',
    imageKey: 'sacraments',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'comienzo-adviento-2026',
    title: 'Comienza el Adviento',
    description: 'Iniciamos juntos el tiempo de preparación para recibir a Jesús. Vivamos estas semanas con esperanza, oración y alegría.',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-11-29',
    imageKey: 'advent',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'virgen-guadalupe-2026',
    title: 'Celebración de la Virgen de Guadalupe',
    description: 'Nos reunimos como comunidad para celebrar a Nuestra Señora de Guadalupe y compartir nuestra fe.',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-12-12',
    imageKey: 'guadalupe',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'oracion-en-familia-noviembre-2026',
    title: 'Una tarde de oración en familia',
    description: 'Hagamos una pausa para agradecer, escuchar la Palabra y compartir un momento de oración en familia.',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-11-22',
    imageKey: 'nativity',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'taller-preparando-adviento-2026',
    title: 'Preparemos juntos el Adviento',
    description: 'Un encuentro para descubrir cómo podemos preparar el corazón y vivir el Adviento con esperanza.',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-11-28',
    status: 'draft',
  },
];

export const communityAnnouncementsRepository = {
  getPublished: (): CommunityAnnouncement[] => communityAnnouncements.filter((item) => item.status === 'published'),
  getActive: (now = new Date()): CommunityAnnouncement[] => communityAnnouncements
    .filter((item) => item.status === 'published')
    .filter((item) => !item.visibleFrom || new Date(`${item.visibleFrom}T00:00:00`) <= now)
    .filter((item) => !item.visibleUntil || new Date(`${item.visibleUntil}T23:59:59`) >= now)
    .filter((item) => item.category !== 'evento' || !(item.eventEndsAt ?? item.eventDate) || new Date(`${item.eventEndsAt ?? item.eventDate}T23:59:59`) >= now)
    .sort((left, right) => {
      const priorityOrder = (right.priority ?? 'normal').localeCompare(left.priority ?? 'normal');
      if (priorityOrder !== 0) return priorityOrder;
      return (left.eventDate ?? left.visibleUntil ?? '9999-12-31').localeCompare(right.eventDate ?? right.visibleUntil ?? '9999-12-31');
    }),
  getById: (id: string): CommunityAnnouncement | undefined => communityAnnouncements.find((item) => item.id === id && item.status === 'published'),
};
