import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <Authenticated>
            <Head title="Reddit - Dive into anything" />
            <div className='w-10 h-full'></div>
            <div className='w-10 h-full'></div>
            <div className='w-10 h-full'></div>
            <div className='w-10 h-screen'></div>
        </Authenticated>
    );
}
