// Next & React
import { Metadata } from "next";
// Libraries
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// Services
import { fetchServerNoteById } from "@/lib/api/serverApi";
// Components
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { title, content } = await fetchServerNoteById(id);

  return {
    title: `${title} - Note Hub`,
    description: `${content.slice(0, 50)}...`,
    openGraph: {
      title: `${title} - Note Hub`,
      description: `${content.slice(0, 50)}...`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 644,
          height: 429,
          alt: "Note Hub",
        },
      ],
      type: "article",
    },
  };
}

//server component
const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
