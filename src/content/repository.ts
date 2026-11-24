import { Announcement, CatechesisCenter, Course, Event, GalleryAlbum, SacramentPath, SiteSettings } from './types';
import { communityAnnouncementsRepository } from './communityAnnouncements';

// This repository is the only interface the UI uses. Replace the empty adapters
// with GROQ-backed Sanity fetchers after project credentials are configured.
export const siteSettings: SiteSettings = { siteName: 'Catequesis Cocula Jalisco', parishName: 'Parroquia San Miguel Arcángel', city: 'Cocula, Jalisco', contactIntro: 'Para dudas sobre cursos, inscripciones y requisitos, comunícate con la parroquia por Messenger.', messengerUrl: 'https://www.facebook.com/CatequesisCocula/', contactLabel: 'Enviar mensaje por Messenger' };
export const announcements: Announcement[] = [{ id: 'inscripciones-2026', category: 'inscription', eyebrow: 'Inscripciones 2026', title: '¡Comienza una nueva aventura de fe!', summary: 'Conoce los requisitos, horarios y grupos para formar parte de nuestra catequesis.', priority: 'high', variant: 'important', action: { label: 'Consultar requisitos y horarios', href: '/contacto' } }];
export const events: Event[] = [
  { id: 'families', title: 'Encuentro de familias', description: 'Una tarde para conocernos, compartir y comenzar el camino juntos.', imageUrl: 'https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=900&q=80', startsAt: '2026-12-06T17:00:00', location: 'Salón parroquial', audience: 'Familias de catequesis', status: 'active', action: { label: 'Ver detalles', href: '/contacto' } },
  { id: 'advent', title: 'Celebración de Adviento', description: 'Preparamos el corazón para recibir a Jesús con oración y comunidad.', imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80', startsAt: '2026-12-13T18:00:00', location: 'Templo parroquial', audience: 'Niños, jóvenes y adultos', status: 'active', action: { label: 'Conocer más', href: '/eventos' } },
];
export const courses: Course[] = [
  { id: 'children', title: 'Catequesis infantil', audience: 'Niñas y niños', sacrament: 'Preparación para Primera Comunión', imageUrl: 'https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=900&q=80', requirements: ['Acta de nacimiento', 'Constancia de bautismo'], status: 'active', action: { label: 'Solicitar información', href: '/contacto' } },
  { id: 'adults', title: 'Camino para adultos', audience: 'Mayores de edad', sacrament: 'Iniciación cristiana y Confirmación', imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80', requirements: ['Identificación oficial', 'Acudir a la notaría parroquial'], status: 'active', action: { label: 'Solicitar información', href: '/contacto' } },
];
// Contenido temporal: sustituir por la información confirmada de cada barrio antes del lanzamiento público.
export const catechesisCenters: CatechesisCenter[] = [
  { id: 'templo-la-cruz', neighborhood: 'Barrio de la Cruz', name: 'Templo de la Cruz', venue: 'Lugar de reunión por confirmar', address: 'Galeana, La Cruz, 48500 Cocula, Jal., México', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20la%20Cruz%2C%20Galeana%2C%20La%20Cruz%2C%2048500%20Cocula%2C%20Jalisco%2C%20M%C3%A9xico', coordinators: ['Equipo de catequesis · por confirmar'], schedules: [{ id: 'ejemplo-sabado', label: 'Grupo de ejemplo', weekday: 'Sábado', time: '3:00 a 5:00 p. m.', note: 'Horario de ejemplo · por confirmar', status: 'active' }], status: 'active' },
  { id: 'templo-la-ascencion', neighborhood: 'La Ascensión', name: 'Templo de la Ascensión', venue: 'Lugar de reunión por confirmar', address: 'Rafael Méndez Moreno 25, La Ascención, 48500 Cocula, Jal., México', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20la%20Ascensi%C3%B3n%2C%20Rafael%20M%C3%A9ndez%20Moreno%2025%2C%20La%20Ascenci%C3%B3n%2C%2048500%20Cocula%2C%20Jalisco%2C%20M%C3%A9xico', coordinators: ['Equipo de catequesis · por confirmar'], schedules: [{ id: 'ejemplo-sabado', label: 'Grupo de ejemplo', weekday: 'Sábado', time: '3:00 a 5:00 p. m.', note: 'Horario de ejemplo · por confirmar', status: 'active' }], status: 'active' },
  { id: 'templo-san-juan', neighborhood: 'San Juan', name: 'Templo de San Juan', venue: 'Lugar de reunión por confirmar', address: 'Calle Xicoténcatl, Barrio de San Juan, C.P. 48500, Cocula, Jalisco, México', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20San%20Juan%2C%20Calle%20Xicot%C3%A9ncatl%2C%20Barrio%20de%20San%20Juan%2C%2048500%20Cocula%2C%20Jalisco%2C%20M%C3%A9xico', coordinators: ['Equipo de catequesis · por confirmar'], schedules: [{ id: 'ejemplo-sabado', label: 'Grupo de ejemplo', weekday: 'Sábado', time: '3:00 a 5:00 p. m.', note: 'Horario de ejemplo · por confirmar', status: 'active' }], status: 'active' },
  { id: 'templo-san-pedro', neighborhood: 'San Pedro', name: 'Templo de San Pedro', venue: 'Lugar de reunión por confirmar', address: 'Calle Corregidora 169, Barrio de San Pedro, C.P. 48500, Cocula, Jalisco, México', mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20San%20Pedro%2C%20Calle%20Corregidora%20169%2C%20Barrio%20de%20San%20Pedro%2C%2048500%20Cocula%2C%20Jalisco%2C%20M%C3%A9xico', coordinators: ['Equipo de catequesis · por confirmar'], schedules: [{ id: 'ejemplo-sabado', label: 'Grupo de ejemplo', weekday: 'Sábado', time: '3:00 a 5:00 p. m.', note: 'Horario de ejemplo · por confirmar', status: 'active' }], status: 'active' },
];
export const sacramentPaths: SacramentPath[] = [
  { id: 'bautismo', title: 'Bautismo', description: 'El comienzo de una vida nueva en Cristo.', note: 'Los requisitos y fechas se publicarán en cada convocatoria.' },
  { id: 'comunion', title: 'Primera Comunión', description: 'Un encuentro profundo con Jesús en la Eucaristía.', note: 'Los requisitos y fechas se publicarán en cada convocatoria.' },
  { id: 'confirmacion', title: 'Confirmación', description: 'La fuerza del Espíritu Santo para dar testimonio.', note: 'Los requisitos y fechas se publicarán en cada convocatoria.' },
];
export const galleryAlbums: GalleryAlbum[] = [
  { id: 'fe', title: 'Fe', description: 'Momentos de oración y encuentro.', imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80', dateLabel: 'Contenido de muestra' },
  { id: 'comunidad', title: 'Comunidad', description: 'La alegría de caminar juntos.', imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80', dateLabel: 'Contenido de muestra' },
  { id: 'esperanza', title: 'Esperanza', description: 'Celebraciones que nos unen.', imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80', dateLabel: 'Contenido de muestra' },
];

export const contentRepository = {
  getActiveAnnouncement: (): Announcement | undefined => announcements.find((notice) => notice.priority === 'high'),
  getUpcomingEvents: (): Event[] => events.filter((event) => event.status === 'active'),
  getOpenCourses: (): Course[] => courses.filter((course) => course.status === 'active'),
  getActiveCenters: (): CatechesisCenter[] => catechesisCenters.filter((center) => center.status === 'active'),
  getPublishedCommunityAnnouncements: communityAnnouncementsRepository.getPublished,
  getActiveCommunityAnnouncements: communityAnnouncementsRepository.getActive,
  getCommunityAnnouncementById: communityAnnouncementsRepository.getById,
  getFeaturedGallery: (): GalleryAlbum[] => galleryAlbums,
};
