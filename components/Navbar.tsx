import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../public/img/logo-lg.png'
import Image from 'next/image';
import { TfiBook,TfiPencilAlt } from "react-icons/tfi";
import { IconType } from 'react-icons/lib';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { FaUserAlt } from 'react-icons/fa';

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
    link: '/read',
    icon: TfiBook,
    id: '2'
},
]

const Navbar = () => {
    const [user, setUser] = useState<User|null>(null)
    // redirect if user already exist
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, function (user) {
            if (user) setUser(user)
        });
        return unsubscribe;
    }, [])

    return (
        <nav className='lg:px-10 px-1 bg-accent fixed top-0 left-0 right-0 z-50 flex justify-between items-center gap-2 bg-opacity-20 backdrop-blur shadow-md'>
            <Link href="/">
                <Image src="/img/logo-lg.png" alt="logo" width="200" height="35" />
            </Link>
            <ul className='list-none m-0 p-0 flex items-center'>
                {navItems.map((item, index) => (
                    <li key={index} className="mx-2 lg:mx-4 relative">
                        <Link href={item.link} className='text-gray-700 font-bold text-sm uppercase no-underline relative transition-colors duration-300 hover:text-primary flex gap-1 items-center'>
                            {<item.icon size={22}/>}
                            {item.name}
                        </Link>
                    </li>
                ))}
                {user?
                <li className='m-2 relative'>
                    <Link href="/profile" className='text-white font-bold text-sm uppercase no-underline block p-2 bg-primary rounded-full relative hover:bg-transparent duration-300 '>
                        <FaUserAlt size={26} className='hover:text-primary ease-in duration-150'/>
                    </Link>
                </li>
                :<li className='bg-primary rounded-2xl m-2 relative'>
                    <Link href="/login" className='text-white font-bold text-sm uppercase no-underline py-2 px-4 block relative duration-300'>Login
                    </Link>
                </li>}
            </ul>
        </nav>

    )
}

export default Navbar