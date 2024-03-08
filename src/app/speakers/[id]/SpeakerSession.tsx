'use client'
import {useSessionStore} from "@/state/state";
import Link from "next/link";
import {langCodeToFlag} from "@/app/speakers/[id]/langCodeToFlag";
import {SessionDisplayed} from "@/app/speakers/[id]/page";
import {Button} from "@/components/MovingBorder";


export const SpeakerSession = ({sessions}: { sessions: SessionDisplayed[] }) => {
    const store = useSessionStore()

    return sessions.map(({session, period, room}) => {
        const planned = store.plannedSessions.includes(session.id)

        const heartIcon = <svg xmlns="http://www.w3.org/2000/svg" fill={planned ? "red" : "none"} viewBox="0 0 24 24" strokeWidth={1.5}
                               stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>;
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
                            <div className="flex w-full content-between">
                                <div className="text-sm text-gray-600">
                                    {period.start_date.toLocaleString()}
                                </div>
                                <Button
                                    borderRadius="1.75rem"
                                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                                >
                                    {
                                        planned
                                            ? <button onClick={(e) => {
                                                e.preventDefault()
                                                store.unplanSession(session.id);
                                            }}>{heartIcon}</button>

                                            : <button onClick={(e) => {
                                                e.preventDefault()
                                                store.planSession(session.id);
                                            }}>{heartIcon}</button>
                                    }
                                </Button>

                            </div>
                            <div className="text-sm text-gray-600">{room.name}</div>
                            <div className="flex pt-4  space-x-4  ">
                            {session.tags?.map((tag) => (
                                    <div
                                        key={tag.id}
                                        className="cursor-pointer text-gray-600 rounded-xl bg-red-50 w-1/5  border text-sm border-red-600 text-center "
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </Link>
            );
        }
    });
};



