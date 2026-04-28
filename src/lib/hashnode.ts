export interface HashnodePost {
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  url: string;
  readTimeInMinutes: number;
  coverImage: { url: string } | null;
  tags: { name: string }[];
}

export async function getHashnodePosts(count = 6): Promise<HashnodePost[]> {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetPosts($host: String!, $first: Int!) {
          publication(host: $host) {
            posts(first: $first) {
              edges {
                node {
                  title
                  brief
                  slug
                  publishedAt
                  url
                  readTimeInMinutes
                  coverImage { url }
                  tags { name }
                }
              }
            }
          }
        }
      `,
      variables: {
        host: "codermayank.hashnode.dev",
        first: count,
      },
    }),
    // ISR: revalidate every hour so new posts auto-appear
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Hashnode API error: ${res.status}`);

  const json = await res.json();
  const edges = json?.data?.publication?.posts?.edges ?? [];
  return edges.map((e: { node: HashnodePost }) => e.node);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
