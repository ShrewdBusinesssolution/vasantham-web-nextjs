import { checkSessionAndRedirect } from '@/app/utility/sessionHelper';
import MainClientComponentProfile from './client-components/main-client-component';

 const Page = async() => {
  await checkSessionAndRedirect("", '/login');
  return (
    <main className='bg-[#fcfcfc] py-6'>
      <MainClientComponentProfile />
    </main>
  );
}



export default Page;
