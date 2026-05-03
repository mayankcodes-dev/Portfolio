import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Pin,
} from "lucide-react";

import Navbar from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

import { getHashnodePosts, formatPostDate, type HashnodePost } from "@/lib/hashnode";
import { blogConfig } from "@/data/blog-config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical frontend essays on React, TypeScript, and building polished web products — by Mayank.",
};

const HASHNODE_PROFILE = "https://codermayank.hashnode.dev";

export default async function BlogPage() {
  let posts: HashnodePost[] = [];
  try {
    posts = await getHashnodePosts(10);
  } catch {
    posts = [];
  }

  let featured = posts[0] ?? null;
  let rest = posts.slice(1);

  if (blogConfig.featuredSlug) {
    const pinnedIndex = posts.findIndex(
      (p) => p.slug === blogConfig.featuredSlug
    );
    if (pinnedIndex !== -1) {
      featured = posts[pinnedIndex];
      rest = posts.filter((_, i) => i !== pinnedIndex);
    }
  }

  const gridPosts = rest.slice(0, 6);
  const isPinned = blogConfig.featuredSlug !== null && featured?.slug === blogConfig.featuredSlug;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#0a0a0a]">

        {/* ── Hero ── */}
        <section className="border-b border-neutral-100">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8 pb-12 pt-8 md:pt-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

              {/* Left copy */}
              <div>
                <span className="eyebrow mb-4">Blog</span>

                <h1
                  className="mt-4 font-extrabold tracking-tighter text-balance"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
                >
                  Practical frontend essays for developers who care about{" "}
                  <span className="text-neutral-400">craft.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-neutral-500">
                  Deep dives on React architecture, product thinking, and interface
                  polish — built from real project decisions and production lessons.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {featured ? (
                    <Link href={featured.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      {isPinned ? "Read featured post" : "Read the latest post"}
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : null}
                  <Link href={HASHNODE_PROFILE} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    View all on Hashnode
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Published posts", value: posts.length > 0 ? `${posts.length}+` : "—" },
                    { label: "Avg. read time", value: posts.length > 0 ? `${Math.round(posts.reduce((a, p) => a + (p.readTimeInMinutes ?? 5), 0) / posts.length)} min` : "—" },
                    { label: "Platform", value: "Hashnode" },
                  ].map((item) => (
                    <div key={item.label} className="card-eng p-4">
                      <p className="text-lg font-bold text-[#0a0a0a]">{item.value}</p>
                      <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — featured post card */}
              {featured ? (
                <Link
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="card-eng overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="p-2">
                      {featured.coverImage?.url ? (
                        <Image
                          src={featured.coverImage.url}
                          alt={featured.title}
                          width={800}
                          height={450}
                          className="h-56 w-full rounded-lg object-cover"
                          priority
                        />
                      ) : (
                        <div className="flex h-56 w-full items-center justify-center rounded-lg bg-neutral-50">
                          <span className="text-4xl">✍️</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                          <CalendarDays className="size-3" />
                          {formatPostDate(featured.publishedAt)}
                        </span>
                        {isPinned ? (
                          <span className="badge badge-neutral text-[10px]">
                            <Pin className="size-2.5" /> Pinned
                          </span>
                        ) : (
                          <span className="badge badge-green text-[10px]">Latest</span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold leading-tight text-[#0a0a0a] group-hover:underline underline-offset-2">
                        {featured.title}
                      </h2>
                      {featured.brief && (
                        <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                          {featured.brief}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="card-eng flex h-72 items-center justify-center">
                  <p className="text-neutral-400">No posts yet — check back soon!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Latest Posts Grid ── */}
        {gridPosts.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-6 md:px-8 py-12 md:py-16">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Latest Articles</p>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                  Fresh reads from the blog
                </h2>
              </div>
              <Link
                href={HASHNODE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm hidden sm:inline-flex"
              >
                View all on Hashnode
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {gridPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <article className="card-eng h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                    {/* Cover thumbnail */}
                    {post.coverImage?.url && (
                      <div className="overflow-hidden border-b border-neutral-100">
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          width={600}
                          height={300}
                          className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags?.slice(0, 2).map((tag: { name: string }) => (
                          <span
                            key={tag.name}
                            className="text-[11px] font-mono text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-[15px] font-bold leading-snug text-[#0a0a0a] line-clamp-2 group-hover:underline underline-offset-2">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                        {post.brief}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-100 text-[11px] font-mono text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3" />
                          {formatPostDate(post.publishedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="size-3" />
                          {post.readTimeInMinutes ?? 5} min
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {posts.length === 0 && (
          <section className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
            <p className="text-neutral-400 text-lg">
              Could not load posts right now.{" "}
              <Link
                href={HASHNODE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#0a0a0a]"
              >
                Visit Hashnode directly →
              </Link>
            </p>
          </section>
        )}

        {/* ── CTA Banner ── */}
        <section className="mx-auto w-full max-w-6xl px-6 md:px-8 pb-16 pt-6 md:pb-20">
          <div className="card-eng text-center px-6 py-12 md:py-16">
            <p className="eyebrow mb-4">More on Hashnode</p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight max-w-lg mx-auto">
              Want to read more? All posts live on Hashnode.
            </h3>
            <p className="mt-3 max-w-md mx-auto text-neutral-500">
              Follow me there to get notified when I publish new articles on
              React, TypeScript, and building polished products.
            </p>
            <div className="mt-8">
              <Link href={HASHNODE_PROFILE} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Read all posts on Hashnode
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
