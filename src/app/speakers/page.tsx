import example from "./example.json"
import {SpeakerCard} from "@/app/speakers/SpeakerCard";

export default function Speaker () {
    return <article>
        <h1>Speakers</h1>
        {example.map (speaker => <SpeakerCard key={speaker.id} speaker={speaker} />)}
    </article>
}




