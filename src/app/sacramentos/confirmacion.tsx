import { Head } from 'expo-router/head';
import { SacramentPage } from '../../components/sacraments';
import { sacraments } from '../../content/sacraments';

const item = sacraments.find((sacrament) => sacrament.slug === 'confirmacion')!;
export default function Page() { return <><Head><title>{item.title} | Catequesis Infantil Cocula</title><meta name="description" content={item.introduction} /></Head><SacramentPage item={item} /></>; }
