import type {ServicePageData} from '../data/services';
import {EmailSignupCTA} from '../components/EmailSignupCTA';
import {blogPosts} from '../data/blog';
import {serviceImageMap} from '../data/pageImages';
import {buildFaqSchema, buildServiceSchema} from '../data/seoSchemas';
import {
  CheckList,
  ContentBand,
  FaqSection,
  ImageFeature,
  ImageGrid,
  LinkGrid,
  PageHero,
  QuoteCta,
  SectionHeading,
} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function ServicePage({service}: {service: ServicePageData}) {
  const images = serviceImageMap[service.slug] ?? [];
  const [featureImage, ...galleryImages] = images;
  const relatedBlogLinks = blogPosts.slice(0, 3).map((post) => ({
    label: post.title,
    href: `/blog/${post.slug}`,
  }));

  return (
    <>
      <SeoHead
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
        jsonLd={[buildServiceSchema(service), buildFaqSchema(service.faqs)]}
      />
      <PageHero eyebrow="Painting Services" title={service.h1} intro={service.intro} />
      {featureImage ? (
        <ImageFeature
          image={featureImage}
          title={`${service.title} details that affect the final finish`}
          body="Photos on this site show real painting and trim details from Marom Painting work. For service pages, images are used to show finish quality and surface detail without making unsupported project or location claims."
        />
      ) : null}
      <ContentBand>
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-10">
              <ImageGrid images={galleryImages} />

              <section>
                <SectionHeading
                  eyebrow="Included"
                  title={`What ${service.title.toLowerCase()} includes`}
                />
                <CheckList items={service.includes} />
              </section>

              <section>
                <SectionHeading
                  eyebrow="Why Marom"
                  title="Why homeowners choose Marom Painting"
                />
                <div className="grid gap-4 md:grid-cols-3">
                  {service.whyChoose.map((item) => (
                    <p
                      key={item}
                      className="border-t-2 border-gold-accent bg-soft-bg p-5 text-sm leading-relaxed text-gray-600"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <SectionHeading eyebrow="Process" title="A simple project process" />
                <div className="grid gap-3">
                  {service.process.map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold-accent text-[10px] font-bold text-primary">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-relaxed text-gray-600">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <LinkGrid title="Related Services" links={service.relatedServices} />
              <LinkGrid title="Service Areas" links={service.relatedAreas} />
              <LinkGrid title="Helpful Resources" links={relatedBlogLinks} />
            </aside>
          </div>
        </div>
      </ContentBand>
      <FaqSection faqs={service.faqs} />
      <QuoteCta
        title={`Request a free ${service.title.toLowerCase()} quote`}
        text="Call or text 708-420-1260, or send the project details through the quote form."
      />
      <section className="bg-white py-10">
        <div className="section-container">
          <EmailSignupCTA
            sourceTitle={service.title}
            sourcePath={`/services/${service.slug}`}
          />
        </div>
      </section>
    </>
  );
}
