import { CommunityAnnouncement } from './types';

// Avisos temporales para la portada; actualizar fechas y vigencia al publicar el calendario real.
export const communityAnnouncements: CommunityAnnouncement[] = [
  {
    id: 'procesion-todos-los-santos-2026',
    title: 'Procesión de Todos los Santos',
    description: '¡Ven vestido de tu santo favorito!',
    details: 'Una invitación para reunirnos y recordar con alegría el ejemplo de los santos. Sus historias nos animan a vivir la fe con generosidad, esperanza y amor por los demás.\n\nSerá una ocasión para compartir como comunidad y descubrir juntos cómo podemos seguir su ejemplo en nuestra vida cotidiana.',
    quote: 'Caminamos juntos con alegría, inspirados por el testimonio de los santos.',
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
    details: 'Los libros y materiales de catequesis acompañan a niñas y niños durante su formación y ayudan a las familias a seguir el camino de aprendizaje en casa. Cada nivel cuenta con materiales adecuados para sus actividades.\n\nEn la oficina de catequesis puedes consultar cuáles corresponden a tu grupo y resolver cualquier duda sobre su adquisición.',
    quote: 'Cada página nos acompaña en el camino de aprender y crecer en la fe.',
    category: 'aviso',
    publishedAt: '2026-11-01',
    location: 'Oficina de catequesis',
    eventTime: '6:00 p. m. a 8:00 p. m.',
    imageKey: 'books',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'curso-sacramentos-jovenes-2026',
    title: 'Curso de sacramentos de iniciación cristiana',
    description: 'Formación para jóvenes de 15 a 21 años que desean recibir Bautismo, Primera Comunión o Confirmación.',
    details: 'Este curso acompaña a los jóvenes que desean prepararse para recibir los sacramentos de iniciación cristiana. Es un espacio para conocer más a Jesús, profundizar en la fe y compartir el camino con otros jóvenes de la comunidad.\n\nPara conocer los requisitos, la programación y los pasos para inscribirte, comunícate con el equipo de catequesis.',
    quote: 'Cada paso en la fe es una oportunidad para encontrarnos con Jesús y caminar en comunidad.',
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
    details: 'El Adviento nos invita a hacer una pausa y preparar el corazón para recibir a Jesús. Durante este tiempo, la oración, la esperanza y los pequeños gestos de amor nos ayudan a vivir la espera en familia y en comunidad.\n\nTe invitamos a acompañarnos y a descubrir maneras sencillas de compartir este tiempo especial con quienes nos rodean.',
    quote: 'En Adviento preparamos el corazón para recibir a Jesús con esperanza y alegría.',
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
    details: 'Esta celebración es una oportunidad para encontrarnos como comunidad y expresar nuestra devoción a la Virgen de Guadalupe. Juntos podemos agradecer su presencia en nuestra vida y renovar nuestra esperanza a través de la oración.\n\nInvitamos a las familias a compartir este momento de fe. Los detalles de la celebración se confirmarán con el equipo de catequesis.',
    quote: 'Con María de Guadalupe compartimos nuestra fe y caminamos unidos como comunidad.',
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
    description: 'Hagamos una pausa para agradecer, escuchar la Palabra y compartir un momento de oración en familia. Será un espacio sencillo para fortalecer nuestra fe y la unión en casa.',
    details: 'Este encuentro invita a las familias a hacer una pausa en sus actividades diarias para escuchar la Palabra, agradecer y compartir un momento de oración. Será una oportunidad para acercarnos a Jesús y fortalecer los lazos que nos unen.\n\nNiñas, niños y familiares podrán vivir juntos un espacio sencillo de fe y convivencia, acompañados por nuestra comunidad de catequesis.',
    category: 'evento',
    publishedAt: '2026-11-01',
    eventDate: '2026-11-22',
    eventTime: '4:00 p. m.',
    location: 'Salón Parroquial',
    audience: 'Niños y niñas de catequesis con sus papás, hermanos y familiares.',
    whatToBring: ['Una Biblia (si tienes en casa).', 'Tu cuaderno de catequesis.', 'Un corazón dispuesto a orar en familia.'],
    quote: 'La oración en familia fortalece nuestra fe, nos une y nos acerca más a Dios.',
    imageKey: 'nativity',
    visibleFrom: '2026-11-15',
    status: 'published',
  },
  {
    id: 'taller-preparando-adviento-2026',
    title: 'Preparemos juntos el Adviento',
    description: 'Un encuentro para descubrir cómo podemos preparar el corazón y vivir el Adviento con esperanza.',
    details: 'En este encuentro reflexionaremos sobre el sentido del Adviento y la alegría de preparar nuestro corazón para la llegada de Jesús. Compartir este tiempo nos ayuda a vivir la espera con esperanza y atención hacia los demás.\n\nSerá una oportunidad para caminar juntos como comunidad y llevar lo aprendido a nuestra vida en familia.',
    quote: 'Preparar el corazón en comunidad nos ayuda a vivir el Adviento con esperanza.',
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
