export type Sacrament = {
  slug: 'bautismo' | 'primera-comunion' | 'confirmacion';
  title: string;
  summary: string;
  introduction: string;
  meaning: string;
  preparation: string;
  generalRequirements: string;
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
    faq: [
      { question: '¿Qué es la Confirmación?', answer: 'Es el sacramento que fortalece la gracia bautismal con el don del Espíritu Santo.' },
      { question: '¿Por qué nos preparamos?', answer: 'Para profundizar en nuestra fe y disponernos a vivirla y compartirla en comunidad.' },
      { question: '¿Dónde encuentro información sobre los cursos?', answer: 'El equipo de catequesis puede informarte sobre la preparación disponible.' },
    ],
  },
];
