import Link, { LinkProps } from "next/link";

type NavLinkProp = {
    isActive?: boolean
} & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function NavLink({ isActive, children, ...props }: NavLinkProp) {
    return <Link className={`group py-4 md:px-3 md:py-2 rounded w-full md:w-auto leading-none text-center hover:bg-gray-500 hover:text-white transition-colors ease-in-out duration-300`} {...props} >
        <span className={`uppercase text-sm  ${isActive ? 'text-gray-600 font-bold group-hover:text-white ' : ''}`}>{children}</span>
    </Link>
}