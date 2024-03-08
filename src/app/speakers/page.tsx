import example from "./example.json"
import {SpeakerCard} from "@/app/speakers/SpeakerCard";

export default function Speaker () {
    return <article className="container mx-auto">
        <h1 className="font-bold text-3xl">Speakers</h1>
        <div className="grid-cols-2 grid">
            {example.map (speaker => <SpeakerCard key={speaker.id} speaker={speaker} />)}
        </div>
    </article>
}




