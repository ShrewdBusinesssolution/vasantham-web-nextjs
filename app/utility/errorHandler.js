import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const handlePageError = async (error) => {
  console.log("🚀 ~ handlePageError ~ error:", error)
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
        <main className="h-auto w-full py-20 ">
          <div className="flex flex-col gap-5 items-center">
            <h6>{error?.message || 'An unknown error occurred'}</h6>
            <Link href="/">
              <Button variant="primary">
                Home
              </Button>
            </Link>
          </div>
        </main>
      )
  };
}
