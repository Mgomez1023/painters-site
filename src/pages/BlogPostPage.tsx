import type {BlogPostData} from '../data/blog';
import {EmailSignupCTA} from '../components/EmailSignupCTA';
import {blogImageMap} from '../data/pageImages';
import {
  ContentBand,
  ImageFeature,
  LinkGrid,
  PageHero,
  QuoteCta,
  SectionHeading,
} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function BlogPostPage({post}: {post: BlogPostData}) {
  const [heroImage, inlineImage] = blogImageMap[post.slug] ?? [];

  return (
    <>
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
      />
      <PageHero eyebrow="Painting Resource" title={post.title} intro={post.intro} />
      {heroImage ? (
        <ImageFeature
          image={heroImage}
          eyebrow="Homeowner Guide"
          title="A clean finish starts with the right scope"
          body="These resources are meant to help homeowners think through prep, color, trim, cabinets, and touch-ups before requesting an estimate."
        />
      ) : null}
      <ContentBand>
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <article className="space-y-8">
              {post.sections.map((section, index) => (
                <div key={section.heading}>
                  <section>
                    <h2 className="text-2xl font-bold text-primary">
                      {section.heading}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      {section.body}
                    </p>
                  </section>
                  {inlineImage && index === 1 ? (
                    <figure className="mt-8 overflow-hidden border border-blue-border bg-white">
                      <img
                        src={inlineImage.src}
                        alt={inlineImage.alt}
                        className="aspect-[16/9] w-full object-cover"
                        loading="lazy"
                      />
                      <figcaption className="px-4 py-3 text-xs leading-relaxed text-gray-500">
                        {inlineImage.caption}
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              ))}
            </article>
            <aside className="space-y-4">
              <LinkGrid title="Related Services" links={post.relatedLinks} />
              <div className="border border-blue-border bg-soft-bg p-5">
                <SectionHeading eyebrow="Quote" title="Planning a project?" />
                <p className="text-sm leading-relaxed text-gray-600">
                  Marom Painting can help define the right painting scope for your
                  home, from prep and touch-ups to full room refreshes.
                </p>
                <a href="/#quote" className="btn-gold mt-5 inline-block py-3 text-[10px]">
                  Request a Free Quote
                </a>
              </div>
            </aside>
          </div>
        </div>
      </ContentBand>
      <section className="bg-blue-bg/30 py-10">
        <div className="section-container">
          <EmailSignupCTA
            sourceTitle={post.title}
            sourcePath={`/blog/${post.slug}`}
          />
        </div>
      </section>
      <QuoteCta
        title="Need help turning a painting idea into a clear scope?"
        text="Call/text 708-420-1260 or send a short note about the surfaces you want refreshed."
      />
    </>
  );
}
