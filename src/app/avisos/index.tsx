import { Redirect } from 'expo-router';

export default function NoticesRedirect() {
  return <Redirect href={{ pathname: '/', params: { seccion: 'avisos' } }} />;
}
