import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Speaker } from "@/types/Speaker";

// export const dynamicParams = false;
// export const dynamic = "force-static";

export async function generateStaticParams() {
  const speakers = await fetch(
    "https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/speakers"
  ).then((res) => res.json());

  return speakers.map((speaker: Speaker) => ({
    id: `${speaker.id}`,
  }));
}

export default async function SpeakerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  if (!id) {
    throw new Error("Speaker not found");
  }
  const speaker: Speaker = await fetch(
    `https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/speakers/${id}`
  ).then((res) => res.json());
  if (!speaker) {
    throw new Error("Speaker not found");
  }

  const avatarFallaback = speaker.full_name
    .split(" ")
    .map((name) => name[0])
    .join("");
  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
      <div className="text-2xl">Speakers</div>
      <div className="flex items-center justify-start space-x-5 pt-8">
        <Avatar>
          <AvatarImage
            src={speaker.avatar_url}
            alt={`Image of ${speaker.full_name}`}
          />
          <AvatarFallback>{avatarFallaback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div>{speaker.full_name}</div>
          <div className="text-gray-600">{speaker.company}</div>
        </div>
      </div>
      <div className="w-48 h-48 rounded-full"></div>
      <p>{speaker.bio}</p>
    </main>
  );
}
