import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Speaker } from "@/types/Speaker";
import { ScheduleSessionApi } from "@/types/api-types";
import Image from "next/image";
import { z } from "zod";
import { langCodeToFlag } from "./langCodeToFlag";
import { Separator } from "@/components/ui/separator";

// export const dynamicParams = false;
// export const dynamic = "force-static";

const ScheduleTagApi = z.object({
  id: z.string(),
  name: z.string(),
});

const ScheduleSpeakerApi = z.object({
  id: z.string(),
  full_name: z.string(),
  avatar_url: z.string(),
  company: z.string(),
});

const ScheduleBreakApi = z.object({
  type: z.literal("Break"),
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  pictureUrl: z.string().optional().nullable(),
});

const ScheduleTalkApi = z.object({
  type: z.literal("Talk"),
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  speakers: z.array(ScheduleSpeakerApi),
  language: z.string(),
  tags: z.array(ScheduleTagApi),
});

const ScheduleSessionApiZod = z.union([ScheduleBreakApi, ScheduleTalkApi]);
const ScheduleSessionApiArrayZod = z.array(ScheduleSessionApiZod);

type ScheduleSessionApiInfered = z.infer<typeof ScheduleSessionApiZod>;
type ScheduleSessionApiArrayInfered = z.infer<
  typeof ScheduleSessionApiArrayZod
>;



const scheduleZod = z.object({
  

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

  const schedule = await fetch(
    "https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/schedule"
  ).then((res) => res.json());
  const sessionsItems = schedule.items.map(
    (x: { session: ScheduleSessionApiInfered }) => {
      return {
        session : x.session
        schedule: x.schedule
      }
    }
  );
  console.log("sessionsItems", sessionsItems);
  const sessionsParsed: ScheduleSessionApiArrayInfered =
    ScheduleSessionApiArrayZod.parse(sessionsItems);
  const sessions = sessionsParsed.filter((session) => {
    if (
      session.type === "Talk" &&
      session.speakers.some((sp) => sp.id === id)
    ) {
      return true;
    }
  });

  const avatarFallaback = speaker.full_name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const renderSpeakerSessions = (sessions: ScheduleSessionApiArrayInfered) => {
    return sessions.map((session) => {
      if (session.type === "Talk") {
        return (
          <div key={session.id} className="flex items-center space-x-5">
            <div className="flex flex-col">
              <div className="text-lg">{session.title}</div>
              <div className="text-md text-gray-600">{" 08 mars 2024"}</div>
              <div className="flex flex-col space-y-4  ">
                {session.tags?.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer text-gray-600 rounded-xl bg-red-50 w-1/5  border  border-red-200 text-center hover:bg-red-200"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>

              <div className="text-gray-600">
                {langCodeToFlag(session.language)}
              </div>
              <div className="text-gray-600">
                {session.speakers.map((sp) => sp.full_name).join(", ")}
              </div>
            </div>
          </div>
        );
      }
    });
  };

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
      <Separator className="my-4" />

      <div>{speaker.bio}</div>

      <div className="pt-20">
        <div>
          Sessions</div>
          <div>{renderSpeakerSessions(sessions)}</div></div>
    </main>
  );
}
