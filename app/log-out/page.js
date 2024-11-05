// app/sign-out/page.js
'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOutPage() {
    useEffect(() => {
        signOut({ callbackUrl: '/' }); // Sign out on the client side
    }, []);

    return (
        <main className='grid place-content-center py-10'>
            <p>logning you out...</p>
        </main>

    ); // You can add a loading state or message
}
