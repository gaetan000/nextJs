import {SpeakerCard} from "@/app/speakers/SpeakerCard";
import {Speaker} from "@/types/Speaker";

export default async function Speakers () {
    const speakers: Speaker[] = await fetch(
        "https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/speakers"
    ).then((res) => res.json() );
    return <article className="container mx-auto">
        <h1 className="font-bold text-3xl">Speakers</h1>
        <div className="grid-cols-2 grid">
            {speakers.map (speaker => <SpeakerCard key={speaker.id} speaker={speaker} />)}
        </div>
    </article>
}




