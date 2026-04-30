import {ArrowRight} from 'lucide-react';
import {indexImages} from '../data/pageImages';
import {serviceIndexMeta, servicePages} from '../data/services';
import {PageHero, QuoteCta} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function ServicesIndex() {
  return (
    <>
      <SeoHead
        title={serviceIndexMeta.title}
        description={serviceIndexMeta.description}
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title="Painting services built around prep, detail, and clear estimates."
        intro="Marom Painting helps Chicago and North Shore homeowners refresh interiors, exteriors, trim, cabinets, and worn surfaces with clean prep and sharp finishing work."
      />
      <section className="bg-white py-10 md:py-14">
        <div className="section-container">
          <div className="grid gap-px overflow-hidden border border-blue-border bg-blue-border md:grid-cols-2">
            {servicePages.map((service, index) => {
              const image = indexImages.services[index % indexImages.services.length];

              return (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white p-6 transition-colors hover:bg-primary md:p-8"
              >
                {image ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="mb-5 aspect-[16/10] w-full border border-blue-border object-cover"
                    loading="lazy"
                  />
                ) : null}
                <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-primary-light group-hover:text-gold-accent">
                  Marom Painting
                </p>
                <h2 className="text-2xl font-bold text-primary transition-colors group-hover:text-white">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 transition-colors group-hover:text-white/70">
                  {service.intro}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-light group-hover:text-gold-accent">
                  View Service <ArrowRight size={14} />
                </span>
              </a>
              );
            })}
          </div>
        </div>
      </section>
      <QuoteCta />
    </>
  );
}
