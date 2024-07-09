import React from 'react';

export default function GridLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='grid-layout'>
            <section className='container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                {children}
            </section>
        </main>
    );
}
