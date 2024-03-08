import Image from "next/image";
import {Speaker} from "@/types/Speaker";
import Link from "next/link";

interface SpeakerCardProps {
    speaker: Speaker
}

export const SpeakerCard = ({speaker}: SpeakerCardProps) => (<Link className="flex justify-center p-4" href={`/speakers/${speaker.id}`}>
        <Image className="aspect-square object-cover flex-shrink-0 flex-grow-0 h-64 w-64" src={speaker.avatar_url} alt={speaker.full_name} width={200} height={200}/>
        <div className="p-2">
            <p className="font-bold">{speaker.company}</p>
            <h2 className="text-3xl">{speaker.full_name}</h2>
            <p>{speaker.bio}</p>
        </div>
    </Link>
)
