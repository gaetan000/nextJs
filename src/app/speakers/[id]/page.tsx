import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Speaker } from "@/types/Speaker";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BadgeTag } from "@/components/BadgeTag";
import Image from "next/image";
import { langCodeToFlag } from "./langCodeToFlag";
import { SpeakerSession } from "./SpeakerSession";
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
  description: z.string(),
  speakers: z.array(ScheduleSpeakerApi),
  language: z.string(),
  tags: z.array(ScheduleTagApi),
});

const ScheduleSessionApi = z.union([ScheduleBreakApi, ScheduleTalkApi]);

const ScheduleRoomApi = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
});

const SchedulePeriodApi = z.object({
  start_date: z.union([z.string(), z.instanceof(Date)]),
  end_date: z.union([z.string(), z.instanceof(Date)]),
});

const ScheduleItemApi = z.object({
  period: SchedulePeriodApi,
  room: ScheduleRoomApi,
  session: ScheduleSessionApi,
});

const ScheduleApi = z.object({
  editionKey: z.string(),
  mainLanguage: z.string(),
  rooms: z.array(ScheduleRoomApi),
  items: z.array(ScheduleItemApi),
});

// Zod Types for TypeScript interfaces
type ScheduleApiType = z.infer<typeof ScheduleApi>;
type ScheduleItemType = z.infer<typeof ScheduleItemApi>;
type SchedulePeriodType = z.infer<typeof SchedulePeriodApi>;
type ScheduleRoomType = z.infer<typeof ScheduleRoomApi>;
type ScheduleSessionType = z.infer<typeof ScheduleSessionApi>;
type ScheduleBreakType = z.infer<typeof ScheduleBreakApi>;
type ScheduleTalkType = z.infer<typeof ScheduleTalkApi>;
type ScheduleSpeakerType = z.infer<typeof ScheduleSpeakerApi>;
type ScheduleTagType = z.infer<typeof ScheduleTagApi>;

export type SessionDisplayed = {
  session: ScheduleSessionType;
  period: SchedulePeriodType;
  room: ScheduleRoomType;
};

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

  const schedule: ScheduleApiType = await fetch(
    "https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/schedule"
  ).then((res) => res.json());
  const scheduleParsed = ScheduleApi.parse(schedule);
  const sessionsItems: SessionDisplayed[] = scheduleParsed.items.map(
    (x: ScheduleItemType) => {
      return {
        session: x.session,
        period: x.period,
        room: x.room,
      };
    }
  );

  const sessions = sessionsItems.filter(
    ({ session, period }: SessionDisplayed) => {
      if (
        session.type === "Talk" &&
        session.speakers.some((sp) => sp.id === id)
      ) {
        return true;
      }
    }
  );

  const avatarFallaback = speaker.full_name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const renderSpeakerSessions = (sessionData: SessionDisplayed[]) => {
    return sessionData.map(({ session, period, room }) => {
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
                    <BadgeTag key={tag.id} name={tag.name} id={""}  />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        );
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-start p-24">
      <div className="text-2xl">Speakers</div>
      <div className="flex items-center justify-start space-x-5 pt-8">
        {/* <Avatar
        >
          <AvatarImage
            src={speaker.avatar_url}
            alt={`Image of ${speaker.full_name}`}
            // className="size-48"
          />
          <AvatarFallback>{avatarFallaback}</AvatarFallback>
        </Avatar> */}
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: "100px",
            height: "100px",
          }}
        >
          <Image
            src={speaker.avatar_url}
            alt={`Image of ${speaker.full_name}`}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col">
          <div>{speaker.full_name}</div>
          <div className="text-gray-600">{speaker.company}</div>
        </div>
      </div>
      <Separator className="my-4" />

      <div>{speaker.bio}</div>

      <div className="pt-20">
        <div className="text-xl">Sessions</div>
        <div><SpeakerSession sessions={sessions} /></div>
      </div>
    </main>
  );
}
