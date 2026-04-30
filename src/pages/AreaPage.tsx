import {areaServiceLinks, type AreaPageData} from '../data/areas';
import {EmailSignupCTA} from '../components/EmailSignupCTA';
import {areaImageMap} from '../data/pageImages';
import {buildAreaServiceSchema, buildFaqSchema} from '../data/seoSchemas';
import {
  CheckList,
  ContentBand,
  FaqSection,
  ImageFeature,
  LinkGrid,
  PageHero,
  QuoteCta,
  SectionHeading,
} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function AreaPage({area}: {area: AreaPageData}) {
  const [featureImage] = areaImageMap[area.slug] ?? [];
  const faqs = [
    ...area.faqs,
    {
      question: `How do I request a painting quote in ${area.city}?`,
      answer:
        'Call/text 708-420-1260 or send the project details through the quote form. A useful request usually includes the address, surfaces, timing, and any prep or touch-up concerns.',
    },
  ];

  return (
    <>
      <SeoHead
        title={area.metaTitle}
        description={area.metaDescription}
        path={`/areas/${area.slug}`}
        jsonLd={[buildAreaServiceSchema(area), buildFaqSchema(faqs)]}
      />
      <PageHero eyebrow="Service Area" title={area.h1} intro={area.intro} />
      {featureImage ? (
        <ImageFeature
          image={{
            ...featureImage,
            caption:
              'Painting and trim work for homes across Chicago and the North Shore.',
          }}
          eyebrow="Finish Detail"
          title={`Clean painting work for ${area.city} homeowners`}
          body="This image section shows the type of prep and finish detail Marom Painting brings to homes throughout the service area. It is not presented as a city-specific project claim."
        />
      ) : null}
      <ContentBand>
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-10">
              <section>
                <SectionHeading
                  eyebrow="Local Context"
                  title={`A practical painting plan for ${area.city}`}
                />
                <p className="text-base leading-relaxed text-gray-600">
                  {area.localAngle}
                </p>
              </section>

              <section>
                <SectionHeading
                  eyebrow="Services"
                  title={`Services offered in ${area.city}`}
                />
                <CheckList items={area.servicesOffered} />
              </section>

              <section className="border-l-2 border-gold-accent bg-soft-bg p-6">
                <h2 className="text-2xl font-bold text-primary">
                  Clean prep and clear estimates
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Every estimate starts with the condition of the surfaces and the
                  homeowner's goals. We look at patching, trim wear, color direction,
                  access, and finish expectations before recommending a scope.
                </p>
              </section>
            </div>

            <aside className="space-y-4">
              <LinkGrid title="Painting Services" links={areaServiceLinks} />
              <LinkGrid title="Nearby Areas" links={area.nearbyAreas} />
            </aside>
          </div>
        </div>
      </ContentBand>
      <FaqSection faqs={faqs} />
      <QuoteCta
        title={`Request a free painting quote in ${area.city}`}
        text="Call/text 708-420-1260 or send the details through the quote form."
      />
      <section className="bg-white py-10">
        <div className="section-container">
          <EmailSignupCTA
            sourceTitle={area.h1}
            sourcePath={`/areas/${area.slug}`}
          />
        </div>
      </section>
    </>
  );
}
