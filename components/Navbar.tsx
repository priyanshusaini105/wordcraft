import Link from 'next/link'
import React, { useContext } from 'react'
import Image from 'next/image';
import { TfiBook, TfiPencilAlt } from "react-icons/tfi";
import { IconType } from 'react-icons/lib';
import { ProfileContext } from '@/context';

interface INavItems {
    name: string;
    link: string;
    icon: IconType;
    id: string;
}

const navItems: INavItems[] = [{
    name: 'Write',
    link: '/write',
    icon: TfiPencilAlt,
    id: '1'
},
{
    name: 'Read',
    link: '/',
    icon: TfiBook,
    id: '2'
},
]

const Navbar = () => {
    const { login, photo, email, name, userId } = useContext(ProfileContext);

    return (
        <nav className='h-14 lg:px-10 px-1 bg-accent fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-2 bg-opacity-20 backdrop-blur shadow-md'>
            <Link href="/">
                <Image src="/img/logo-lg.png" alt="logo" width="200" height="35" />
            </Link>
            <ul className='list-none m-0 p-0 flex items-center'>
                {navItems.map((item, index) => (
                    <li key={index} className="mx-2 lg:mx-4 relative">
                        <Link href={item.link} className='text-gray-700 font-bold text-sm uppercase no-underline relative transition-colors duration-300 hover:text-primary flex gap-1 items-center'>
                            {<item.icon size={22} />}
                            {item.name}
                        </Link>
                    </li>
                ))}
                {login ?
                    <li className='m-3 relative'>
                        <Link href={`/${userId}`} className='' title={name ?? "Profile"}>
                            {photo!=="" ?
                                <Image
                                    src={photo}
                                    alt="Unable to load Image"
                                    width={30}
                                    height={30}
                                    className='rounded-full'
                                /> :
                                <span className='text-white font-semibold text-sm uppercase no-underline w-8 h-8 bg-primary rounded-full relative flex justify-center items-center'>{name ? name[0] : email[0]}</span>
                            }
                        </Link>
                    </li>
                    : <>
                        <li className='bg-primary rounded-2xl m-2 relative'>
                            <Link href="/login" className='text-white font-bold text-sm uppercase no-underline py-2 px-4 block relative duration-300'>Login
                            </Link>
                        </li>
                        <li className='bg-white hidden md:flex rounded-2xl m-2 relative shadow border border-gray-100'>
                            <Link href="/signup" className='text-primary font-bold text-sm uppercase no-underline py-2 px-4 block relative duration-300'>SignUp
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </nav>

    )
}

export default Navbar