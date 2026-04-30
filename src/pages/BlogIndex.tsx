import {ArrowRight} from 'lucide-react';
import {EmailSignupCTA} from '../components/EmailSignupCTA';
import {blogIndexMeta, blogPosts} from '../data/blog';
import {indexImages} from '../data/pageImages';
import {PageHero, QuoteCta} from './SeoPageShared';
import {SeoHead} from './SeoHead';

export function BlogIndex() {
  return (
    <>
      <SeoHead
        title={blogIndexMeta.title}
        description={blogIndexMeta.description}
        path="/blog"
      />
      <PageHero
        eyebrow="Resources"
        title="Painting tips for cleaner, sharper home updates."
        intro="Practical guidance from Marom Painting for homeowners planning interior painting, trim refreshes, cabinet painting, prep work, and smaller updates that make a home feel finished."
      />
      <section className="bg-white py-10 md:py-14">
        <div className="section-container">
          <div className="mb-8">
            <EmailSignupCTA sourceTitle="Painting Tips" sourcePath="/blog" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post, index) => {
              const image = indexImages.blog[index % indexImages.blog.length];

              return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
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
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-widest text-primary-light">
                    Painting Tips
                  </p>
                  <h2 className="text-xl font-bold leading-tight text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {post.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-light">
                    Read Article <ArrowRight size={14} />
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
