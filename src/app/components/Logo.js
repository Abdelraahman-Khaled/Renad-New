import Image from "next/image";

export default function Logo({ className = "", ...props }) {
  return (
    <a href="#top" className={`flex items-center ${className}`}>
      <Image
        src="/logo.webp"
        alt="Renad International Trading"
        width={978}
        height={610}
        priority
        className="h-14 w-auto"
      />
    </a>
  );
}
