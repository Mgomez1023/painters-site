import {ArrowRight} from 'lucide-react';
import {areaIndexMeta, areaPages} from '../data/areas';
import {indexImages} from '../data/pageImages';
import {PageHero, QuoteCta} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function AreasIndex() {
  return (
    <>
      <SeoHead
        title={areaIndexMeta.title}
        description={areaIndexMeta.description}
        path="/areas"
      />
      <PageHero
        eyebrow="Service Areas"
        title="Painting services across Chicago and the North Shore."
        intro="Marom Painting serves homeowners in Chicago, Oak Park, Berwyn, Cicero, Evanston, Skokie, and North Shore communities with clean prep, sharp lines, premium finishes, and clear estimates."
      />
      <section className="bg-white py-10 md:py-14">
        <div className="section-container">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {areaPages.map((area, index) => {
              const image = indexImages.areas[index % indexImages.areas.length];

              return (
                <a
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="border border-blue-border bg-white p-6 transition-colors hover:border-primary-light hover:bg-blue-bg/40"
                >
                  {image ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="mb-5 aspect-[16/10] w-full border border-blue-border object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-primary-light">
                    Service Area
                  </p>
                  <h2 className="text-xl font-bold text-primary">{area.city}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {area.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-light">
                    View Area <ArrowRight size={14} />
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
