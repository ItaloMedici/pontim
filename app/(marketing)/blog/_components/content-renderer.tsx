"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, ReactNode } from "react";

interface ContentBlock {
  type: string;
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
  style?: string;
  items?: string[];
}

interface ContentRendererProps {
  content: ContentBlock[];
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ComponentBlockProps = {
  block: ContentBlock;
  motionProps: Record<string, unknown>;
};

export function ContentRenderer({ content }: ContentRendererProps) {
  const renderBlock = (block: ContentBlock, index: number) => {
    const key = `block-${index}-${block.type}-${block.text?.slice(0, 5)?.replaceAll(" ", "-") ?? "no-text"}-${block.items?.length ?? ""}`;

    const motionProps = {
      initial: "hidden",
      animate: "visible",
      variants: fadeInVariants,
      transition: { delay: index * 0.1, duration: 0.5 },
    };

    const props: ComponentBlockProps = {
      block,
      motionProps,
    };

    const blockMap: Record<string, ReactNode> = {
      paragraph: <ParagraphBlock {...props} />,
      heading: <HeadingBlock {...props} />,
      image: <ImageBlock {...props} />,
      list: <ListBlock {...props} />,
      references: <ReferencesBlock {...props} />,
    };

    const Block = blockMap[block.type];

    if (!Block) return null;

    return <Fragment key={key}>{Block}</Fragment>;
  };

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

const ParagraphBlock = ({ block, motionProps }: ComponentBlockProps) => {
  return (
    <motion.p
      className="text-muted-foreground leading-relaxed mb-6"
      {...motionProps}
    >
      {block.text ? processTextFormatting(block.text) : ""}
    </motion.p>
  );
};

const headingClasses = {
  1: "text-3xl md:text-4xl font-bold text-foreground mb-6 mt-8",
  2: "text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-8",
  3: "text-xl md:text-2xl font-semibold text-foreground mb-3 mt-6",
  4: "text-lg md:text-xl font-semibold text-foreground mb-3 mt-4",
  5: "text-md md:text-lg font-semibold text-foreground mb-2 mt-4",
  6: "text-sm md:text-md font-semibold text-foreground mb-2 mt-3",
};

const HeadingBlock = ({ block, motionProps }: ComponentBlockProps) => {
  const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;

  return (
    <motion.div {...motionProps}>
      <HeadingTag
        className={
          headingClasses[block.level as keyof typeof headingClasses] ||
          headingClasses[2]
        }
      >
        {block.text}
      </HeadingTag>
    </motion.div>
  );
};

const ImageBlock = ({ block, motionProps }: ComponentBlockProps) => {
  if (!block.src) return null;

  return (
    <motion.div
      {...motionProps}
      className="my-8 rounded-lg overflow-hidden border border-border"
    >
      <Image
        src={block.src}
        alt={block.alt || ""}
        width={800}
        height={400}
        className="w-full h-auto object-cover"
      />
    </motion.div>
  );
};

const ListBlock = ({ block, motionProps }: ComponentBlockProps) => {
  const ListTag = block.style === "ordered" ? "ol" : "ul";
  const listClasses =
    block.style === "ordered"
      ? "list-decimal list-inside space-y-2 mb-6 text-muted-foreground"
      : "list-disc list-inside space-y-2 mb-6 text-muted-foreground";

  return (
    <motion.div {...motionProps}>
      <ListTag className={listClasses}>
        {block.items?.map((item, itemIndex) => (
          <li key={itemIndex} className="leading-relaxed">
            {processTextFormatting(item)}
          </li>
        ))}
      </ListTag>
    </motion.div>
  );
};

const ReferencesBlock = ({ block, motionProps }: ComponentBlockProps) => {
  const buildItem = (reference: string, refIndex: number) => {
    const parts = reference.split(": ");
    const title = parts[0];
    const url = parts.slice(1).join(": "); // Junta caso haja : na URL

    return (
      <li
        key={`li-reference-${refIndex}`}
        className="text-xs text-muted-foreground/70 leading-relaxed"
      >
        <span className="font-medium text-muted-foreground/90">{title}:</span>{" "}
        {url.startsWith("http") ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary underline decoration-dotted underline-offset-2 transition-colors"
          >
            {url}
          </a>
        ) : (
          <span>{url}</span>
        )}
      </li>
    );
  };

  return (
    <motion.div {...motionProps}>
      <div className="mt-12 pt-6 border-t border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground/80 mb-4 uppercase tracking-wide">
          Fontes e Referências
        </h3>
        <ul className="space-y-3">
          {block.items?.map((reference, refIndex) =>
            buildItem(reference, refIndex),
          )}
        </ul>
      </div>
    </motion.div>
  );
};

const processTextFormatting = (text: string) => {
  return text.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="font-italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};
