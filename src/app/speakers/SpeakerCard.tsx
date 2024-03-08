import Image from "next/image";
import {Speaker} from "@/types/Speaker";

interface SpeakerCardProps {
    speaker: Speaker
}

export const SpeakerCard = ({speaker}: SpeakerCardProps) => (<section>
        <h2>{speaker.full_name}</h2>
        <Image src={speaker.avatar_url} alt={speaker.full_name} width={100} height={100}/>
        <p>{speaker.company}</p>
        <p>{speaker.bio}</p>
    </section>
)
