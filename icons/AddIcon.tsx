export default function AddIcon({ className }: IconType) {

    const svgClassName = className || 'w-[22px] h-[22px]';

    return <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={svgClassName}
        fillRule="evenodd"
        clipRule="evenodd">
        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
    </svg>
}