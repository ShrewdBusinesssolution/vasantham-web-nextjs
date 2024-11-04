import Link from 'next/link';
import { redirect } from 'next/navigation';

export const handlePageError = async (error) => {
  switch (error?.status) {
    case 503:
      redirect('/maintenance'); // Server under maintenance
    case 429:
      redirect('/too-many-attempts'); // Server under maintenance
    case 401:
      redirect('/log-out'); // Redirect to a client-side sign-out page
    case 404:
      redirect('/404'); // Redirect to custom "Not Found" page

    default:
      return (
        <main className="h-screen w-full grid place-content-center">
          <div className="flex flex-col gap-2 items-center">
            {error?.message || 'An unknown error occurred'}
            <Link href="/">Home</Link>
          </div>
        </main>
      )
  };
}
