'use client'
import {useSessionStore} from "@/state/state";
import Link from "next/link";
import {langCodeToFlag} from "@/app/speakers/[id]/langCodeToFlag";
import {SessionDisplayed} from "@/app/speakers/[id]/page";

export const SpeakerSession = ({sessions}: { sessions: SessionDisplayed[]}) => {
    const store = useSessionStore()

    return sessions.map(({session, period, room}) => {
        const planned = store.plannedSessions.includes(session.id)

        if (session.type === "Talk") {
            return (
                <Link href={`/schedule/${session.id}`} key={session.id}>
                    <div key={session.id} className="pt-6 flex items-center space-x-5">
                        <div className="flex flex-col">
                            <div className="text-md flex space-x-1">
                                <div className="text-gray-600">
                                    {langCodeToFlag(session.language)}
                                </div>
                                <div>{session.title}</div>
                            </div>
                            <div className="text-sm text-gray-600">
                                {period.start_date.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">{room.name}</div>
                            <div className="flex pt-4  space-x-4  ">
                                {session.tags?.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="cursor-pointer text-gray-600 rounded-xl bg-red-50 w-36 border text-sm border-red-600 text-center "
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                            {
                                planned
                                    ? <>Planned !  <button onClick={(e) => {
                                        e.preventDefault()
                                        store.unplanSession(session.id);
                                    }}>Unplan</button></>
                                    :   <button onClick={(e) => {
                                        e.preventDefault()
                                        store.planSession(session.id);
                                    }}>Plan</button>
                            }
                        </div>
                    </div>
                </Link>
            );
        }
    });
};
