import type {ReactNode} from 'react';
import {ArrowRight, CheckCircle2, Phone} from 'lucide-react';
import type {PageImage} from '../data/pageImages';
import type {FaqItem, SeoLink} from '../data/services';

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="bg-primary pt-32 pb-12 text-white md:pt-36 md:pb-16">
      <div className="section-container">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-gold-accent"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.38em] text-gold-accent">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#quote" className="btn-gold text-center">
              Request a Free Quote
            </a>
            <a
              href="tel:7084201260"
              className="inline-flex items-center justify-center gap-2 border border-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary"
            >
              <Phone size={15} />
              Call/Text 708-420-1260
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContentBand({children}: {children: ReactNode}) {
  return <section className="bg-white py-10 md:py-14">{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-px w-5 bg-primary-light"></div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-primary-light">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function CheckList({items}: {items: string[]}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 border border-blue-border bg-soft-bg p-4">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary-light" />
          <p className="text-sm leading-relaxed text-gray-600">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function LinkGrid({
  title,
  links,
}: {
  title: string;
  links: SeoLink[];
}) {
  return (
    <div className="border border-blue-border bg-soft-bg p-5">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
        {title}
      </h3>
      <div className="grid gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center justify-between gap-3 border border-blue-border bg-white px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:border-primary-light hover:text-primary-light"
          >
            {link.label}
            <ArrowRight size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function ImageFeature({
  image,
  eyebrow = 'Project Detail',
  title,
  body,
}: {
  image: PageImage;
  eyebrow?: string;
  title: string;
  body: string;
}) {
  return (
    <section className="bg-blue-bg/35 py-10 md:py-14">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-center">
          <figure className="overflow-hidden border border-blue-border bg-white shadow-sm">
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <figcaption className="border-t border-blue-border bg-white px-4 py-3 text-xs leading-relaxed text-gray-500">
              {image.caption}
            </figcaption>
          </figure>
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} />
            <p className="text-base leading-relaxed text-gray-600">{body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImageGrid({
  title = 'Painting and finish details',
  images,
}: {
  title?: string;
  images: PageImage[];
}) {
  if (!images.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading eyebrow="Work Details" title={title} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <figure
            key={`${image.src}-${image.alt}`}
            className="overflow-hidden border border-blue-border bg-white"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <figcaption className="px-3 py-3 text-xs leading-relaxed text-gray-500">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FaqSection({faqs}: {faqs: FaqItem[]}) {
  return (
    <section className="bg-blue-bg/35 py-10 md:py-14">
      <div className="section-container">
        <SectionHeading eyebrow="Questions" title="Common homeowner questions" />
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="border border-blue-border bg-white p-5">
              <h3 className="text-base font-bold text-primary">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteCta({
  title = 'Ready to plan your painting project?',
  text = 'Tell us what you want refreshed and we will help define a clear scope for your home.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-primary py-10 text-white">
      <div className="section-container">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
              {text}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/#quote" className="btn-gold text-center">
              Request a Free Quote
            </a>
            <a href="tel:7084201260" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
              708-420-1260
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
