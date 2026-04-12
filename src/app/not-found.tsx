import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-teal-950 to-teal-900 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            404
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Page Not Found 😅
        </h2>
        
        <p className="text-teal-200 text-base md:text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have wandered off into the digital void. 
          Don&apos;t worry, even AI agents get lost sometimes!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="#projects"
            className="px-8 py-3 bg-transparent border-2 border-teal-400 text-teal-400 font-semibold rounded-lg hover:bg-teal-400 hover:text-black transition-all duration-300"
          >
            View Projects
          </Link>
        </div>

        {/* Fun Element */}
        <div className="mt-12 text-6xl animate-bounce">
          🤖
        </div>
      </div>
    </div>
  );
}
