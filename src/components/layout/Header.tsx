import {Link} from 'react-router-dom';

interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl?: string;
}

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl='#'
}: HeaderProps){
    return(
        <div className='mb-10'>
            <div className='flex justify-center'>
                <img alt='icon of code' className='h-14 w-14' src='/developer.png' />
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                {heading}
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600 mt-5'>
                {paragraph} {' '}
                <Link to={linkUrl} className='font-medium text-blue-600 hover:text-blue-500'>
                    {linkName}
                </Link>
            </p>
        </div>
    )
}