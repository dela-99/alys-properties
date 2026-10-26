import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CalendarDays, Car, Check, ChevronDown, Clock3, Fence, Flower2, Grid2X2, Heart, Lightbulb, MapPin, Search, ShieldCheck, ShowerHead, SlidersHorizontal, Store, Trees, Trophy, Utensils, Users, X } from 'lucide-react'
import { destinations, getDestination } from './data/destinations'
import { events } from './data/events'
import { spaces, getSpace, spacesForDestination, spaceTypesForDestination } from './data/spaces'
import { site } from './data/site'
import { formatDate, formatPriceLabel } from './lib/format'
import type { DestinationId } from './data/types'

const destinationIcon = { plaza: Grid2X2, gardens: Flower2, court: Trophy }
const heroImage: Record<DestinationId, string> = { plaza: '/img/plaza-hero.webp', gardens: '/img/gardens-hero.webp', court: '/img/court-hero.webp' }
const sampleNotice = 'Illustrative sample — details and availability are not confirmed.'
const featureIcons = { store: Store, briefcase: Briefcase, car: Car, utensils: Utensils, users: Users, lightbulb: Lightbulb, trees: Trees, grid: Grid2X2, clock: Clock3, shower: ShowerHead, fence: Fence }

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open || !window.matchMedia('(max-width: 640px)').matches) return

    const scrollY = window.scrollY
    const body = document.body
    const root = document.documentElement
    const previousBodyStyles = { position: body.style.position, top: body.style.top, left: body.style.left, right: body.style.right, width: body.style.width }
    const previousOverflow = root.style.overflow

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    root.style.overflow = 'hidden'

    const preventBackgroundTouch = (event: TouchEvent) => {
      if (!(event.target instanceof Node) || !menuRef.current?.contains(event.target)) event.preventDefault()
    }
    const handleKeys = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggleRef.current?.focus({ preventScroll: true })
        return
      }
      if (event.key !== 'Tab') return
      const links = menuRef.current?.querySelectorAll<HTMLElement>('a[href]')
      if (!links?.length) return
      const first = links[0]
      const last = toggleRef.current
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus({ preventScroll: true })
      }
    }

    document.addEventListener('touchmove', preventBackgroundTouch, { passive: false })
    document.addEventListener('keydown', handleKeys)
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true }))

    return () => {
      document.removeEventListener('touchmove', preventBackgroundTouch)
      document.removeEventListener('keydown', handleKeys)
      body.style.position = previousBodyStyles.position
      body.style.top = previousBodyStyles.top
      body.style.left = previousBodyStyles.left
      body.style.right = previousBodyStyles.right
      body.style.width = previousBodyStyles.width
      root.style.overflow = previousOverflow
      window.scrollTo(0, scrollY)
    }
  }, [open])

  return <>
    <button className={open ? 'menu-backdrop is-open' : 'menu-backdrop'} aria-label="Close navigation" tabIndex={-1} aria-hidden={!open} onClick={() => setOpen(false)} />
    <header className="site-header"><div className="header-inner">
      <Link className="brand" to="/" aria-label="Alys Properties home"><span className="brand-logo-crop"><img src="/brand/alys-logo.jpeg" alt="" /></span><span><b>ALYS</b><small>PROPERTIES</small></span></Link>
      <nav ref={menuRef} id="mobile-main-nav" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink><a href="/#destinations" onClick={() => setOpen(false)}>Explore</a><a href="/#events" onClick={() => setOpen(false)}>Events</a><a href="/#about" onClick={() => setOpen(false)}>About us</a>
      </nav>
      <a className="button button-small header-cta" href="/#contact">Enquire <ArrowUpRight size={15}/></a>
      <button ref={toggleRef} className={open ? 'menu-toggle is-open' : 'menu-toggle'} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-main-nav" aria-expanded={open} onClick={() => setOpen(value => !value)}><span/><span/><span/></button>
    </div></header>
  </>
}

function Footer() {
  return <footer id="contact" className="footer"><div className="footer-main wrap"><div><Link className="brand brand-light" to="/"><span className="brand-logo-crop"><img src="/brand/alys-logo.jpeg" alt="" /></span><span><b>ALYS</b><small>PROPERTIES</small></span></Link><p>Thoughtful spaces for business, celebration and everyday life.</p></div><div><span className="footer-label">Explore</span>{destinations.map(d => <Link key={d.id} to={`/destinations/${d.id}`}>{d.name}</Link>)}</div><div><span className="footer-label">Contact</span><span>Phone · To be confirmed</span><span>Email · To be confirmed</span><span>Address · To be confirmed</span></div><div className="footer-note"><span className="footer-label">A note on this preview</span><p>Sample listings and contact placeholders are shown for demonstration. Please enquire to confirm details.</p><span className="contact-pending-text">Contact details pending confirmation</span></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Alys Properties</span><span>Privacy · Terms · To be published</span></div></footer>
}

function Image({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img className={className} src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
}

function Status({ value }: { value: string }) {
  const label = value === 'available' ? 'Enquiries open' : value === 'limited' ? 'Limited · sample' : 'Currently unavailable · sample'
  return <span className={`status status-${value}`}><i/> {label}</span>
}

function SpaceCard({ id }: { id: string }) {
  const s = getSpace(id)!
  const d = getDestination(s.destinationId)!
  return <Link className="space-card" to={`/spaces/${s.id}`}><div className="space-image"><Image src={s.image} alt={`${s.name} at ${d.name}`} /><span className="sample-tag">Sample</span><button className="heart" aria-label="Save listing" onClick={e => {e.preventDefault(); e.currentTarget.classList.toggle('saved')}}><Heart size={17}/></button></div><div className="space-card-body"><div className="card-eyebrow">{d.name} <span>·</span> {s.type}</div><h3>{s.name}</h3><p>{s.summary}</p><div className="space-card-foot"><Status value={s.status}/><span className="price">{s.priceValue ? formatPriceLabel(s.priceValue, s.priceUnit) : 'Price on enquiry'}</span></div><span className="text-link">View details <ArrowRight size={15}/></span></div></Link>
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  const d = getDestination(event.destinationId)!
  return <article className="event-card"><div className="event-image"><Image src={event.image} alt={`${d.name} event venue`} /><span className="sample-tag">Sample event</span></div><div className="event-body"><div className="event-meta"><span><CalendarDays size={14}/>{formatDate(event.date)}</span><span>{event.category}</span></div><h3>{event.title}</h3><p>{d.name} · {event.time}</p><span className="event-disclaimer">Schedule not confirmed</span><a className="text-link" href="#contact">{event.ctaLabel}<ArrowRight size={15}/></a></div></article>
}

function DestinationCard({ id }: { id: DestinationId }) {
  const d = getDestination(id)!
  const Icon = destinationIcon[id]
  return <Link className={`destination-card destination-${id}`} to={`/destinations/${id}`}><Image src={heroImage[id]} alt={`${d.name} at Alys Properties`} /><div className="destination-shade"/><div className="destination-content"><span className="destination-icon"><Icon size={17}/></span><span className="eyebrow-light">{d.eyebrow}</span><h3>{d.name}</h3><p>{d.summary}</p><span className="round-arrow"><ArrowUpRight size={18}/></span></div></Link>
}

function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<DestinationId | 'all'>('all')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const filtered = useMemo(() => spaces.filter(s => (category === 'all' || s.destinationId === category) && (!query.trim() || `${s.name} ${s.type} ${s.summary} ${s.description} ${s.status} ${s.statusNote} ${getDestination(s.destinationId)?.name} ${getDestination(s.destinationId)?.supports.join(' ')} ${s.features.map(f => `${f.label} ${f.value}`).join(' ')}`.toLowerCase().includes(query.toLowerCase()))), [category, query])
  const visibleSpaces = useMemo(() => category === 'all' ? destinations.map(d => filtered.find(s => s.destinationId === d.id)).filter((s): s is (typeof spaces)[number] => Boolean(s)) : filtered.slice(0, 3), [category, filtered])
  const matchedEvents = useMemo(() => query.trim() ? events.filter(e => (category === 'all' || e.destinationId === category) && `${e.title} ${e.category} ${e.summary} ${e.location} ${getDestination(e.destinationId)?.name}`.toLowerCase().includes(query.toLowerCase())) : [], [category, query])
  const activeEvents = events.slice(0, 3)
  function submit(e: FormEvent) { e.preventDefault(); setSearchSubmitted(true); document.getElementById('available')?.scrollIntoView({behavior:'smooth'}) }
  return <>
    <main>
      <section className="hero wrap"><div className="hero-copy"><div className="hero-kicker"><span/> SPACES FOR WHAT MATTERS</div><h1>Find your<br/><em>perfect space.</em></h1><p>{site.intro}</p><form className="search-box" onSubmit={submit}><Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search venues, spaces or activities" aria-label="Search venues, spaces or activities"/><button type="submit">Explore <ArrowRight size={16}/></button></form><div className="hero-foot"><span><ShieldCheck size={15}/> Enquiries handled with care</span><span><Grid2X2 size={15}/> Three distinct destinations</span></div></div><div className="hero-visual"><Image src={heroImage.plaza} alt="Landscaped modern plaza in warm evening light"/><div className="hero-photo-label"><span>01 / 03</span><b>A place to begin</b><small>Explore the Alys destinations</small></div><div className="hero-stamp">ALYS<br/><span>PROPERTIES</span></div></div></section>
      <section className="destination-section wrap" id="destinations"><div className="section-heading"><div><span className="eyebrow">A PLACE FOR EVERY PLAN</span><h2>Three destinations.<br/><em>Endless possibility.</em></h2></div><p>Find the right setting for a new business, a meaningful gathering or a moment of movement.</p></div><div className="destination-grid">{destinations.map(d => <DestinationCard key={d.id} id={d.id}/>)}</div></section>
      <section className="available-section"><div className="wrap"><div className="section-heading section-heading-row"><div><span className="eyebrow">EXPLORE WHAT'S ON OFFER</span><h2>Available <em>now.</em></h2><p>Explore spaces ready for your next plan.</p></div><span className="sample-banner"><span/> Prototype inventory · details unconfirmed</span></div><div className="filter-row"><div className="filter-label"><SlidersHorizontal size={16}/> Filter spaces</div><div className="chips"><button className={category==='all'?'chip selected':'chip'} onClick={()=>setCategory('all')}>All spaces</button>{destinations.map(d=><button key={d.id} className={category===d.id?'chip selected':'chip'} onClick={()=>setCategory(d.id)}>{d.shortName}</button>)}</div></div>
      {searchSubmitted && query && <div className="results-summary">Showing results for <b>“{query}”</b><button onClick={()=>{setQuery('');setSearchSubmitted(false)}}>Clear search <X size={14}/></button></div>}
      {visibleSpaces.length > 0 && <div className="space-grid">{visibleSpaces.map(s=><SpaceCard key={s.id} id={s.id}/>)}</div>}
      {matchedEvents.length > 0 && <div className="search-event-results"><div className="search-event-heading"><span className="eyebrow">MATCHING EVENTS · SAMPLE SCHEDULE</span><span>{matchedEvents.length} found</span></div><div className="events-grid">{matchedEvents.slice(0,3).map(e=><EventCard key={e.id} event={e}/>)}</div></div>}
      {!visibleSpaces.length && !matchedEvents.length && <div className="empty-state"><Search size={23}/><h3>No matches found</h3><p>Try another search or browse all destinations.</p><button className="text-link" onClick={()=>{setQuery('');setCategory('all')}}>Show all spaces <ArrowRight size={15}/></button></div>}</div></section>
      <section className="events-section wrap" id="events"><div className="section-heading section-heading-row"><div><span className="eyebrow">MARK THE MOMENT</span><h2>Happening <em>soon.</em></h2><p>See what’s coming up across Alys Properties.</p></div><span className="sample-banner"><span/> Illustrative programme · dates unconfirmed</span></div><div className="events-grid">{activeEvents.map(e=><EventCard key={e.id} event={e}/>)}</div><p className="fine-print">Events shown are examples only. No dates, tickets or registrations are confirmed.</p></section>
      <section className="editorial-section"><div className="editorial-inner wrap"><div className="editorial-photo"><Image src={heroImage.gardens} alt="Outdoor garden event venue"/><span>ROOM TO MAKE IT YOURS</span></div><div className="editorial-copy"><span className="eyebrow">THE ALYS EXPERIENCE</span><h2>More than a place.<br/><em>A space for possibility.</em></h2><p>From a new chapter in business to the moments worth gathering for, Alys brings together considered spaces for work, celebration and recreation.</p><a className="button" href="#about">Discover Alys <ArrowRight size={16}/></a><div className="editorial-numbers"><div><b>03</b><span>Distinct destinations</span></div><div><b>01</b><span>Place to explore</span></div></div></div></div></section>
      <section className="about-section wrap" id="about"><div><span className="eyebrow">A NOTE FROM ALYS</span><h2>Made for the way<br/>you want to <em>live.</em></h2></div><p>Alys Properties brings together commercial spaces, event venues and recreational places in one thoughtful collection. This preview introduces the destinations; specific inventory and operating details are being confirmed.</p><a className="text-link" href="#contact">Start a conversation <ArrowRight size={15}/></a></section>
      <section className="cta-band wrap"><div><span className="eyebrow-light">YOUR NEXT CHAPTER STARTS HERE</span><h2>Let's find your place.</h2></div><a className="button button-cream" href="#contact">Make an enquiry <ArrowUpRight size={17}/></a><span className="cta-orbit"/></section>
    </main>
  </>
}

function EnquiryForm({ destinationId, venueId, onClose }: { destinationId: DestinationId; venueId?: string; onClose?: () => void }) {
  const [sent, setSent] = useState(false)
  function handleSubmit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true) }
  return <div className="enquiry-panel" id="enquiry">{onClose && <button className="form-close" onClick={onClose} aria-label="Close enquiry form"><X size={18}/></button>}{sent ? <div className="success-state"><span className="success-icon"><Check size={22}/></span><span className="eyebrow">ENQUIRY PREPARED</span><h3>Your enquiry preview is ready.</h3><p>This demo form does not send or store your details. Connect a company inbox or backend to receive enquiries.</p><button className="button" onClick={()=>{setSent(false);onClose?.()}}>Done <ArrowRight size={15}/></button></div> : <><span className="eyebrow">LET'S TALK</span><h3>Make an enquiry</h3><p>Share a few details and the Alys team can follow up once contact channels are confirmed.</p><form onSubmit={handleSubmit} className="enquiry-form"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label><div className="form-pair"><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="Your number"/></label></div><div className="form-pair"><label>Destination<select name="destination" defaultValue={destinationId}>{destinations.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label><label>Preferred date<input name="date" type="date" min={new Date().toISOString().slice(0,10)}/></label></div><input type="hidden" name="venue" value={venueId ?? ''}/><label>Tell us more<textarea name="message" rows={3} placeholder="What are you planning?"/></label><p className="form-disclaimer">Demo only · no details are stored or sent.</p><button className="button form-submit" type="submit">Prepare enquiry <ArrowRight size={16}/></button></form></>}</div>
}

function DestinationPage() {
  const { id } = useParams(); const d = getDestination(id); const [type, setType] = useState('All spaces');
  if (!d) return <NotFound/>; const Icon = destinationIcon[d.id]; const listing = spacesForDestination(d.id).filter(s=>type==='All spaces'||s.type===type)
  return <main className="detail-page"><section className="destination-hero wrap"><div className="destination-hero-image"><Image src={heroImage[d.id]} alt={`${d.name} destination`} /><Link to="/" className="back-pill"><ArrowLeft size={15}/> All destinations</Link><span className="sample-tag">Preview · illustrative imagery</span></div><div className="destination-hero-copy"><div className="hero-kicker"><Icon size={16}/> {d.eyebrow.toUpperCase()}</div><h1>{d.name}<em>.</em></h1><p className="lead">{d.tagline}</p><p>{d.description}</p><a className="button" href="#enquiry">Enquire about {d.shortName} <ArrowRight size={16}/></a></div></section><section className="detail-highlights wrap">{d.highlights.slice(0,3).map(h=>{const FeatureIcon=featureIcons[h.icon as keyof typeof featureIcons] ?? MapPin;return <div key={h.label}><span className="highlight-icon"><FeatureIcon size={17}/></span><span><b>{h.value}</b><small>{h.label} · sample</small></span></div>})}</section><section className="wrap detail-listings"><div className="section-heading section-heading-row"><div><span className="eyebrow">FIND YOUR SPACE</span><h2>Spaces at <em>{d.shortName}.</em></h2><p>{sampleNotice}</p></div><label className="select-filter"><SlidersHorizontal size={16}/><select value={type} onChange={e=>setType(e.target.value)}><option>All spaces</option>{spaceTypesForDestination(d.id).map(t=><option key={t}>{t}</option>)}</select><ChevronDown size={14}/></label></div><div className="space-grid">{listing.map(s=><SpaceCard key={s.id} id={s.id}/>)}</div></section><section className="wrap amenity-section"><div><span className="eyebrow">WHAT TO EXPECT</span><h2>Considered in<br/><em>every detail.</em></h2></div><div className="amenity-grid">{d.supports.map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><ArrowUpRight size={15}/></div>)}</div></section><section className="wrap form-section"><div className="form-intro"><span className="eyebrow">A GOOD PLACE TO START</span><h2>Tell us what<br/>you have in <em>mind.</em></h2><p>Availability, pricing and access details are examples only. Send an enquiry to discuss your plans.</p><span className="contact-pending"><Clock3 size={15}/> Contact channels pending confirmation</span></div><EnquiryForm destinationId={d.id}/></section></main>
}

function SpacePage() {
  const { id } = useParams(); const s = getSpace(id); const d = s && getDestination(s.destinationId)
  if (!s || !d) return <NotFound/>
  const galleryImages = [...new Set([s.image, ...s.gallery])].filter(image => image !== s.image)
  return <main className="detail-page space-detail"><div className="wrap"><Link className="back-text" to={`/destinations/${d.id}`}><ArrowLeft size={15}/> Back to {d.name}</Link><div className="space-detail-grid"><div><div className="space-detail-image"><Image src={s.image} alt={`${s.name} at ${d.name}`}/><span className="sample-tag">Sample listing</span></div><div className="gallery-strip">{galleryImages.map((image,i)=><div key={image}><Image src={image} alt={`${s.name} additional view ${i+1}`}/></div>)}</div></div><div className="space-detail-copy"><div className="eyebrow">{d.name} · {s.type}</div><h1>{s.name}</h1><Status value={s.status}/><p className="lead">{s.summary}</p><p>{s.description}</p><div className="price-block"><small>Illustrative rate</small><b>{formatPriceLabel(s.priceValue,s.priceUnit)}</b><span>Confirm current pricing with Alys Properties</span></div><div className="facts-grid">{s.size&&<div><small>SIZE</small><b>{s.size}</b></div>}{s.capacity&&<div><small>CAPACITY</small><b>{s.capacity}</b></div>}</div><a className="button full-button" href="#enquiry">Enquire about this space <ArrowRight size={16}/></a><p className="sample-small"><ShieldCheck size={14}/> {sampleNotice}</p></div></div><section className="space-features"><div><span className="eyebrow">DETAILS</span><h2>Made to work<br/>for your <em>plans.</em></h2></div><div className="feature-list">{s.features.map(f=><div key={f.label}><span>{f.label}</span><b>{f.value}</b></div>)}</div></section><section className="form-section"><div className="form-intro"><span className="eyebrow">ENQUIRY ONLY</span><h2>Let's make it<br/><em>happen.</em></h2><p>This prototype prepares an enquiry confirmation on screen. It does not reserve a space or process a payment.</p></div><EnquiryForm destinationId={d.id} venueId={s.id}/></section></div></main>
}

function NotFound() { return <main className="not-found wrap"><span className="eyebrow">PAGE NOT FOUND</span><h1>Let's get you <em>back.</em></h1><Link className="button" to="/">Return home <ArrowRight size={16}/></Link></main> }

export default function App() {
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/destinations/:id" element={<DestinationPage/>}/><Route path="/spaces/:id" element={<SpacePage/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><MobileDock/></>
}

function MobileDock() {
  const { pathname, hash } = useLocation()
  const [hidden, setHidden] = useState(false)
  const active = hash.slice(1) || (pathname.startsWith('/destinations/') ? 'destinations' : pathname === '/' ? 'home' : '')
  useEffect(() => {
    let previousY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - previousY) > 4 && document.body.style.position !== 'fixed') {
        setHidden(currentY > previousY && currentY > 80)
        previousY = currentY
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const items = [
    { id: 'home', href: '/', label: 'Home', Icon: Grid2X2 },
    { id: 'destinations', href: '/#destinations', label: 'Explore', Icon: Search },
    { id: 'events', href: '/#events', label: 'Events', Icon: CalendarDays },
    { id: 'contact', href: '/#contact', label: 'Contact', Icon: ArrowUpRight },
  ]
  return <nav className={hidden ? 'mobile-dock is-hidden' : 'mobile-dock'} aria-label="Quick navigation" aria-hidden={hidden}>{items.map(({ id, href, label, Icon }) => <a key={id} className={active === id ? 'is-active' : undefined} href={href} aria-label={label} aria-current={active === id ? 'page' : undefined} tabIndex={hidden ? -1 : undefined}><Icon size={19}/><span>{label}</span></a>)}</nav>
}
