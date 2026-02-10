import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-2 text-xl font-bold'>
      <Image
        suppressHydrationWarning
        src='/images/movie-discovery-app-logo.png'
        alt='Movie Discovery App Logo'
        width={32}
        height={32}
      />
      <span className='hidden bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent sm:inline'>
        MDA
      </span>
    </Link>
  );
};

export default Logo;
