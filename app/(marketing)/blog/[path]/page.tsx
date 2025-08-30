import { BlogPostClient } from "@/app/(marketing)/blog/_components/blog-post-client";
import blogPosts from "@/blog-posts.json";
import { baseMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    path: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.path as keyof typeof blogPosts];

  if (!post) {
    return {
      title: "Post não encontrado - Pontim",
    };
  }

  return {
    ...baseMetadata,
    title: `${post.title} - Pontim Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((path) => ({
    path,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.path as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const wordCount = post.content.reduce((acc, block) => {
    if (block.type === "paragraph" || block.type === "heading") {
      return acc + (block.text?.split(" ").length || 0);
    }
    if (block.type === "list") {
      return acc + (block.items?.join(" ").split(" ").length || 0);
    }
    return acc;
  }, 0);

  const readingTime = Math.ceil(wordCount / 200);

  return <BlogPostClient post={post} readingTime={readingTime} />;
}
