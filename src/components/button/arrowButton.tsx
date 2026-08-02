// components/ArrowButton.tsx
import Link from "next/link";

interface ArrowButtonProps {
  href: string;
  className: string
}
const ArrowButton: React.FC<ArrowButtonProps> = ({ href, className }) => {
  return (
    <Link
      href={href}
      className={`group flex items-center px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
    >
      <span className="transform transition-transform duration-300 group-hover:translate-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
};

export default ArrowButton;
