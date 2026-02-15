import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const iconMap = {
  'rocket': 'Rocket',
  'flame': 'Flame',
  'trending-up': 'TrendingUp',
  'star': 'Star',
  'zap': 'Zap',
  'skull': 'Skull',
  'moon': 'Moon',
  'gem': 'Gem',
  'crown': 'Crown',
  'fire': 'Flame',
  'dollar-sign': 'DollarSign',
  'arrow-up': 'ArrowUp',
  'arrow-down': 'ArrowDown',
  'check': 'Check',
  'x': 'X',
  'menu': 'Menu',
  'send': 'Send',
  'message-circle': 'MessageCircle',
  'twitter': 'Twitter',
  'github': 'Github',
  'globe': 'Globe',
  'disc': 'Disc',
  'trophy': 'Trophy',
  'target': 'Target',
  'users': 'Users',
  'award': 'Award',
  'sparkles': 'Sparkles'
}

// Import icons statically to avoid dynamic import issues
import {
  Rocket, Flame, TrendingUp, Star, Zap, Skull, Moon,
  Gem, Crown, DollarSign, ArrowUp, Check, X, Menu,
  Send, MessageCircle, Twitter, Github, Globe, Disc,
  Trophy, Target, Users, Award, Sparkles, ArrowRight
} from 'lucide-react'

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 33,
    seconds: 12
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        className="sketchy-box bg-yellow-300 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center mb-2"
      >
        <span className="font-marker text-3xl md:text-5xl text-amber-900">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="font-comic font-bold text-amber-900 uppercase text-sm md:text-base">{label}</span>
    </div>
  )

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

// Exploding Button Component
const ExplodingButton = ({ children, onClick, className = '' }) => {
  const [particles, setParticles] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i * 30) * (Math.PI / 180),
      color: ['#fbbf24', '#f59e0b', '#d97706', '#fef08a'][Math.floor(Math.random() * 4)]
    }))

    setParticles(newParticles)

    setTimeout(() => setParticles([]), 1000)

    if (onClick) onClick(e)
  }

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={cn("sketchy-button", className)}
      >
        {children}
      </motion.button>

      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(particle.angle) * 100,
              y: Math.sin(particle.angle) * 100,
              opacity: 0,
              scale: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{ backgroundColor: particle.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Roadmap Tree Component
const RoadmapTree = () => {
  const milestones = [
    { phase: 'PHASE 1', title: 'Launch & GM', desc: 'Token launch, initial liquidity, and GM to all degens!', icon: 'rocket', completed: true },
    { phase: 'PHASE 2', title: 'Meme Galleries', desc: 'Sponge meme gallery release, WAGMI community growth', icon: 'flame', completed: true },
    { phase: 'PHASE 3', title: 'CEX Listings', desc: 'When lambo? Major exchange listings and partnerships', icon: 'trending-up', completed: false },
    { phase: 'PHASE 4', title: 'To The Moon', desc: 'Global domination, NFT collection, and beyond!', icon: 'moon', completed: false }
  ]

  return (
    <div className="relative py-12 px-4">
      {/* Tree/Mountain SVG Path */}
      <svg className="absolute left-1/2 transform -translate-x-1/2 h-full w-4 md:w-8 top-0" style={{ zIndex: 0 }}>
        <motion.path
          d="M 8 0 Q 4 100 8 200 Q 12 300 8 400 Q 4 500 8 600"
          stroke="#78350f"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 space-y-16 md:space-y-24">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.phase}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, type: "spring", bounce: 0.4 }}
            className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-center`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <motion.div
                whileHover={{ rotate: index % 2 === 0 ? 3 : -3, scale: 1.02 }}
                className={`inline-block sketchy-box-alt p-6 max-w-sm ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
              >
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <span className="font-marker text-xl text-amber-900 bg-yellow-200 px-3 py-1 rounded-full transform -rotate-2 inline-block">
                    {milestone.phase}
                  </span>
                  {milestone.completed && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      DONE!
                    </span>
                  )}
                </div>
                <h3 className="font-marker text-2xl md:text-3xl text-amber-900 mb-2">{milestone.title}</h3>
                <p className="font-comic text-amber-800 font-bold">{milestone.desc}</p>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-yellow-400 border-4 border-amber-900 rounded-full flex items-center justify-center shadow-lg z-20 flex-shrink-0"
            >
              <SafeIcon name={milestone.icon} size={32} className="text-amber-900" />
            </motion.div>

            <div className="w-full md:w-1/2 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Meme Gallery Component
const MemeGallery = () => {
  const memes = [
    { id: 1, title: 'WAGMI Energy', color: 'bg-yellow-300' },
    { id: 2, title: 'HODL Mode', color: 'bg-orange-300' },
    { id: 3, title: 'When Lambo?', color: 'bg-amber-300' },
    { id: 4, title: 'Based Degen', color: 'bg-yellow-400' },
    { id: 5, title: 'Buy The Dip', color: 'bg-orange-400' },
    { id: 6, title: 'To The Moon', color: 'bg-amber-400' }
  ]

  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {memes.map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 2 : -2 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          onHoverStart={() => setHoveredId(meme.id)}
          onHoverEnd={() => setHoveredId(null)}
          className={`relative ${meme.color} border-4 border-amber-900 rounded-2xl overflow-hidden cursor-pointer`}
          style={{
            boxShadow: '6px 6px 0px 0px #78350f',
            aspectRatio: '1/1'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <SafeIcon
                name={['flame', 'moon', 'zap', 'star', 'skull', 'gem'][index]}
                size={48}
                className="mx-auto mb-2 text-amber-900"
              />
              <p className="font-marker text-xl text-amber-900">{meme.title}</p>
            </div>
          </div>

          {hoveredId === meme.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-amber-900/80 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-white font-marker text-2xl"
              >
                SWAG! 🚀
              </motion.div>
            </motion.div>
          )}

          {/* Sponge texture effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 20%, #78350f 2px, transparent 2px), radial-gradient(circle at 80% 80%, #78350f 2px, transparent 2px)',
              backgroundSize: '20px 20px'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Particle Background
const ParticleBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 10 + 10
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-yellow-300/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Main App Component
function App() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const [showConfetti, setShowConfetti] = useState(false)

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="min-h-screen bg-amber-400 paper-texture relative overflow-x-hidden font-comic">
      <ParticleBackground />

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-yellow-400/90 backdrop-blur-md border-b-4 border-amber-900"
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center">
              <SafeIcon name="flame" size={28} className="text-yellow-400" />
            </div>
            <span className="font-marker text-3xl text-amber-900 tracking-tighter">PONKI</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#roadmap" className="font-bold text-amber-900 hover:text-amber-700 transition-colors">Roadmap</a>
            <a href="#memes" className="font-bold text-amber-900 hover:text-amber-700 transition-colors">Memes</a>
            <ExplodingButton className="text-base py-2 px-4">
              Buy Now!
            </ExplodingButton>
          </div>

          <button className="md:hidden sketchy-button py-2 px-3">
            <SafeIcon name="menu" size={24} />
          </button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, scale }}
          className="container mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-marker text-6xl md:text-9xl text-amber-900 mb-4 transform -rotate-2">
              $PONKI
            </h1>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <p className="font-marker text-3xl md:text-5xl text-yellow-200 bg-amber-900 px-6 py-2 rounded-full mb-8 transform rotate-2 inline-block">
                TO THE MOON! 🚀
              </p>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-comic text-xl md:text-2xl text-amber-900 font-bold mb-8 max-w-2xl mx-auto"
          >
            The most based memecoin on the block. GM degens, WAGMI!
            <br/>
            <span className="text-amber-800">Ape in now or ngmi...</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <ExplodingButton onClick={triggerConfetti} className="text-3xl md:text-4xl py-6 px-12 bg-red-500 text-white border-red-900 hover:bg-red-400">
              APE IN! 🦍
            </ExplodingButton>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="sketchy-box-alt py-4 px-8 font-marker text-xl md:text-2xl text-amber-900"
            >
              BUY THE DIP 📉
            </motion.button>
          </motion.div>

          {/* Floating Character */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 md:right-20 top-1/2 w-32 h-32 md:w-48 md:h-48 bg-yellow-300 border-4 border-amber-900 rounded-full flex items-center justify-center"
            style={{ boxShadow: '8px 8px 0px 0px #78350f' }}
          >
            <div className="text-center">
              <SafeIcon name="flame" size={64} className="mx-auto text-amber-900 mb-2" />
              <span className="font-marker text-amber-900">SWAG</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="sketchy-box p-8 md:p-12 text-center"
          >
            <h2 className="font-marker text-3xl md:text-5xl text-amber-900 mb-2">
              NEXT PUMP INCOMING! 📈
            </h2>
            <p className="font-comic text-amber-800 font-bold mb-8 text-lg">
              When lambo? Soon... very soon... HODL tight degens! 🚀
            </p>

            <CountdownTimer />

            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="mt-8 inline-block"
            >
              <p className="font-marker text-2xl text-red-600 bg-yellow-200 px-6 py-3 rounded-lg inline-block border-4 border-red-600 transform rotate-1">
                WAGMI! 🔥
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-marker text-5xl md:text-7xl text-amber-900 mb-4">
              THE ROADMAP 🗺️
            </h2>
            <p className="font-comic text-2xl text-amber-800 font-bold">
              Our journey to Valhalla! Based timeline for degens 📍
            </p>
          </motion.div>

          <RoadmapTree />
        </div>
      </section>

      {/* Meme Gallery Section */}
      <section id="memes" className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-marker text-5xl md:text-7xl text-amber-900 mb-4">
              MEME GALLERY 🎨
            </h2>
            <p className="font-comic text-xl text-amber-800 font-bold max-w-2xl mx-auto">
              Sponge-worthy memes from the community. GM! Post your best WAGMI moments!
            </p>
          </motion.div>

          <MemeGallery />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <ExplodingButton className="text-2xl">
              Submit Your Meme 📤
            </ExplodingButton>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics / Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fire', title: 'BURN MECHANISM', desc: '50% supply burned to the ground! 🔥 Bye bye jeeters!' },
              { icon: 'users', title: 'COMMUNITY OWNED', desc: 'LP burned, contract renounced. True degen ownership! 🦍' },
              { icon: 'crown', title: 'MEME UTILITY', desc: 'Utility is being a meme. Best use case in crypto! 👑' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 3 : -3 }}
                className="sketchy-box p-8 text-center"
              >
                <SafeIcon name={feature.icon} size={64} className="mx-auto mb-4 text-amber-900" />
                <h3 className="font-marker text-2xl text-amber-900 mb-3">{feature.title}</h3>
                <p className="font-comic text-amber-800 font-bold">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, #fbbf24, #f59e0b)',
              'linear-gradient(45deg, #f59e0b, #fbbf24)',
              'linear-gradient(45deg, #fbbf24, #f59e0b)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-marker text-5xl md:text-8xl text-amber-900 mb-6"
          >
            WHAT ARE YOU
            <br />
            WAITING FOR? 🚀
          </motion.h2>

          <p className="font-comic text-2xl md:text-3xl text-amber-900 font-bold mb-8">
            Join the Ponki revolution! Ape in now!
            <br />
            <span className="text-red-700">When lambo? SOON! 🚗🌙</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ExplodingButton className="text-3xl md:text-4xl py-6 px-12 bg-green-500 text-white border-green-900 hover:bg-green-400">
              BUY $PONKI 💎
            </ExplodingButton>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="sketchy-box bg-blue-400 border-blue-900 py-4 px-8 font-marker text-xl text-white"
              style={{ boxShadow: '6px 6px 0px 0px #1e3a8a' }}
            >
              Join Telegram 💬
            </motion.button>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            {['twitter', 'github', 'disc', 'globe'].map((social, index) => (
              <motion.button
                key={social}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-amber-900 rounded-full flex items-center justify-center text-yellow-400"
              >
                <SafeIcon name={social} size={28} />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-yellow-400 py-12 px-4 telegram-safe-bottom">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <SafeIcon name="flame" size={32} />
            <span className="font-marker text-3xl">PONKI</span>
          </div>

          <p className="font-comic font-bold mb-4">
            © 2024 Ponki Coin. All rights reserved. Not financial advice, DYOR!
          </p>

          <div className="flex flex-wrap justify-center gap-4 font-marker text-sm">
            <span className="bg-yellow-400 text-amber-900 px-3 py-1 rounded-full">GM</span>
            <span className="bg-yellow-400 text-amber-900 px-3 py-1 rounded-full">WAGMI</span>
            <span className="bg-yellow-400 text-amber-900 px-3 py-1 rounded-full">HODL</span>
            <span className="bg-yellow-400 text-amber-900 px-3 py-1 rounded-full">BASED</span>
            <span className="bg-yellow-400 text-amber-900 px-3 py-1 rounded-full">DEGEN</span>
          </div>

          <p className="mt-6 font-comic text-yellow-200">
            Made with 🔥 by the Ponki community. To the moon! 🚀🌙
          </p>
        </div>
      </footer>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: Math.random() * 2 + 1,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  backgroundColor: ['#fbbf24', '#f59e0b', '#ef4444', '#22c55e', '#3b82f6'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App