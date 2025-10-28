import { type CollectionEntry } from 'astro:content';
import { getPost } from '../../../utils/posts';
import { generateOGImage } from '../../../utils/og-image';


interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<'blog'> };
}

export async function GET({ params }: Props) {
  const { slug } = params;

  const post = await getPost("talks", slug)

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      children: [
        // Main Content
        {
          type: 'div',
          props: {
            tw: 'flex flex-col items-start px-16 w-full',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-6xl font-bold leading-tight',
                  children: post?.data.title || "",
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-2xl text-gray-500 mt-4',
                  children: post?.data.date || "No Date",
                },
              },
            ],
          },
        },
        // Footer with Author & Category
        {
          type: 'div',
          props: {
            tw: 'absolute right-10 bottom-10 flex items-center space-x-2 text-3xl',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-sky-600',
                  children: "Boris Tane",
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-gray-400',
                  style: { fontSize: '30px' },
                  children: '|',
                },
              },
              {
                type: 'div',
                props: {
                  tw: 'text-gray-800',
                  children: 'Talks',
                },
              },
            ],
          },
        },
      ],
      tw: 'w-full h-full flex items-center justify-center relative px-22',
      style: {
        background: '#FAF4ED',
      },
    },
  };

  return generateOGImage(html, {
    width: 1200,
    height: 600,
  });
}
