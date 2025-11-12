import Head from 'next/head';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { TreePine, Gift, Sparkles, Star, Snowflake } from 'lucide-react';


export default function Home() {
  return (
    <>
      <Head>
        <title>Tecciance | Secret Santa</title>
        <meta name="description" content="Tecciance Secret Santa Gift Exchange" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-green-900 to-red-900">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-green-600/30 to-red-600/30 animate-gradient-shift"></div>

        {/* Snowflakes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            >
              <Snowflake
                className="text-white/30"
                size={8 + Math.random() * 16}
              />
            </div>
          ))}
        </div>

        {/* Twinkling Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <Star
                className="text-yellow-300"
                size={4 + Math.random() * 8}
                fill="currentColor"
              />
            </div>
          ))}
        </div>

        {/* Christmas Trees Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Christmas Trees - Bottom Left */}
          <div className="absolute bottom-0 left-0 flex items-end gap-4 opacity-40">
            <TreePine className="text-green-600" size={120} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
            <TreePine className="text-green-700" size={90} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
            <TreePine className="text-green-600" size={150} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          </div>

          {/* Christmas Trees - Bottom Right */}
          <div className="absolute bottom-0 right-0 flex items-end gap-4 opacity-40">
            <TreePine className="text-green-700" size={100} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
            <TreePine className="text-green-600" size={85} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
            <TreePine className="text-green-700" size={110} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          </div>

          {/* Small Trees scattered around */}
          <TreePine className="absolute bottom-20 left-1/4 text-green-600 opacity-30" size={60} />
          <TreePine className="absolute bottom-32 right-1/3 text-green-700 opacity-30" size={70} />
          <TreePine className="absolute bottom-16 left-2/3 text-green-600 opacity-25" size={50} />
          <TreePine className="absolute bottom-24 left-1/6 text-green-700 opacity-35" size={45} />
          <TreePine className="absolute bottom-28 right-1/5 text-green-600 opacity-30" size={55} />

          {/* Medium Trees for depth */}
          <TreePine className="absolute bottom-10 left-1/2 text-green-700 opacity-20" size={80} />
          <TreePine className="absolute bottom-12 left-3/4 text-green-600 opacity-25" size={65} />
          <TreePine className="absolute bottom-18 right-2/5 text-green-700 opacity-20" size={75} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-4xl">
            {/* Logo Area */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-4">
                <TreePine className="text-green-400 animate-bounce-slow" size={48} />
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-red-400 animate-shimmer">
                  Secret Santa
                </h1>
                <Gift className="text-red-400 animate-bounce-slow" size={48} style={{ animationDelay: '0.5s' }} />
              </div>
              <p className="text-white/80 text-xl flex items-center justify-center gap-2">
                <Sparkles size={20} className="text-yellow-300 animate-pulse" />
                Tecciance Christmas 2025
                <Sparkles size={20} className="text-yellow-300 animate-pulse" />
              </p>
            </div>

            {/* Main Card */}
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 animate-scale-in">
              {/* Decorative Stars */}
              <Star className="absolute top-4 left-4 text-yellow-300 animate-pulse" size={24} fill="currentColor" />
              <Star className="absolute top-4 right-4 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} size={24} fill="currentColor" />
              <Star className="absolute bottom-4 left-4 text-yellow-300 animate-pulse" style={{ animationDelay: '1s' }} size={24} fill="currentColor" />
              <Star className="absolute bottom-4 right-4 text-yellow-300 animate-pulse" style={{ animationDelay: '1.5s' }} size={24} fill="currentColor" />

              {/* Content */}
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-white animate-bounce-slow">
                    🎅 Ho Ho Ho! 🎄
                  </h2>
                  <p className="text-2xl text-white/90">
                    Welcome to the Magical Christmas Gift Exchange!
                  </p>
                  <p className="text-lg text-white/70">
                    Sign in to join the festive fun and discover your Secret Santa match!
                  </p>
                </div>

                <button
                  onClick={() => {
                    signIn(
                      'azure-ad',
                      { callbackUrl: '/draw' },
                      { prompt: 'login' },
                    );
                  }}
                  className="group relative px-12 py-5 text-2xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-size-200 animate-gradient hover:shadow-2xl hover:shadow-red-500/50"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Gift className="group-hover:rotate-12 transition-transform" size={28} />
                    Let's Get Started! 🎁
                    <Sparkles className="group-hover:rotate-12 transition-transform" size={28} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <div className="flex items-center justify-center gap-2 text-white/60 text-sm mt-6">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Secure Microsoft Login</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-white/60 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p>May your holidays be filled with joy and laughter! 🌟</p>
            </div>

            {/* Tecciance Logo */}
            <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="inline-block p-4 animate-logo-float">
                <Image
                  src="/teclogo.png"
                  alt="Tecciance Logo"
                  width={220}
                  height={130}
                  className="opacity-90 hover:opacity-100 transition-all duration-300 animate-logo-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.4)) brightness(1.2)',
                  }}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes snowfall {
            0% {
              transform: translateY(-10vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes shimmer {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes logo-float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes logo-pulse {
            0%, 100% {
              filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.4)) brightness(1.2);
            }
            50% {
              filter: drop-shadow(0 0 30px rgba(255, 255, 255, 1)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.6)) brightness(1.4);
            }
          }

          .animate-snowfall {
            animation: snowfall linear infinite;
          }

          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }

          .animate-shimmer {
            background-size: 200% 200%;
            animation: shimmer 3s ease infinite;
          }

          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }

          .animate-twinkle {
            animation: twinkle 2s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }

          .animate-scale-in {
            animation: scale-in 0.5s ease-out forwards;
          }

          .animate-logo-float {
            animation: logo-float 3s ease-in-out infinite;
          }

          .animate-logo-pulse {
            animation: logo-pulse 2s ease-in-out infinite;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
          }

          .bg-size-200 {
            background-size: 200% 200%;
          }
        `}</style>
      </main>
    </>
  );
}