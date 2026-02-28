import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  ChevronDown,
  Phone,
  MessageCircle,
  Star,
  Truck,
  Palette,
  Cake,
  Zap,
  Sparkles,
  DollarSign,
  Instagram,
  Facebook,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// WhatsApp phone number
const WA_NUMBER = "919423399577"

// Generic WhatsApp deep-link (used for hero / navbar / gallery CTA)
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Bliss Cake! I'd like to place a cake order. Please share more details!")}`

// Helper — opens WhatsApp with this specific cake's details pre-filled
function orderCakeOnWhatsApp(cake: { name: string; description: string; price: number }) {
  const message =
    `Hi Bliss Cake! I'd like to order:\n\n` +
    ` Cake Name: ${cake.name}\n` +
    ` Description: ${cake.description}\n` +
    ` Price: ₹${cake.price}\n\n` +
    `Please confirm availability and delivery details. Thank you!`
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
}

// Hero carousel images
const heroImages = [
  {
    src: '/images/hero/hero-cake-1.jpg',
    alt: 'Elegant Wedding Cake',
    badge: 'Premium',
    badgeColor: 'bg-amber-500'
  },
  {
    src: '/images/hero/hero-cake-2.jpg',
    alt: 'Chocolate Truffle Cake',
    badge: 'Best Seller',
    badgeColor: 'bg-pink-500'
  },
  {
    src: '/images/hero/hero-cake-3.jpg',
    alt: 'Unicorn Birthday Cake',
    badge: 'Kids Favorite',
    badgeColor: 'bg-purple-500'
  },
  {
    src: '/images/hero/hero-cake-4.jpg',
    alt: 'Strawberry Cream Cake',
    badge: 'Fresh',
    badgeColor: 'bg-green-500'
  }
]

// Cake collection data — 4 items per category (20 total)
const cakes = [
  // --- Birthday (4) ---
  { id: 1, name: 'Royal Chocolate Truffle', category: 'birthday', price: 599, image: '/images/cakes/cake-1.jpg', description: 'Rich Belgian chocolate layers with silky truffle filling', badge: 'Popular' },
  { id: 2, name: 'Red Velvet Bliss', category: 'birthday', price: 649, image: '/images/cakes/cake-6.jpg', description: 'Classic red velvet topped with velvety cream cheese frosting', badge: null },
  { id: 3, name: 'Butterscotch Crunch', category: 'birthday', price: 499, image: '/images/cakes/cake-7.jpg', description: 'Crunchy butterscotch layers with golden caramel drizzle', badge: null },
  { id: 4, name: 'Strawberry Dream Cake', category: 'birthday', price: 579, image: '/images/hero/hero-cake-4.jpg', description: 'Light vanilla sponge layered with fresh strawberry cream', badge: 'New' },
  // --- Anniversary (4) ---
  { id: 5, name: 'Anniversary Rose Cake', category: 'anniversary', price: 899, image: '/images/cakes/cake-2.jpg', description: 'Elegant two-tier cake with red roses and gold accents', badge: null },
  { id: 6, name: 'Black Forest Classic', category: 'anniversary', price: 599, image: '/images/cakes/cake-8.jpg', description: 'Traditional German style with cherries and whipped cream', badge: 'Classic' },
  { id: 7, name: 'Gold Tier Romance', category: 'anniversary', price: 999, image: '/images/hero/hero-cake-1.jpg', description: 'Luxurious gold-foil two-tier cake perfect for milestones', badge: 'Premium' },
  { id: 8, name: 'Velvet Anniversary Cake', category: 'anniversary', price: 749, image: '/images/cakes/cake-5.jpg', description: 'Deep red velvet heart cake wrapped in pink fondant roses', badge: null },
  // --- Photo (4) ---
  { id: 9, name: 'Custom Photo Cake', category: 'photo', price: 749, image: '/images/cakes/cake-3.jpg', description: 'Personalized edible photo print on a smooth cream base', badge: 'Custom' },
  { id: 10, name: 'Memory Lane Cake', category: 'photo', price: 699, image: '/images/cakes/cake-9.jpg', description: 'Your favourite memory printed beautifully on vanilla sponge', badge: null },
  { id: 11, name: 'Collage Photo Cake', category: 'photo', price: 799, image: '/images/cakes/cake-10.jpg', description: 'Multiple photo grid print on a white fondant canvas', badge: 'Popular' },
  { id: 12, name: 'Surprise Theme Photo Cake', category: 'photo', price: 849, image: '/images/cakes/cake-11.jpg', description: 'Custom themed photo cake for a one-of-a-kind surprise gift', badge: 'New' },
  // --- Eggless (4) ---
  { id: 13, name: 'Eggless Fruit Delight', category: 'eggless', price: 549, image: '/images/cakes/cake-4.jpg', description: 'Fresh seasonal fruits over a moist eggless vanilla sponge', badge: 'Eggless' },
  { id: 14, name: 'Eggless Choco Fudge', category: 'eggless', price: 579, image: '/images/cakes/cake-12.jpg', description: 'Dense fudgy chocolate cake made 100% without eggs', badge: 'Eggless' },
  { id: 15, name: 'Eggless Mango Mousse', category: 'eggless', price: 619, image: '/images/hero/hero-cake-2.jpg', description: 'Creamy mango mousse layered on eggless almond sponge', badge: 'Eggless' },
  { id: 16, name: 'Eggless Pineapple Cake', category: 'eggless', price: 499, image: '/images/cakes/cake-11.jpg', description: 'Soft eggless sponge soaked in pineapple syrup with cream', badge: 'Eggless' },
  // --- Kids (4) ---
  { id: 17, name: 'Monster Fun Cake', category: 'kids', price: 699, image: '/images/cakes/cake-5.jpg', description: 'Colorful monster theme cake packed with candy decorations', badge: 'Kids' },
  { id: 18, name: 'Unicorn Magic Cake', category: 'kids', price: 749, image: '/images/hero/hero-cake-3.jpg', description: 'Rainbow unicorn cake with edible glitter and pastel swirls', badge: 'Kids' },
  { id: 19, name: 'Superhero Smash Cake', category: 'kids', price: 679, image: '/images/cakes/cake-10.jpg', description: 'Your favourite superhero brought to life in a yummy cake', badge: 'Kids' },
  { id: 20, name: 'Cartoon Character Cake', category: 'kids', price: 649, image: '/images/cakes/cake-9.jpg', description: 'Fondant cartoon characters on a colourful layered sponge', badge: 'Kids' },
]

// Bestseller cakes
const bestsellerCakes = [
  { id: 1, name: 'Exotic Butterscotch Caramel', description: 'Experience the perfect fusion of buttery and...', price: 550, image: '/images/cakes/cake-7.jpg' },
  { id: 2, name: 'Exotic Choco Overload', description: 'For chocolate lovers, our Chocolate Overload...', price: 550, image: '/images/cakes/cake-1.jpg' },
  { id: 3, name: 'Exotic Choco Bite', description: 'Bite into bliss with our Choco Bite cake, packed...', price: 550, image: '/images/cakes/cake-8.jpg' },
  { id: 4, name: 'Royal Beauty Cake', description: 'Our Round Royal Beauty cake is a majestic tre...', price: 550, image: '/images/cakes/cake-6.jpg' },
]

// Gallery images
const galleryImages = [
  { src: '/images/cakes/cake-9.jpg', category: 'wedding', title: 'Elegant Wedding Cake' },
  { src: '/images/cakes/cake-10.jpg', category: 'birthday', title: 'Rainbow Layer Cake' },
  { src: '/images/cakes/cake-11.jpg', category: 'classic', title: 'Pineapple Upside Down' },
  { src: '/images/cakes/cake-12.jpg', category: 'special', title: 'Mango Mousse' },
  { src: '/images/hero/hero-cake-1.jpg', category: 'wedding', title: 'Gold & Pink Wedding' },
  { src: '/images/hero/hero-cake-3.jpg', category: 'birthday', title: 'Unicorn Magic' },
]

// Features data
const features = [
  { icon: Truck, title: 'Home Delivery', description: 'Quick doorstep delivery across the city' },
  { icon: Palette, title: '200+ Designs', description: 'Huge variety of unique cake designs' },
  { icon: Cake, title: 'Freshly Baked', description: 'Made fresh daily with quality ingredients' },
  { icon: Zap, title: 'Same Day Delivery', description: 'Order today, receive today!' },
  { icon: Sparkles, title: 'Custom Themes', description: 'Personalized cakes for every occasion' },
  { icon: DollarSign, title: 'Affordable Pricing', description: 'Premium cakes at pocket-friendly prices' },
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [galleryFilter, setGalleryFilter] = useState('all')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [visibleCakes, setVisibleCakes] = useState(8)
  const [isWAOpen, setIsWAOpen] = useState(false)
  const [waMessage, setWAMessage] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)

  const sendWAMessage = () => {
    const text = waMessage.trim()
      ? encodeURIComponent(waMessage.trim())
      : encodeURIComponent("Hi Bliss Cake! 🎂 I'd like to place a cake order. Please share more details!")
    window.open(`https://wa.me/919423399577?text=${text}`, '_blank')
  }

  // Auto-rotating carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filter cakes — reset visible count when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCakes(8)
  }

  const filteredCakes = activeCategory === 'all'
    ? cakes
    : cakes.filter(cake => cake.category === activeCategory)

  // Filter gallery
  const filteredGallery = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === galleryFilter)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'photo', label: 'Photo' },
    { id: 'eggless', label: 'Eggless' },
    { id: 'kids', label: 'Kids' },
  ]

  const galleryCategories = [
    { id: 'all', label: 'All' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'classic', label: 'Classic' },
    { id: 'special', label: 'Special' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <span className="text-3xl font-cursive font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">
                Bliss Cake
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Cakes Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition-colors font-medium"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  Cakes <ChevronDown className="w-4 h-4" />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-card py-2 animate-fade-in"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {['Birthday Cakes', 'Anniversary Cakes', 'Photo Cakes', 'Eggless Cakes', 'Kids Cakes'].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        onClick={() => scrollToSection('collection')}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Gallery</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Features</button>
              <button onClick={() => scrollToSection('collection')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Offers</button>
              <button onClick={() => scrollToSection('footer')} className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Contact</button>
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* <button className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </button> */}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full px-6">
                  Order Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('collection')} className="text-left py-2 text-gray-700">Cakes</button>
                <button onClick={() => scrollToSection('gallery')} className="text-left py-2 text-gray-700">Gallery</button>
                <button onClick={() => scrollToSection('features')} className="text-left py-2 text-gray-700">Features</button>
                <button onClick={() => scrollToSection('footer')} className="text-left py-2 text-gray-700">Contact</button>
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full mt-2">
                  Order Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Auto-Rotating Carousel */}
      <section ref={heroRef} className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-cream-50 to-amber-50" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[50vh] md:min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up">
              <div>
                <p className="text-pink-500 font-cursive text-xl md:text-2xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Baked with love, delivered with joy
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  Every Moment{' '}
                  <span className="text-gradient">Deserves</span>{' '}
                  <span className="text-amber-600">a Perfect Cake</span>
                </h1>
              </div>

              <p className="text-base md:text-lg text-gray-600 max-w-lg">
                Same-day delivery • 200+ designs • Custom themes
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg flex items-center justify-center sm:justify-start gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Order on WhatsApp
                  </Button>
                </a>
                <a href="tel:+919423399577" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-pink-500 text-pink-600 hover:bg-pink-50 rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                </a>
              </div>

              {/* Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 w-full sm:w-fit shadow-soft">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  <span className="font-semibold">4.9</span> Google Rating • <span className="font-semibold">500+</span> Happy Customers
                </span>
              </div>
            </div>

            {/* Right Content - Auto-Rotating Carousel */}
            <div className="relative mt-8 lg:mt-0">
              {/* Main Image Container */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Decorative frame */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-pink-200 to-amber-200 rounded-2xl sm:rounded-3xl rotate-3" />

                {/* Image carousel */}
                <div className="relative bg-white rounded-lg sm:rounded-2xl overflow-hidden shadow-card aspect-square">
                  {heroImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ${index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                        }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Default visible image when no animation */}
                  <img
                    src={heroImages[currentSlide].src}
                    alt={heroImages[currentSlide].alt}
                    className="w-full h-full object-cover opacity-0"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`${heroImages[currentSlide].badgeColor} text-white px-3 py-1`}>
                      {heroImages[currentSlide].badge}
                    </Badge>
                  </div>

                  {/* Price tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-xl font-bold text-pink-600">₹449</p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                  className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 w-9 sm:w-12 h-9 sm:h-12 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-pink-50 transition-colors z-10">
                  <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                  className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 w-9 sm:w-12 h-9 sm:h-12 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-pink-50 transition-colors z-10">
                  <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
                </button>
              </div>

              {/* Slide indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                      ? 'bg-pink-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-16 sm:w-20 h-16 sm:h-20 bg-pink-100 rounded-full flex items-center justify-center animate-float hidden sm:flex">
                <Cake className="w-8 sm:w-10 h-8 sm:h-10 text-pink-500" />
              </div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-12 sm:w-16 h-12 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center animate-float hidden sm:flex" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-pink-400" />
        </div>
      </section>


      {/* Bestsellers Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold flex items-center gap-2">
                <span className="text-pink-500 text-lg md:text-2xl">✦</span> Our Bestsellers
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">Most loved by our customers</p>
            </div>
            <button
              onClick={() => scrollToSection('collection')}
              className="flex items-center justify-center gap-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium px-4 sm:px-5 py-2 md:py-2.5 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-sm text-xs sm:text-sm whitespace-nowrap"
            >
              View All <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </button>
          </div>

          {/* Bestseller Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {bestsellerCakes.map((cake, index) => (
              <div
                key={cake.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Bestseller Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                      🏅 Bestseller
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 md:p-4">
                  {/* Verified Icon + Name */}
                  <div className="flex items-start gap-2 mb-1">
                    <span className="mt-0.5 flex-shrink-0 w-4 md:w-5 h-4 md:h-5 bg-green-500 rounded-sm flex items-center justify-center">
                      <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <h3 className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight line-clamp-1">{cake.name}</h3>
                  </div>

                  <p className="text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-3 line-clamp-1">{cake.description}</p>

                  {/* Price & Order on WhatsApp Button */}
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-pink-600 font-bold text-sm md:text-lg">{cake.price ? `₹${cake.price}` : '₹550'}</p>
                    <div className="flex flex-col items-end gap-0.5">
                      <button
                        onClick={() => orderCakeOnWhatsApp({
                          name: cake.name,
                          description: cake.description,
                          price: cake.price ?? 550
                        })}
                        className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-xs md:text-sm font-semibold px-2.5 sm:px-3 md:px-5 py-1 md:py-1.5 rounded-full transition-all shadow-sm"
                      >
                        Order
                      </button>
                      <span className="text-gray-400 text-[8px] sm:text-[10px]">via WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cake Collection Section */}
      <section id="collection" className="py-12 md:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-pink-600 font-medium mb-2 text-sm md:text-base">Our Menu</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-4">
              Explore Our <span className="text-gradient">Cake Collection</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Choose from 200+ designs across categories. Every cake is freshly baked with love.            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all whitespace-nowrap ${activeCategory === cat.id
                  ? 'bg-pink-500 text-white shadow-glow'
                  : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cakes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {filteredCakes.slice(0, visibleCakes).map((cake, index) => (
              <div
                key={cake.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {cake.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-400 text-white">{cake.badge}</Badge>
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-semibold text-sm md:text-lg mb-1">{cake.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{cake.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-gray-400">From</span>
                      <p className="text-base md:text-lg font-bold text-pink-600">₹{cake.price}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => orderCakeOnWhatsApp(cake)}
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full py-1 px-2 md:px-4 text-xs md:text-sm"
                    >
                      <ShoppingBag className="w-3.5 md:w-4 h-3.5 md:h-4" />
                      <span className="hidden sm:inline ml-1">Order</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCakes < filteredCakes.length && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                onClick={() => setVisibleCakes(prev => prev + 8)}
                className="border-pink-500 text-pink-600 hover:bg-pink-50 rounded-full px-8"
              >
                Load More Cakes
              </Button>
              <p className="text-gray-500 text-sm mt-3">
                Showing {Math.min(visibleCakes, filteredCakes.length)} of {filteredCakes.length} cakes
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-cursive text-pink-500 text-lg md:text-2xl mb-2">Why us?</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold">
              Why Choose <span className="text-gradient">Bliss Cake</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-pink-50 to-white rounded-2xl p-4 md:p-8 hover:shadow-card transition-all duration-300 border border-pink-100/60 hover:border-pink-200 hover:bg-white"
              >
                {/* Icon */}
                <div className="w-11 h-11 md:w-16 md:h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-3 md:mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                {/* Text */}
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-3 leading-tight">{feature.title}</h3>
                <p className="text-gray-500 text-[11px] md:text-base leading-snug">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Media Section ── */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-pink-50 via-white to-amber-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <p className="font-cursive text-pink-500 text-lg md:text-2xl mb-1">Stay Connected</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-3">
              Find Us <span className="text-gradient">Online</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Follow us for daily cake inspiration, behind-the-scenes moments & exclusive offers!
            </p>
          </div>

          {/* ── Mobile layout: phone on top, cards below ── */}
          <div className="flex flex-col lg:hidden items-center gap-8">

            {/* Phone mockup — mobile centred, scaled to fit neatly */}
            <div className="relative flex justify-center w-full">
              {/* Soft ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-72 bg-gradient-to-br from-pink-300/50 to-amber-300/40 rounded-full blur-3xl" />

              {/* Phone shell */}
              <div className="relative w-[200px] bg-gray-900 rounded-[2rem] p-[8px] shadow-2xl">
                {/* Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-full z-10" />

                {/* Screen */}
                <div className="bg-white rounded-[1.6rem] overflow-hidden" style={{ height: '400px' }}>

                  {/* Top bar */}
                  <div className="flex items-center justify-between px-3 pt-5 pb-2 border-b border-gray-100">
                    <span className="font-cursive text-sm text-gray-900 font-bold">blisscake_official</span>
                    <div className="flex gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-gray-200" />
                      <div className="w-4 h-4 rounded-full bg-gray-200" />
                    </div>
                  </div>

                  {/* Profile info */}
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)' }}>
                        <Cake className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex gap-2 flex-1 justify-around text-center">
                        <div><p className="text-[10px] font-bold text-gray-900">348</p><p className="text-[8px] text-gray-500">posts</p></div>
                        <div><p className="text-[10px] font-bold text-gray-900">12.4K</p><p className="text-[8px] text-gray-500">followers</p></div>
                        <div><p className="text-[10px] font-bold text-gray-900">219</p><p className="text-[8px] text-gray-500">following</p></div>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-900">Bliss Cake 🎂</p>
                    <p className="text-[8px] text-gray-500 leading-tight">Custom cakes baked with love 💕 | Same-day delivery 🚀</p>
                    <button className="mt-1.5 w-full py-1 rounded-md text-[10px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b)' }}>
                      Follow
                    </button>
                  </div>

                  {/* Photo grid */}
                  <div className="grid grid-cols-3 gap-[1px]">
                    {[
                      '/images/cakes/cake-1.jpg', '/images/cakes/cake-2.jpg', '/images/cakes/cake-3.jpg',
                      '/images/cakes/cake-6.jpg', '/images/cakes/cake-7.jpg', '/images/cakes/cake-8.jpg',
                      '/images/hero/hero-cake-1.jpg', '/images/hero/hero-cake-3.jpg', '/images/cakes/cake-4.jpg',
                    ].map((src, i) => (
                      <div key={i} className="aspect-square overflow-hidden bg-gray-100">
                        <img src={src} alt="cake" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home bar */}
                <div className="flex justify-center mt-1.5 mb-0.5">
                  <div className="w-14 h-[3px] bg-gray-600 rounded-full" />
                </div>
              </div>

              {/* Floating badge — New post */}
              <div className="absolute right-4 top-10 bg-white rounded-xl shadow-card px-2.5 py-1.5 flex items-center gap-1.5 animate-float">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b)' }}>
                  <Instagram className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-800">New post!</p>
                  <p className="text-[8px] text-gray-400">2 mins ago</p>
                </div>
              </div>

              {/* Floating hearts */}
              <div className="absolute left-4 bottom-10 bg-white rounded-xl shadow-card px-2.5 py-1.5 animate-float" style={{ animationDelay: '1.5s' }}>
                <p className="text-[10px] font-semibold text-gray-700">❤️ 1,248 likes</p>
              </div>
            </div>

            {/* Social cards */}
            <div className="w-full space-y-3">
              <a href="https://instagram.com/blisscake_official" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-pink-100">
                <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)' }}>
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">@blisscake_official</p>
                  <p className="text-gray-500 text-xs">Follow us on Instagram • 12.4K Followers</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-50 group-hover:bg-pink-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <a href="https://facebook.com/blisscake" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-blue-100">
                <div className="w-12 h-12 rounded-2xl bg-[#1877f2] flex-shrink-0 flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">Bliss Cake Official</p>
                  <p className="text-gray-500 text-xs">Like our Facebook page • 8.2K Likes</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-green-100">
                <div className="w-12 h-12 rounded-2xl bg-[#25d366] flex-shrink-0 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm group-hover:text-green-600 transition-colors">+91 94233 99577</p>
                  <p className="text-gray-500 text-xs">Chat with us on WhatsApp • Order anytime</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 group-hover:bg-green-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4 text-green-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <p className="font-cursive text-pink-400 text-lg pl-2 pt-1">"Every cake tells a story — follow ours 🎂"</p>
            </div>
          </div>

          {/* ── Desktop layout: cards left, phone right ── */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Social media cards */}
            <div className="space-y-5">
              <a href="https://instagram.com/blisscake_official" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-pink-100">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)' }}>
                  <Instagram className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors truncate">@blisscake_official</p>
                  <p className="text-gray-500 text-sm">Follow us on Instagram • 12.4K Followers</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-pink-50 group-hover:bg-pink-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-pink-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <a href="https://facebook.com/blisscake" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-blue-100">
                <div className="w-14 h-14 rounded-2xl bg-[#1877f2] flex items-center justify-center flex-shrink-0">
                  <Facebook className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors truncate">Bliss Cake Official</p>
                  <p className="text-gray-500 text-sm">Like our Facebook page • 8.2K Likes</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-blue-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-5 bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-green-100">
                <div className="w-14 h-14 rounded-2xl bg-[#25d366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-lg group-hover:text-green-600 transition-colors truncate">+91 94233 99577</p>
                  <p className="text-gray-500 text-sm">Chat with us on WhatsApp • Order anytime</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-green-50 group-hover:bg-green-500 flex items-center justify-center transition-all flex-shrink-0">
                  <ChevronRight className="w-5 h-5 text-green-400 group-hover:text-white transition-colors" />
                </div>
              </a>

              <p className="font-cursive text-pink-400 text-xl pl-2 pt-2">"Every cake tells a story — follow ours 🎂"</p>
            </div>

            {/* RIGHT — Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-amber-300/40 rounded-[3rem] blur-3xl scale-110" />

                <div className="relative w-[260px] bg-gray-900 rounded-[2.5rem] p-[10px] shadow-2xl">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" />

                  <div className="bg-white rounded-[2rem] overflow-hidden" style={{ height: '520px' }}>
                    <div className="flex items-center justify-between px-4 pt-6 pb-3 border-b border-gray-100">
                      <span className="font-cursive text-lg text-gray-900 font-bold">blisscake_official</span>
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200" />
                        <div className="w-5 h-5 rounded-full bg-gray-200" />
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)' }}>
                          <Cake className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex gap-3 flex-1 justify-around text-center">
                          <div><p className="text-xs font-bold text-gray-900">348</p><p className="text-[9px] text-gray-500">posts</p></div>
                          <div><p className="text-xs font-bold text-gray-900">12.4K</p><p className="text-[9px] text-gray-500">followers</p></div>
                          <div><p className="text-xs font-bold text-gray-900">219</p><p className="text-[9px] text-gray-500">following</p></div>
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-gray-900">Bliss Cake 🎂</p>
                      <p className="text-[9px] text-gray-500 leading-3 mt-0.5">Custom cakes baked with love 💕</p>
                      <p className="text-[9px] text-gray-500 leading-3">Same-day delivery 🚀 | DM to order</p>
                      <button className="mt-2 w-full py-1 rounded-md text-[11px] font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b)' }}>
                        Follow
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-[1.5px] px-0">
                      {[
                        '/images/cakes/cake-1.jpg', '/images/cakes/cake-2.jpg', '/images/cakes/cake-3.jpg',
                        '/images/cakes/cake-6.jpg', '/images/cakes/cake-7.jpg', '/images/cakes/cake-8.jpg',
                        '/images/hero/hero-cake-1.jpg', '/images/hero/hero-cake-3.jpg', '/images/cakes/cake-4.jpg',
                      ].map((src, i) => (
                        <div key={i} className="aspect-square overflow-hidden bg-gray-100">
                          <img src={src} alt="cake" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-2 mb-1">
                    <div className="w-20 h-1 bg-gray-600 rounded-full" />
                  </div>
                </div>

                <div className="absolute -right-4 top-16 bg-white rounded-2xl shadow-card px-3 py-2 flex items-center gap-2 animate-float">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #f58529, #dd2a7b)' }}>
                    <Instagram className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">New post!</p>
                    <p className="text-[9px] text-gray-400">2 mins ago</p>
                  </div>
                </div>

                <div className="absolute -left-5 bottom-24 bg-white rounded-2xl shadow-card px-3 py-2 animate-float" style={{ animationDelay: '1.5s' }}>
                  <p className="text-xs font-semibold text-gray-700">❤️ 1,248 likes</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cake Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-pink-600 font-medium mb-2 text-sm md:text-base">Our Work</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-4">
              Cake <span className="text-gradient">Gallery</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              A showcase of our finest creations            </p>
          </div>

          {/* Gallery Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setGalleryFilter(cat.id)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-sm md:text-base transition-all whitespace-nowrap ${galleryFilter === cat.id
                  ? 'bg-pink-500 text-white shadow-glow'
                  : 'bg-cream-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid — 2 col on mobile, 3 col masonry on desktop */}
          <div className="grid grid-cols-2 lg:hidden gap-3">
            {filteredGallery.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl animate-fade-in shadow-soft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Always-visible bottom overlay on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                  {/* Category pill */}
                  <span className="absolute top-2.5 left-2.5 bg-pink-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
                    {image.category}
                  </span>
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-3">
                    <p className="text-white font-semibold text-xs leading-tight">{image.title}</p>
                    <p className="text-white/70 text-[10px] mt-0.5">🎂 Bliss Cake</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop masonry — hidden on mobile */}
          <div className="hidden lg:block columns-3 gap-6 space-y-6">
            {filteredGallery.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl break-inside-avoid animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">{image.title}</p>
                    <p className="text-white/80 text-sm capitalize">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-gray-600 mb-4 text-sm md:text-base">Want something like this?</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg flex items-center justify-center gap-2 mx-auto">
                <MessageCircle className="w-4 md:w-5 h-4 md:h-5" />
                Order Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Mobile footer: brand + social icons only ── */}
          <div className="md:hidden text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-cursive font-bold bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">
                Bliss Cake
              </span>
            </div>
            <p className="font-cursive text-amber-400 text-base mb-4">Baked with love, delivered with joy.</p>
            {/* Social icons */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            {/* Quick contact links */}
            <div className="flex justify-center gap-6 text-gray-400 text-sm mb-6">
              <a href="tel:+919423399577" className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ── Desktop footer: full 3-column layout ── */}
          <div className="hidden md:grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Cake className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-cursive font-bold bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Bliss Cake
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your happiness, crafted in cream and sponge. We make every celebration sweeter with our freshly baked, beautifully designed cakes.
              </p>
              <p className="font-cursive text-amber-400 text-xl">
                Baked with love, delivered with joy.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Menu', 'Gallery', 'Offers', 'Reviews', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-2 text-gray-400">
                <a href="tel:+919423399577" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 94233 99577</span>
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp: +91 94233 99577</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 md:mt-12 pt-5 md:pt-8 text-center text-gray-500 text-xs md:text-sm">
            <p className="font-cursive text-base md:text-xl text-gray-400">Bliss Cake</p>
            <p className="mt-1">© 2026 Bliss Cake. All rights reserved.</p>
            <p className="mt-1 hidden md:block">Made with ❤️ by the Bliss Cake Team</p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Chat Widget ── */}
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[999] flex flex-col items-end gap-2 md:gap-3">

        {/* Chat Popup */}
        {isWAOpen && (
          <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in max-w-[calc(100vw-2rem)]">
            {/* Header */}
            <div className="flex items-center gap-3 px-3 md:px-4 py-3 md:py-4" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
              <div className="w-10 md:w-11 h-10 md:h-11 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 md:w-6 h-5 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm leading-tight">Bliss Cake 🎂</p>
                <p className="text-green-100 text-xs">Typically replies in minutes</p>
              </div>
              <button
                onClick={() => setIsWAOpen(false)}
                className="w-6 md:w-7 h-6 md:h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-3.5 md:w-4 h-3.5 md:h-4 text-white" />
              </button>
            </div>

            {/* Chat body */}
            <div className="bg-[#ece5dd] px-3 md:px-4 py-4 md:py-5 min-h-[120px]">
              {/* Greeting bubble */}
              <div className="flex gap-2 items-end">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                  <Cake className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-3 md:px-4 py-2 md:py-3 shadow-sm max-w-[200px]">
                  <p className="text-gray-800 text-xs md:text-sm leading-relaxed">
                    Hi there! 👋 How can we help you today? Feel free to ask about our cakes &amp; delivery.
                  </p>
                  <p className="text-gray-400 text-[9px] md:text-[10px] mt-1 text-right">
                    {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </p>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="flex items-center gap-2 px-2 md:px-3 py-2 md:py-3 bg-white border-t border-gray-100">
              <input
                type="text"
                value={waMessage}
                onChange={(e) => setWAMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWAMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-300 transition-all"
              />
              <button
                onClick={sendWAMessage}
                className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
              >
                <svg className="w-4 md:w-5 h-4 md:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Floating bubble button */}
        <button
          onClick={() => setIsWAOpen(!isWAOpen)}
          className="relative w-12 md:w-14 h-12 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
          aria-label="Open WhatsApp Chat"
        >
          {/* Pulse ring */}
          {!isWAOpen && (
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
          )}
          {/* Unread dot */}
          {!isWAOpen && (
            <span className="absolute top-0 right-0 w-3 md:w-3.5 h-3 md:h-3.5 bg-red-500 rounded-full border-2 border-white" />
          )}
          {isWAOpen
            ? <X className="w-5 md:w-6 h-5 md:h-6 text-white" />
            : <MessageCircle className="w-6 md:w-7 h-6 md:h-7 text-white" />
          }
        </button>

      </div>
    </div>
  )
}

export default App
