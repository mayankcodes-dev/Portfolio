import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getHashnodePosts, formatPostDate } from "@/lib/hashnode";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical frontend essays on React, TypeScript, and building polished web products — by Mayank.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const HASHNODE_PROFILE = "https://codermayank.hashnode.dev";

export default async function BlogPage() {
  // Fetch 6 latest posts; on error, fall back to empty array
  let posts = [];
  try {
    posts = await getHashnodePosts(6);
  } catch {
    posts = [];
  }

  const [featured, ...rest] = posts;

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_36%,#f8fafc_100%)] text-zinc-900">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-136 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.35),transparent_60%),radial-gradient(circle_at_85%_10%,rgba(249,115,22,0.2),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(120,113,108,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,113,108,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* ── Hero ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-14 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          {/* Left copy */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Badge
              variant="outline"
              className="border-orange-300 bg-orange-100/80 text-orange-700"
            >
              <Sparkles className="size-3" />
              Mayank&apos;s Blog
            </Badge>

            <h1
              className={`${playfair.className} mt-5 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl`}
            >
              Practical frontend essays for developers who care about craft.
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 md:text-lg">
              Deep dives on React architecture, product thinking, and interface
              polish — built from real project decisions and production lessons.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {featured ? (
                <Link href={featured.url} target="_blank" rel="noopener noreferrer">
                  <Button className="h-10 bg-zinc-900 px-5 text-white hover:bg-zinc-700">
                    Read the latest post
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : null}
              <Link href={HASHNODE_PROFILE} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="h-10 border-zinc-300 bg-white/80 px-5"
                >
                  View all on Hashnode
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Published posts", value: posts.length > 0 ? `${posts.length}+` : "—" },
                { label: "Avg. read time", value: posts.length > 0 ? `${Math.round(posts.reduce((a, p) => a + (p.readTimeInMinutes ?? 5), 0) / posts.length)} min` : "—" },
                { label: "Platform", value: "Hashnode" },
              ].map((item) => (
                <Card
                  key={item.label}
                  className="border-zinc-200/90 bg-white/80 shadow-sm"
                >
                  <CardHeader className="gap-0.5 p-4">
                    <CardTitle className="text-lg text-zinc-900">
                      {item.value}
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      {item.label}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Right — featured post card */}
          {featured ? (
            <Link
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group animate-in fade-in slide-in-from-right-8 duration-700"
            >
              <Card className="overflow-hidden border-zinc-200 bg-white/85 shadow-[0_30px_80px_-45px_rgba(24,24,27,0.55)] backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <CardContent className="p-3">
                  {featured.coverImage?.url ? (
                    <Image
                      src={featured.coverImage.url}
                      alt={featured.title}
                      width={800}
                      height={450}
                      className="h-64 w-full rounded-2xl object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50">
                      <span className="text-4xl">✍️</span>
                    </div>
                  )}
                </CardContent>
                <CardHeader className="pt-1">
                  <CardDescription className="inline-flex items-center gap-2 text-zinc-500">
                    <CalendarDays className="size-4" />
                    {formatPostDate(featured.publishedAt)} · Featured Post
                  </CardDescription>
                  <CardTitle
                    className={`${playfair.className} text-2xl leading-tight text-zinc-900`}
                  >
                    {featured.title}
                  </CardTitle>
                  {featured.brief && (
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                      {featured.brief}
                    </p>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <Card className="flex h-80 items-center justify-center border-zinc-200 bg-white/85 shadow-sm">
                <p className="text-zinc-400">No posts yet — check back soon!</p>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ── Latest Posts Grid ── */}
      {rest.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-8 md:py-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                Latest Articles
              </p>
              <h2 className={`${playfair.className} mt-1 text-3xl md:text-4xl`}>
                Fresh reads from the blog
              </h2>
            </div>
            <Link href={HASHNODE_PROFILE} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="w-fit text-zinc-700 hover:text-zinc-900">
                View all on Hashnode
                <ArrowUpRight className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((post, index) => (
              <Link
                key={post.slug}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-zinc-200/90 bg-white/82 shadow-sm backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl animate-in fade-in slide-in-from-bottom-6">
                  {/* Cover thumbnail */}
                  {post.coverImage?.url && (
                    <div className="overflow-hidden rounded-t-xl">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <CardHeader className="gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag.name}
                          variant="outline"
                          className="border-zinc-300 text-xs text-zinc-600"
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="mt-1 text-xl leading-snug text-zinc-900 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-zinc-600 line-clamp-2">
                      {post.brief}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto justify-between gap-2 bg-zinc-100/70">
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                      <CalendarDays className="size-3.5" />
                      {formatPostDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700">
                      <Clock3 className="size-3.5" />
                      {post.readTimeInMinutes ?? 5} min read
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {posts.length === 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <p className="text-zinc-400 text-lg">
            Could not load posts right now.{" "}
            <Link
              href={HASHNODE_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-zinc-700"
            >
              Visit Hashnode directly →
            </Link>
          </p>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 md:pb-24 md:pt-10">
        <Card className="border-zinc-200 bg-gradient-to-br from-orange-50 to-amber-50/60 shadow-[0_24px_65px_-40px_rgba(24,24,27,0.35)]">
          <CardContent className="flex flex-col items-center gap-5 px-6 py-10 text-center md:py-14">
            <Badge variant="outline" className="border-orange-300 bg-orange-100/80 text-orange-700">
              <Sparkles className="size-3" />
              More on Hashnode
            </Badge>
            <h3 className={`${playfair.className} max-w-lg text-3xl md:text-4xl`}>
              Want to read more? All posts live on Hashnode.
            </h3>
            <p className="max-w-md text-zinc-600">
              Follow me there to get notified when I publish new articles on
              React, TypeScript, and building polished products.
            </p>
            <Link href={HASHNODE_PROFILE} target="_blank" rel="noopener noreferrer">
              <Button className="h-11 bg-zinc-900 px-7 text-white hover:bg-zinc-700">
                Read all posts on Hashnode
                <ArrowUpRight className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
