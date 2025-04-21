import {Link } from '@inertiajs/react';

export default function Cards({
    href,
    titulo = '',
    detalle,
    ...props
}) {
    return (


        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{titulo}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-200">{detalle}</p>
        <Link
            href={href}
            className="text-white bg-blue-400 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        > Ingresar
        </Link>
        </div>

    );
}

