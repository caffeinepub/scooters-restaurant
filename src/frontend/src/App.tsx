import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Car,
  ChefHat,
  Clock,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Package,
  Phone,
  Star,
  Twitter,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- Scroll reveal hook ---
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const el = ref.current;
    if (el) {
      for (const revealEl of el.querySelectorAll(".reveal")) {
        observer.observe(revealEl);
      }
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

// --- Nav ---
function Nav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <UtensilsCrossed
              className="w-6 h-6"
              style={{ color: "oklch(0.78 0.17 85)" }}
            />
            <span
              className="text-2xl font-heading font-bold tracking-widest"
              style={{ color: "oklch(0.78 0.17 85)" }}
            >
              SCOOTERS
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors duration-200 tracking-wide"
                style={
                  {
                    "--hover-color": "oklch(0.78 0.17 85)",
                  } as React.CSSProperties
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <button
              type="button"
              data-ocid="nav.book_button"
              onClick={onBook}
              className="px-5 py-2.5 text-sm font-semibold tracking-wide rounded border transition-all duration-300 hover:shadow-gold"
              style={{
                borderColor: "oklch(0.78 0.17 85)",
                color: "oklch(0.78 0.17 85)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.78 0.17 85)";
                (e.currentTarget as HTMLButtonElement).style.color = "black";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.78 0.17 85)";
              }}
            >
              Book a Table
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 border-t border-border px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-foreground/80 hover:text-foreground py-2 text-sm font-medium tracking-wide"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onBook();
            }}
            className="w-full py-3 text-sm font-semibold rounded border"
            style={{
              borderColor: "oklch(0.78 0.17 85)",
              color: "oklch(0.78 0.17 85)",
            }}
          >
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}

// --- Hero ---
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-bg.dim_1600x900.jpg"
          alt="Scooters Restaurant"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p
          className="text-sm font-semibold tracking-[0.4em] uppercase mb-6 animate-fade-in"
          style={{ color: "oklch(0.78 0.17 85)", animationDelay: "0.2s" }}
        >
          Pathankot, Punjab
        </p>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="gold-gradient-text">Scooters</span>
          <br />
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-normal italic">
            Where Great Food Meets Great Vibes.
          </span>
        </h1>
        <p
          className="text-foreground/75 text-lg sm:text-xl mb-10 tracking-wide animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Authentic Indian Cuisine &nbsp;|&nbsp; Live Music &nbsp;|&nbsp; Great
          Ambience
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            type="button"
            data-ocid="hero.book_button"
            onClick={onBook}
            className="px-8 py-3.5 text-sm font-semibold tracking-wide rounded text-black transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.17 85), oklch(0.88 0.12 75))",
            }}
          >
            Book a Table
          </button>
          <a
            href="#menu"
            data-ocid="hero.menu_button"
            className="px-8 py-3.5 text-sm font-semibold tracking-wide rounded border transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
          >
            View Menu
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// --- About ---
function About() {
  const ref = useScrollReveal();
  return (
    <section
      id="about"
      data-ocid="about.section"
      ref={ref}
      className="py-24 relative"
      style={{ background: "oklch(0.11 0.005 20)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
              style={{ color: "oklch(0.78 0.17 85)" }}
            >
              Our Story
            </p>
            <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              More Than Just a{" "}
              <span className="gold-gradient-text italic">Restaurant</span>
            </h2>
            <div className="section-divider-left reveal reveal-delay-2" />
            <p className="reveal reveal-delay-3 text-foreground/70 text-lg leading-relaxed mb-8">
              Tucked away in the heart of Pathankot, Scooters is more than just
              a restaurant — it's an experience. From the moment you walk in,
              you're greeted with warm lighting, foot-tapping music, and the
              irresistible aroma of freshly prepared Indian cuisine. Whether
              you're here for a family dinner, a night out with friends, or a
              celebration, Scooters delivers incredible food, vibrant energy,
              and memories that last.
            </p>

            {/* Rating badge */}
            <div
              className="reveal reveal-delay-4 inline-flex items-center gap-4 rounded-lg px-6 py-4 border"
              style={{
                background: "oklch(0.14 0.01 20)",
                borderColor: "oklch(0.78 0.17 85 / 0.3)",
              }}
            >
              <div className="text-center">
                <div className="text-4xl font-heading font-bold gold-gradient-text">
                  4.1
                </div>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: "oklch(0.78 0.17 85)" }}
                    />
                  ))}
                  <Star
                    className="w-4 h-4"
                    style={{ color: "oklch(0.78 0.17 85)" }}
                  />
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-xl font-heading font-semibold text-foreground">
                  1700+
                </div>
                <div className="text-sm text-muted-foreground">
                  Reviews on Google
                </div>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="reveal reveal-delay-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/assets/generated/gallery-dining.dim_800x600.jpg"
                alt="Dining ambience"
                className="rounded-lg w-full h-48 object-cover col-span-2"
              />
              <img
                src="/assets/generated/gallery-bar.dim_800x600.jpg"
                alt="Bar"
                className="rounded-lg w-full h-40 object-cover"
              />
              <img
                src="/assets/generated/gallery-party.dim_800x600.jpg"
                alt="Party"
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.21 27), oklch(0.62 0.2 35))",
              }}
            >
              <span className="text-xs font-semibold text-white/80 leading-tight">
                Since
              </span>
              <span className="text-lg font-heading font-bold text-white">
                2018
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Menu ---
const dishes = [
  {
    id: 1,
    name: "Crispy Corn Masala",
    desc: "Golden corn tossed in aromatic spices",
    price: "₹249",
    img: "/assets/generated/dish-crispy-corn.dim_600x500.jpg",
  },
  {
    id: 2,
    name: "Tandoori Chicken",
    desc: "Smoky clay oven chicken with classic spices",
    price: "₹549",
    img: "/assets/generated/dish-tandoori-chicken.dim_600x500.jpg",
  },
  {
    id: 3,
    name: "Chicken Tikka",
    desc: "Juicy marinated skewers, perfectly grilled",
    price: "₹449",
    img: "/assets/generated/dish-chicken-tikka.dim_600x500.jpg",
  },
  {
    id: 4,
    name: "Honey Chilli Potato",
    desc: "Crispy potatoes in a sweet chilli glaze",
    price: "₹229",
    img: "/assets/generated/dish-honey-chilli-potato.dim_600x500.jpg",
  },
  {
    id: 5,
    name: "Biryani",
    desc: "Fragrant saffron rice with tender chicken",
    price: "₹379",
    img: "/assets/generated/dish-biryani.dim_600x500.jpg",
  },
];

function MenuSection({ onBook }: { onBook: () => void }) {
  const ref = useScrollReveal();
  return (
    <section
      id="menu"
      data-ocid="menu.section"
      ref={ref}
      className="py-24"
      style={{ background: "oklch(0.09 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.17 85)" }}
          >
            Signature Dishes
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Menu <span className="gold-gradient-text italic">Highlights</span>
          </h2>
          <div className="section-divider reveal reveal-delay-2" />
          <p className="reveal reveal-delay-3 text-foreground/60 max-w-lg mx-auto">
            Crafted with passion, every dish tells a story of authentic Indian
            flavours and culinary artistry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, idx) => (
            <div
              key={dish.id}
              data-ocid={`menu.item.${dish.id}`}
              className={`reveal reveal-delay-${Math.min(idx + 1, 5)} menu-card rounded-xl overflow-hidden cursor-pointer group ${
                idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ background: "oklch(0.13 0.005 20)" }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold"
                  style={{ background: "oklch(0.52 0.21 27)", color: "white" }}
                >
                  {dish.price}
                </div>
                {/* Hover overlay */}
                <div className="menu-card-overlay">
                  <button
                    type="button"
                    onClick={onBook}
                    className="px-5 py-2 rounded-full text-sm font-semibold text-black transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.17 85), oklch(0.88 0.12 75))",
                    }}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-sm">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Gallery ---
const galleryImages = [
  {
    src: "/assets/generated/gallery-bar.dim_800x600.jpg",
    alt: "Bar & Cocktails",
    label: "Bar & Cocktails",
    span: "col-span-1",
  },
  {
    src: "/assets/generated/gallery-dining.dim_800x600.jpg",
    alt: "Dining Room",
    label: "Elegant Dining",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/assets/generated/gallery-party.dim_800x600.jpg",
    alt: "Party Night",
    label: "Live Party Nights",
    span: "col-span-1",
  },
  {
    src: "/assets/generated/gallery-food-spread.dim_800x600.jpg",
    alt: "Food Spread",
    label: "Grand Food Spread",
    span: "col-span-2",
  },
];

function Gallery() {
  const ref = useScrollReveal();
  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      ref={ref}
      className="py-24"
      style={{ background: "oklch(0.11 0.005 20)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.17 85)" }}
          >
            Visual Journey
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            The <span className="gold-gradient-text italic">Scooters</span>{" "}
            Experience
          </h2>
          <div className="section-divider reveal reveal-delay-2" />
        </div>

        <div className="reveal reveal-delay-2 grid grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {galleryImages.map((img) => (
            <div
              key={img.alt}
              className={`gallery-item rounded-xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <p className="absolute bottom-4 left-4 text-white font-heading text-lg font-semibold">
                  {img.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Reviews ---
const reviews = [
  {
    id: 1,
    text: "The food here is absolutely divine! The Chicken Tikka just melts in your mouth. Amazing ambience and friendly staff.",
    name: "Rahul M.",
    stars: 5,
    role: "Regular Visitor",
  },
  {
    id: 2,
    text: "Scooters is our go-to spot for family dinners. The Biryani is to die for and the vibe is always fantastic!",
    name: "Priya S.",
    stars: 5,
    role: "Food Enthusiast",
  },
  {
    id: 3,
    text: "Best restaurant in Pathankot hands down. Loved the music, the cocktails, and the Crispy Corn Masala. Will keep coming back!",
    name: "Arjun K.",
    stars: 4,
    role: "Verified Diner",
  },
];

function Reviews() {
  const ref = useScrollReveal();
  return (
    <section
      id="reviews"
      data-ocid="reviews.section"
      ref={ref}
      className="py-24 relative"
      style={{ background: "oklch(0.09 0 0)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.78 0.17 85 / 0.4), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.17 85)" }}
          >
            What Guests Say
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Guest <span className="gold-gradient-text italic">Reviews</span>
          </h2>
          <div className="section-divider reveal reveal-delay-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              data-ocid={`reviews.item.${review.id}`}
              className={`reveal reveal-delay-${idx + 1} rounded-xl p-8 border flex flex-col gap-4`}
              style={{
                background: "oklch(0.13 0.005 20)",
                borderColor: "oklch(0.22 0.02 30)",
              }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-4 right-6 text-6xl font-heading leading-none opacity-20"
                style={{ color: "oklch(0.78 0.17 85)" }}
              >
                "
              </span>
              <div className="flex gap-1">
                {["s1", "s2", "s3", "s4", "s5"].map((sk, starIdx) => (
                  <Star
                    key={sk}
                    className={`w-4 h-4 ${starIdx < review.stars ? "fill-current" : ""}`}
                    style={{ color: "oklch(0.78 0.17 85)" }}
                  />
                ))}
              </div>
              <p className="text-foreground/75 leading-relaxed flex-1 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.21 27), oklch(0.62 0.2 35))",
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Services ---
const services = [
  {
    icon: ChefHat,
    title: "Dine-In",
    desc: "Experience our warm ambience, live music, and impeccable hospitality in person.",
  },
  {
    icon: Car,
    title: "Kerbside Pickup",
    desc: "Quick, convenient pickup at our doorstep. Your order ready when you arrive.",
  },
  {
    icon: Package,
    title: "No-Contact Delivery",
    desc: "Safe and hygienic home delivery. Great food straight to your doorstep.",
  },
];

function Services() {
  const ref = useScrollReveal();
  return (
    <section
      id="services"
      data-ocid="services.section"
      ref={ref}
      className="py-24"
      style={{ background: "oklch(0.11 0.005 20)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.17 85)" }}
          >
            How We Serve You
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Our <span className="gold-gradient-text italic">Services</span>
          </h2>
          <div className="section-divider reveal reveal-delay-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${idx + 1} rounded-xl p-8 text-center border transition-all duration-300 hover:-translate-y-2`}
              style={{
                background: "oklch(0.13 0.005 20)",
                borderColor: "oklch(0.22 0.02 30)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.21 27 / 0.2), oklch(0.78 0.17 85 / 0.15))",
                }}
              >
                <service.icon
                  className="w-7 h-7"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  const ref = useScrollReveal();
  return (
    <section
      id="contact"
      data-ocid="contact.section"
      ref={ref}
      className="py-24"
      style={{ background: "oklch(0.09 0 0)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.17 85)" }}
          >
            Find Us
          </p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Contact &amp;{" "}
            <span className="gold-gradient-text italic">Location</span>
          </h2>
          <div className="section-divider reveal reveal-delay-2" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info cards */}
          <div className="space-y-6">
            <div
              className="reveal reveal-delay-1 flex items-start gap-4 rounded-xl p-6 border"
              style={{
                background: "oklch(0.13 0.005 20)",
                borderColor: "oklch(0.22 0.02 30)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.52 0.21 27 / 0.2)" }}
              >
                <MapPin
                  className="w-5 h-5"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-1">
                  Address
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Backside Walia Resort, Jalandhar-Dalhousie Bypass,
                  <br />
                  Mamun, Pathankot, Punjab 145001
                </p>
              </div>
            </div>

            <div
              className="reveal reveal-delay-2 flex items-start gap-4 rounded-xl p-6 border"
              style={{
                background: "oklch(0.13 0.005 20)",
                borderColor: "oklch(0.22 0.02 30)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.52 0.21 27 / 0.2)" }}
              >
                <Phone
                  className="w-5 h-5"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-1">
                  Phone
                </h4>
                <a
                  href="tel:+916283859536"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  +91 62838 59536
                </a>
              </div>
            </div>

            <div
              className="reveal reveal-delay-3 flex items-start gap-4 rounded-xl p-6 border"
              style={{
                background: "oklch(0.13 0.005 20)",
                borderColor: "oklch(0.22 0.02 30)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.52 0.21 27 / 0.2)" }}
              >
                <Clock
                  className="w-5 h-5"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-1">
                  Opening Hours
                </h4>
                <p className="text-muted-foreground text-sm">
                  Opens at 11:00 AM daily
                </p>
                <p className="text-muted-foreground text-sm">
                  Last order at 10:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className="reveal reveal-delay-2 rounded-xl overflow-hidden border"
            style={{ borderColor: "oklch(0.22 0.02 30)", height: "360px" }}
          >
            <iframe
              title="Scooters Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.4!2d75.7!3d32.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391c4a1e1b7b4b4b%3A0x4b4b4b4b4b4b4b4b!2sPathankot%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-ocid="contact.map_marker"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CTA ---
function CTA({ onBook }: { onBook: () => void }) {
  const ref = useScrollReveal();
  return (
    <section
      data-ocid="cta.section"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.16 0.04 25) 0%, oklch(0.12 0.02 20) 50%, oklch(0.14 0.03 40) 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "oklch(0.52 0.21 27)" }}
      />
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "oklch(0.78 0.17 85)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <p
          className="reveal text-sm font-semibold tracking-[0.35em] uppercase mb-6"
          style={{ color: "oklch(0.78 0.17 85)" }}
        >
          Your Table Awaits
        </p>
        <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
          Visit Scooters Today for an{" "}
          <span className="gold-gradient-text italic">Amazing Dining</span>{" "}
          Experience
        </h2>
        <p className="reveal reveal-delay-2 text-foreground/60 text-xl mb-10">
          Great Food. Great Vibes. Unforgettable Moments.
        </p>
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            data-ocid="cta.book_button"
            onClick={onBook}
            className="px-10 py-4 text-base font-semibold text-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-gold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.17 85), oklch(0.88 0.12 75))",
            }}
          >
            Book a Table
          </button>
          <a
            href="tel:+916283859536"
            className="px-10 py-4 text-base font-semibold rounded-lg border transition-all duration-300 hover:bg-white/10"
            style={{
              borderColor: "oklch(0.78 0.17 85 / 0.5)",
              color: "oklch(0.78 0.17 85)",
            }}
          >
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer({ onBook }: { onBook: () => void }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="py-16 border-t"
      style={{
        background: "oklch(0.08 0 0)",
        borderColor: "oklch(0.18 0.01 20)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed
                className="w-6 h-6"
                style={{ color: "oklch(0.78 0.17 85)" }}
              />
              <span
                className="text-2xl font-heading font-bold tracking-widest"
                style={{ color: "oklch(0.78 0.17 85)" }}
              >
                SCOOTERS
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Where Great Food Meets Great Vibes. Authentic Indian cuisine in
              the heart of Pathankot, Punjab.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://www.instagram.com"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-gold"
                  style={{ borderColor: "oklch(0.25 0.02 30)" }}
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "#home",
                "#about",
                "#menu",
                "#gallery",
                "#reviews",
                "#contact",
              ].map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-foreground transition-colors capitalize"
                  >
                    {href.replace("#", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
                <span>
                  Mamun, Pathankot,
                  <br />
                  Punjab 145001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
                <a
                  href="tel:+916283859536"
                  className="hover:text-foreground transition-colors"
                >
                  +91 62838 59536
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "oklch(0.78 0.17 85)" }}
                />
                <span>Opens at 11 AM daily</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={onBook}
              className="mt-6 px-5 py-2.5 text-sm font-semibold rounded border transition-all duration-200"
              style={{
                borderColor: "oklch(0.78 0.17 85 / 0.4)",
                color: "oklch(0.78 0.17 85)",
              }}
            >
              Reserve a Table
            </button>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          style={{ borderColor: "oklch(0.18 0.01 20)" }}
        >
          <p>© {year} Scooters Restaurant. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            Built with{" "}
            <Heart
              className="w-3.5 h-3.5 fill-current"
              style={{ color: "oklch(0.52 0.21 27)" }}
            />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// --- App ---
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <About />
        <MenuSection onBook={() => setBookingOpen(true)} />
        <Gallery />
        <Reviews />
        <Services />
        <Contact />
        <CTA onBook={() => setBookingOpen(true)} />
      </main>
      <Footer onBook={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <Toaster />
    </div>
  );
}
