import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src="/images/studycepat-logo.png"
        alt="StudyCepat Logo"
        width={180}
        height={180}
      />
    </Link>
  );
}
