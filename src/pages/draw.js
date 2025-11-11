'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { Gift, Sparkles, TreePine, Snowflake, Star } from 'lucide-react';
import AOS from 'aos';
import Image from 'next/image';

const Dashboard = () => {
    const { data, status } = useSession();

  const [assign, setAssign] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [wait, setWait] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [user, setUser] = useState(null);



  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    let count = 0;
    shouldWait();
 
    if (data && count == 0) {
      console.log(data.user.email)
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/users/email/${data.user.email.toLowerCase()}`).then(res => {
        setUser(res.data);
        // Check if user has already drawn
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/draw/get-taker?giver=${res.data.id}`)
          .then(drawRes => {
            setAssign(drawRes.data);
          })
          .catch(drawError => {
            // If 404, user hasn't drawn yet, keep assign as null
            if (drawError.response?.status !== 404) {
              console.error('Error checking draw status:', drawError);
            }
          });
        count++;
      });
    }
  }, [data]);

  function shouldWait(){
    setTimeout(()=>{
      setWait(false)
    },3000)
  }


  // Precompute randomized positions/animation params so they don't change on every render
  const snowflakes = useMemo(() =>
    Array.from({ length: 40 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 7}s`,
      size: 8 + Math.random() * 16,
      tx: `${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 30}px`,
      opacityClass: Math.random() > 0.6 ? 'text-white/60' : 'text-white/30'
    })),
  []);

  const floaters = useMemo(() =>
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
      size: 10 + Math.random() * 20,
    })),
  []);

  const confetti = useMemo(() =>
    Array.from({ length: 80 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 100}s`,
      duration: `${2 + Math.random() * 2}s`,
      color: ['#ef4444', '#22c55e', '#fbbf24', '#3b82f6', '#ec4899', '#a855f7'][Math.floor(Math.random() * 6)],
      size: 4 + Math.random() * 8
    })),
  []);

  const fireworks = useMemo(() =>
    Array.from({ length: 8 }).map(() => ({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 60,
      delay: `${Math.random() * 1.5}s`,
      color: ['#ff0080', '#ff4040', '#40ff40', '#4040ff', '#ffff40', '#ff8040', '#8040ff', '#40ffff'][Math.floor(Math.random() * 8)]
    })),
  []);

  const sparkles = useMemo(() =>
    Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: 8 + Math.random() * 16
    })),
  []);

  const glitters = useMemo(() =>
    Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`
    })),
  []);

  function getSecretSanta() {
      if (user) {
        setIsDisabled(true);
        setShowFireworks(true); // Start fireworks immediately when button is clicked
        axios
          .post(`${process.env.NEXT_PUBLIC_BASE_URL}api/draw`, {
            giver: user.id,
          })
          .then((res) => {
            setAssign(res.data);
            setShowConfetti(true);
          })
          .catch((error) => {
            console.log(error);
            // If user has already drawn, set assign to the taker details from error response
            if (error.response?.status === 400 && error.response.data?.takerId) {
              setAssign(error.response.data);
            } else {
              setIsDisabled(false); // Re-enable button if it was a real error
            }
          });
      } else {
        setIsDisabled(true);
        getSecretSanta();
      }
  }
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-red-900 via-green-900 to-emerald-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Falling Snowflakes */}
        {snowflakes.map((s, i) => (
          <div
            key={`snow-${i}`}
            className="absolute animate-fall"
            style={{
              left: s.left,
              top: s.top,
              animationDelay: s.delay,
              animationDuration: s.duration,
              // pass translateX as a CSS variable used by the keyframes
              ['--tx']: s.tx,
            }}
          >
            <Snowflake
              className={s.opacityClass}
              size={s.size}
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))' }}
            />
          </div>
        ))}
        
        {/* Floating Snowflakes */}
        {floaters.map((f, i) => (
          <div
            key={`float-${i}`}
            className="absolute animate-float"
            style={{
              left: f.left,
              top: f.top,
              animationDelay: f.delay,
              animationDuration: f.duration,
            }}
          >
            <Snowflake className="text-white/30" size={f.size} />
          </div>
        ))}

        {/* Christmas Trees - Bottom Left */}
        <div className="absolute bottom-0 left-0 flex items-end gap-4 opacity-40">
          <TreePine className="text-green-600" size={120} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          <TreePine className="text-green-700" size={90} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          <TreePine className="text-green-600" size={100} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
        </div>

        {/* Christmas Trees - Bottom Right */}
        <div className="absolute bottom-0 right-0 flex items-end gap-4 opacity-40">
          <TreePine className="text-green-700" size={100} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          <TreePine className="text-green-600" size={85} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
          <TreePine className="text-green-700" size={110} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
        </div>

        {/* Small Trees scattered */}
        <TreePine className="absolute bottom-20 left-1/4 text-green-600 opacity-30" size={60} />
        <TreePine className="absolute bottom-32 right-1/3 text-green-700 opacity-30" size={70} />
        <TreePine className="absolute bottom-16 left-2/3 text-green-600 opacity-25" size={50} />

        {/* Animated Santa GIF */}
        <div className="absolute bottom-1/2 animate-sleigh-ride" style={{ zIndex: 20 }}>
          <Image
            src="/n1191598.gif"
            alt="Santa and Reindeer Sleigh"
            width={320}
            height={240}
            className="drop-shadow-2xl"
            priority={false}
            unoptimized={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Logo Area */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <TreePine className="text-green-400" size={48} />
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-green-400 to-red-400 animate-shimmer">
                Secret Santa
              </h1>
              <Gift className="text-red-400" size={48} />
            </div>
            <p className="text-white/80 text-xl flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-yellow-300" />
              Tecciance Christmas 2025
              <Sparkles size={20} className="text-yellow-300" />
            </p>
          </div>

          {/* Main Card */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 animate-scale-in">
            {/* Decorative Stars */}
            <Star className="absolute top-4 left-4 text-yellow-300 animate-pulse" size={24} />
            <Star className="absolute top-4 right-4 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} size={24} />
            <Star className="absolute bottom-4 left-4 text-yellow-300 animate-pulse" style={{ animationDelay: '1s' }} size={24} />
            <Star className="absolute bottom-4 right-4 text-yellow-300 animate-pulse" style={{ animationDelay: '1.5s' }} size={24} />

            {/* Content */}
            <div className="text-center space-y-8">
              {!assign ? (
                <>
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white animate-bounce-slow">
                      🎅 Ho Ho Ho! 🎄
                    </h2>
                    <p className="text-2xl text-white/90">
                      Ready to discover your Secret Santa match?
                    </p>
                    <p className="text-lg text-white/70">
                      Click the button below to reveal who you'll be gifting this Christmas!
                    </p>
                  </div>

                  {!isDisabled && !assign && (
                    <button
                      onClick={getSecretSanta}
                      disabled={wait}
                      className={`group relative px-12 py-5 text-2xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                        wait 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-size-200 animate-gradient hover:shadow-2xl hover:shadow-red-500/50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Gift className="group-hover:rotate-12 transition-transform" size={28} />
                        {wait ? 'Preparing Magic...' : 'Draw Your Match! 🎁'}
                        <Sparkles className="group-hover:rotate-12 transition-transform" size={28} />
                      </span>
                      {!wait && (
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="space-y-6 animate-reveal">
                  <div className="text-6xl animate-bounce">🎁</div>
                  <h3 className="text-3xl text-green-300 font-semibold">
                    Your Secret Santa Match
                  </h3>
                  <div className="bg-gradient-to-r from-red-500/30 to-green-500/30 rounded-2xl p-8 border-2 border-white/30">
                    <p className="text-2xl text-white/80 mb-3">Get a gift for:</p>
                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-red-200 to-green-200 animate-shimmer">
                      {assign.takerName}
                    </h2>
                  </div>
                  <p className="text-xl text-white/70 italic">
                    ✨ Make it special and spread the Christmas cheer! ✨
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white/60 text-sm">
            <p>May your holidays be filled with joy and laughter! 🌟</p>
          </div>

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

      {/* Confetti and Fireworks Effect */}
      {(showConfetti || showFireworks) && (
        <>
          {/* Button Click Confetti - Show immediately on button click */}
          {showFireworks && (
            <>
              {/* Button Click Confetti */}
              <div className="fixed inset-0 pointer-events-none z-60">
                {confetti.map((c, i) => (
                  <div
                    key={`click-confetti-${i}`}
                    className="absolute animate-confetti-repeat"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      top: '-10%', 
                      animationDelay: `${(i % 40) * 0.05}s`, 
                      animationDuration: `${2 + Math.random() * 2}s` 
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{ 
                        width: 6 + Math.random() * 10, 
                        height: 6 + Math.random() * 10, 
                        backgroundColor: c.color, 
                        boxShadow: `0 0 15px ${c.color}` 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Extra Confetti Burst */}
              <div className="fixed inset-0 pointer-events-none z-61">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={`burst-confetti-${i}`}
                    className="absolute animate-confetti-repeat"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      top: '-10%', 
                      animationDelay: `${(i % 50) * 0.04 + 1}s`, 
                      animationDuration: `${1.5 + Math.random() * 3}s` 
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{ 
                        width: 4 + Math.random() * 8, 
                        height: 4 + Math.random() * 8, 
                        backgroundColor: ['#ef4444', '#22c55e', '#fbbf24', '#3b82f6', '#ec4899', '#a855f7', '#f97316', '#10b981'][Math.floor(Math.random() * 8)], 
                        boxShadow: '0 0 10px currentColor' 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Magical Snow Effect */}
              <div className="fixed inset-0 pointer-events-none z-65">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`magical-snow-${i}`}
                    className="absolute animate-magical-snow"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10%',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    <Snowflake
                      className="text-white"
                      size={8 + Math.random() * 16}
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(135, 206, 235, 0.6))',
                        color: '#ffffff'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Golden Sparkles */}
              <div className="fixed inset-0 pointer-events-none z-55">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={`golden-sparkle-${i}`}
                    className="absolute animate-sparkle-golden"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    <Star 
                      className="text-yellow-300"
                      size={6 + Math.random() * 12}
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                        color: '#ffd700'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Heart-shaped Particles */}
              <div className="fixed inset-0 pointer-events-none z-58">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`heart-${i}`}
                    className="absolute animate-float-hearts"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <div
                      className="text-2xl animate-pulse"
                      style={{ 
                        color: '#ff69b4',
                        textShadow: '0 0 20px #ff69b4, 0 0 40px #ff69b4',
                      }}
                    >
                      💝
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Confetti Rain - Show after API success */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {confetti.map((c, i) => (
                <div
                  key={`confetti-${i}`}
                  className="absolute animate-confetti"
                  style={{ left: c.left, top: '-10%', animationDelay: c.delay, animationDuration: c.duration }}
                >
                  <div
                    className="rounded-full"
                    style={{ width: c.size, height: c.size, backgroundColor: c.color, boxShadow: '0 0 10px currentColor' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Result Fireworks - Show after API success */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {fireworks.map((f, i) => (
                <div key={`firework-${i}`} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%`, animationDelay: f.delay }}>
                  {[...Array(12)].map((_, j) => {
                    const angle = (j * 360) / 12;
                    return (
                      <div key={`particle-${j}`} className="absolute animate-firework-particle" style={{ animationDelay: f.delay }}>
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{
                            backgroundColor: f.color,
                            boxShadow: `0 0 15px ${f.color}, 0 0 30px ${f.color}`,
                            transform: `rotate(${angle}deg) translateX(0)`,
                            animation: `firework-expand 1s ease-in-out ${f.delay} forwards`
                          }}
                        />
                      </div>
                    )
                  })}

                  <div className="absolute w-4 h-4 rounded-full animate-burst" style={{ backgroundColor: f.color, boxShadow: `0 0 30px ${f.color}, 0 0 60px ${f.color}`, animationDelay: f.delay }} />
                </div>
              ))}
            </div>
          )}

          {/* Sparkle Stars */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {sparkles.map((s, i) => (
                <div key={`star-${i}`} className="absolute animate-sparkle" style={{ left: s.left, top: s.top, animationDelay: s.delay }}>
                  <Star className="text-yellow-300" size={s.size} style={{ filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.8))' }} />
                </div>
              ))}
            </div>
          )}

          {/* Magical Glitter Trail */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {glitters.map((g, i) => (
                <div key={`glitter-${i}`} className="absolute animate-glitter" style={{ left: g.left, top: g.top, animationDelay: g.delay }}>
                  <div className="w-1 h-1 bg-white rounded-full" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6)' }} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) translateX(var(--tx, 0)) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(var(--tx, 0)) rotate(360deg); opacity: 0.2; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes sleigh-ride {
          0% { 
            transform: translateX(-300px) translateY(20px) scaleX(1); 
          }
          10% { 
            transform: translateX(-300px) translateY(20px) scaleX(1); 
          }
          40% { 
            transform: translateX(calc(100vw + 50px)) translateY(20px) scaleX(1); 
          }
          50% { 
            transform: translateX(calc(100vw + 50px)) translateY(20px) scaleX(-1); 
          }
          60% { 
            transform: translateX(calc(100vw + 50px)) translateY(20px) scaleX(-1); 
          }
          90% { 
            transform: translateX(-300px) translateY(20px) scaleX(-1); 
          }
          100% { 
            transform: translateX(-300px) translateY(20px) scaleX(1); 
          }
        }
        @keyframes reindeer-jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes santa-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal {
          0% { transform: scale(0.8) rotateY(90deg); opacity: 0; }
          100% { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        @keyframes confetti {
          0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh) rotate(720deg) scale(0.5); 
            opacity: 0;
          }
        }
        @keyframes confetti-repeat {
          0% { 
            transform: translateY(-20px) rotate(0deg) scale(1); 
            opacity: 0; 
          }
          5% { 
            opacity: 1; 
          }
          25% { 
            transform: translateY(100vh) rotate(720deg) scale(0.5); 
            opacity: 0;
          }
          25.1%, 100% { 
            transform: translateY(-20px) rotate(0deg) scale(1); 
            opacity: 0;
          }
        }
        @keyframes firework-expand {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(100px) scale(0); opacity: 0; }
        }
        @keyframes firework-expand-large {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          100% { transform: translateX(150px) scale(0); opacity: 0; }
        }
        @keyframes burst {
          0% { 
            transform: scale(0); 
            opacity: 1; 
          }
          50% { 
            transform: scale(3); 
            opacity: 0.8; 
          }
          100% { 
            transform: scale(5); 
            opacity: 0; 
          }
        }
        @keyframes burst-large {
          0% { 
            transform: scale(0); 
            opacity: 1; 
          }
          30% { 
            transform: scale(2); 
            opacity: 1; 
          }
          70% { 
            transform: scale(6); 
            opacity: 0.6; 
          }
          100% { 
            transform: scale(10); 
            opacity: 0; 
          }
        }
        @keyframes magical-snow {
          0% { 
            transform: translateY(0) translateX(0) rotate(0deg) scale(0); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
            transform: translateY(50px) translateX(10px) rotate(45deg) scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: translateY(50vh) translateX(-20px) rotate(180deg) scale(1.2); 
          }
          90% { 
            opacity: 0.6; 
            transform: translateY(90vh) translateX(30px) rotate(315deg) scale(0.8); 
          }
          100% { 
            transform: translateY(100vh) translateX(0) rotate(360deg) scale(0); 
            opacity: 0; 
          }
        }
        @keyframes sparkle-golden {
          0%, 100% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          25% { 
            transform: scale(1.5) rotate(90deg); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1) rotate(180deg); 
            opacity: 0.8; 
          }
          75% { 
            transform: scale(1.2) rotate(270deg); 
            opacity: 0.6; 
          }
        }
        @keyframes float-hearts {
          0% { 
            transform: translateY(0) scale(0) rotate(0deg); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
            transform: translateY(-20px) scale(1) rotate(0deg); 
          }
          50% { 
            transform: translateY(-60px) scale(1.2) rotate(180deg); 
            opacity: 0.8; 
          }
          80% { 
            transform: translateY(-100px) scale(0.8) rotate(360deg); 
            opacity: 0.4; 
          }
          100% { 
            transform: translateY(-150px) scale(0) rotate(540deg); 
            opacity: 0; 
          }
        }
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          50% { 
            transform: scale(1.5) rotate(180deg); 
            opacity: 1; 
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
        
          .animate-logo-float {
            animation: logo-float 3s ease-in-out infinite;
          }

          .animate-logo-pulse {
            animation: logo-pulse 2s ease-in-out infinite;
          }
            
          
        @keyframes glitter {
          0%, 100% { 
            transform: scale(0) translateY(0); 
            opacity: 0; 
          }
          25% { 
            transform: scale(1.5) translateY(-20px); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1) translateY(-40px); 
            opacity: 0.8; 
          }
          75% { 
            transform: scale(1.2) translateY(-60px); 
            opacity: 0.6; 
          }
        }
  .animate-fall { animation: fall linear infinite; will-change: transform; }
        .animate-float { animation: float linear infinite; }
        .animate-sleigh-ride { animation: sleigh-ride 18s ease-in-out infinite; }
        .animate-reindeer-jump { animation: reindeer-jump 0.6s ease-in-out infinite; }
        .animate-santa-wave { 
          transform-origin: bottom center;
          animation: santa-wave 2s ease-in-out infinite; 
        }
        .animate-shimmer { 
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-reveal { animation: reveal 0.8s ease-out; }
  .animate-confetti { animation: confetti linear forwards; will-change: transform, opacity; }
  .animate-confetti-repeat { animation: confetti-repeat 4s linear infinite; will-change: transform, opacity; }
  .animate-firework-particle { animation: firework-expand 1s ease-out forwards; will-change: transform, opacity; }
        .animate-burst { animation: burst 1s ease-out forwards; }
        .animate-burst-large { animation: burst-large 2s ease-out forwards; }
        .animate-magical-snow { animation: magical-snow 3s ease-out infinite; }
        .animate-sparkle-golden { animation: sparkle-golden 3s ease-in-out infinite; }
        .animate-float-hearts { animation: float-hearts 4s ease-out infinite; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-glitter { animation: glitter 3s ease-out infinite; }
        .bg-size-200 { background-size: 200% 200%; }
      `}</style>
    </div>
  );
};

export default Dashboard;