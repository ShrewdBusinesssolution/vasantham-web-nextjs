import { redirect } from "next/navigation";


export const metadata = {
    title: 'Under Maintenance',
    description: "Hindu Pooja Products - Wholesale - Kunnamkulam - Saraswathy Pooja",
}

export default async function Maintanance() {

    return (
        <main className='brand-container h-screen grid place-content-center'>
            <section className='flex justify-center items-center flex-col gap-5'>
                <h1 style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }} className='text-6xl xl:text-9xl md:text-7xl lg:text-8xl bg-gradient-to-br from-primary via-primary  to-[#300B09] text-center'>Under Maintenance!</h1>
                <p className='font-medium text-center'>503 - Service Unavailable</p>
                <p className='text-center text-[#938E8E] text-sm'>This site is currently undergoing maintenance. <br />
                    We&apos;re working to enhance your experience and will be back online shortly.  Please check back soon.</p>
            </section>
        </main>
    )
}
