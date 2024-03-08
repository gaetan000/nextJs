import { Speaker} from "@/types/Speaker"

// export const dynamicParams = false;
// export const dynamic = "force-static";

export async function generateStaticParams() {
 
  
    const speakers = await fetch('https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/speakers').then((res) => res.json())

    return speakers.map((speaker: Speaker) => ({
      id: `${speaker.id}`,
    }));
  }
export default async function Speaker({ params }: { params: { id: string } }) {
    const { id } = params;
    if(!id) {
      throw new Error("Speaker not found");
    }
    const speaker = await fetch(`https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/speakers/${id}`).then((res) => res.json())
    if(!speaker) {
      throw new Error("Speaker not found");
    }
    return (
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <h1>Speaker n° {speaker.id}</h1>
        <h2>{speaker.name}</h2>
        <p>{speaker.bio}</p>
      </main>
    );
}
