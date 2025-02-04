import React from 'react';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='page-layout'>
            {children}
        </main>
    );
}
