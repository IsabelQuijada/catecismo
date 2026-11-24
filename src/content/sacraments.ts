export type Sacrament = {
  slug: 'bautismo' | 'primera-comunion' | 'confirmacion';
  title: string;
  summary: string;
  introduction: string;
  meaning: string;
  preparation: string;
  generalRequirements: string;
  catechism: string;
  catechismReference: string;
  requirementGroups: { title: string; items: string[] }[];
  requirementNotes?: string[];
  preparationInfo?: string;
  faq: { question: string; answer: string }[];
};

export const sacraments: Sacrament[] = [
  {
    slug: 'bautismo', title: 'Bautismo', summary: 'El comienzo de una nueva vida en Cristo.',
    introduction: 'El Bautismo es el comienzo de nuestra vida cristiana y nuestra bienvenida a la comunidad de la Iglesia.',
    meaning: 'Por el Bautismo somos unidos a Cristo, recibimos una vida nueva y formamos parte de la Iglesia.',
    preparation: 'La preparación ayuda a las familias a comprender el sacramento y a acompañar el crecimiento de la fe. Los padres y padrinos tienen un papel de apoyo y testimonio en este camino.',
    generalRequirements: 'La preparación y el acompañamiento de la familia son importantes. Consulta con la parroquia sobre los padrinos y la documentación necesaria.',
    catechismReference: 'CIC 1213',
    catechism: 'El santo Bautismo es el fundamento de toda la vida cristiana, el pórtico de la vida en el espíritu ("vitae spiritualis ianua") y la puerta que abre el acceso a los otros sacramentos. Por el Bautismo somos liberados del pecado y regenerados como hijos de Dios, llegamos a ser miembros de Cristo y somos incorporados a la Iglesia y hechos partícipes de su misión.',
    requirementGroups: [
      { title: 'Pláticas prebautismales', items: ['Primer y tercer miércoles de cada mes, a las 8:00 p. m. en el templo parroquial. Regístrate con anticipación en la Notaría Parroquial.'] },
      { title: 'Documentos requeridos', items: ['Acta de nacimiento del niño o niña expedida por el Registro Civil (original).', 'Comprobante de las pláticas prebautismales de papás y padrinos (original).', 'Identificación con fotografía de papás y padrinos.'] },
      { title: 'Requisitos para padrinos', items: ['Ser mayores de 16 años.', 'Contar con los sacramentos de iniciación: presentar acta de matrimonio religioso o, si es soltero, acta de Confirmación.', 'Llevar una vida acorde a la fe y poder comulgar.', 'Pueden ser padrinos personas solteras o casadas por la Iglesia. Las parejas que no están casadas por la Iglesia o que viven en unión libre no pueden ser padrinos.'] },
    ],
    requirementNotes: ['Lleva toda la documentación a la Notaría Parroquial al menos diez días antes del sacramento.', 'Pregunta en la Notaría Parroquial por los días y horarios de Bautismos.'],
    faq: [
      { question: '¿Qué es el Bautismo?', answer: 'Es el sacramento por el que comenzamos nuestra vida cristiana y somos incorporados a la Iglesia.' },
      { question: '¿Cuál es el papel de los padrinos?', answer: 'Acompañan a la persona bautizada y a su familia en el crecimiento de la fe.' },
      { question: '¿Dónde puedo preguntar por los requisitos?', answer: 'Nuestro equipo de catequesis puede orientarte y confirmar la información vigente.' },
    ],
  },
  {
    slug: 'primera-comunion', title: 'Primera Comunión', summary: 'Un encuentro especial con Jesús en la Eucaristía.',
    introduction: 'La Primera Comunión es un encuentro muy especial con Jesús en la Eucaristía, para el que nos preparamos con alegría y fe.',
    meaning: 'En la Eucaristía encontramos a Jesús y participamos de la vida y la oración de la comunidad cristiana. La Primera Comunión es la primera vez que recibimos este sacramento.',
    preparation: 'La catequesis ayuda a conocer a Jesús, comprender la Eucaristía y crecer en la oración. La participación de la familia acompaña este camino.',
    generalRequirements: 'La catequesis prepara a niñas y niños para recibir la Eucaristía. Consulta con la parroquia qué información se necesita para comenzar.',
    catechismReference: 'CIC 1323 (SC 47)',
    catechism: 'Nuestro Salvador, en la última Cena, la noche en que fue entregado, instituyó el Sacrificio Eucarístico de su cuerpo y su sangre para perpetuar por los siglos, hasta su vuelta, el sacrificio de la cruz y confiar así a su Esposa amada, la Iglesia, el memorial de su muerte y resurrección, sacramento de piedad, signo de unidad, vínculo de amor, banquete pascual en el que se recibe a Cristo, el alma se llena de gracia y se nos da una prenda de la gloria futura.',
    requirementGroups: [
      { title: 'Para recibir la Primera Comunión', items: ['Certificado de Catequesis Infantil.'] },
      { title: 'Para inscribirse a la catequesis', items: ['Copia del acta de Bautismo.', 'Copia del acta de nacimiento.', 'Comprobante de domicilio.'] },
    ],
    requirementNotes: ['Para conocer los días, horarios y demás información, pregunta en la Notaría Parroquial.'],
    faq: [
      { question: '¿Qué es la Primera Comunión?', answer: 'Es la primera vez que una persona recibe a Jesús en la Eucaristía.' },
      { question: '¿Por qué es importante la preparación?', answer: 'Ayuda a comprender el sacramento y a crecer en la fe junto con la familia y la comunidad.' },
      { question: '¿Cómo puedo conocer los grupos de catequesis?', answer: 'Contacta a catequesis para consultar los grupos y horarios disponibles.' },
    ],
  },
  {
    slug: 'confirmacion', title: 'Confirmación', summary: 'La fuerza del Espíritu Santo para vivir nuestra fe.',
    introduction: 'En la Confirmación recibimos de manera especial la fuerza del Espíritu Santo para fortalecer nuestra fe y vivir como testigos de Cristo.',
    meaning: 'La Confirmación fortalece la gracia del Bautismo y nos llama a vivir la fe y dar testimonio con la ayuda del Espíritu Santo.',
    preparation: 'La preparación invita a profundizar en la fe, conocer los dones del Espíritu Santo y participar en la vida de la comunidad. Los padrinos acompañan este camino.',
    generalRequirements: 'La preparación y el acompañamiento de un padrino o madrina forman parte de este camino. Consulta a la parroquia sobre los requisitos concretos.',
    catechismReference: 'CIC 1285 (LG 11)',
    catechism: 'Con el Bautismo y la Eucaristía, el sacramento de la Confirmación constituye el conjunto de los "sacramentos de la iniciación cristiana", cuya unidad debe ser salvaguardada.\n\nEs preciso, pues, explicar a los fieles que la recepción de este sacramento es necesaria para la plenitud de la gracia bautismal. En efecto, a los bautizados "el sacramento de la Confirmación los une más íntimamente a la Iglesia y los enriquece con una fortaleza especial del Espíritu Santo. De esta forma quedan obligados aún más, como auténticos testigos de Cristo, a extender y defender la fe con sus palabras y sus obras" (LG 11; cf. Ritual de la Confirmación, Prenotandos 2).',
    requirementGroups: [{ title: 'Para recibir la Confirmación', items: ['Copia del acta de Bautismo.', 'Comprobante de preparación para recibir el sacramento.'] }],
    faq: [
      { question: '¿Qué es la Confirmación?', answer: 'Es el sacramento que fortalece la gracia bautismal con el don del Espíritu Santo.' },
      { question: '¿Por qué nos preparamos?', answer: 'Para profundizar en nuestra fe y disponernos a vivirla y compartirla en comunidad.' },
      { question: '¿Dónde encuentro información sobre los cursos?', answer: 'El equipo de catequesis puede informarte sobre la preparación disponible.' },
    ],
  },
];
