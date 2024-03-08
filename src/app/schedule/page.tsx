import {ScheduleApi, ScheduleItemApi} from "@/types/api.types"


async function getSchedule() : Promise<ScheduleApi>{
    const scheduleURL = "https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/schedule";
    const response = await fetch(scheduleURL);
    const data = await response.json();
  
    return data;
  }

function getClassName(item: ScheduleItemApi, dates: string[]) {

    if (!item) {
        return ""
    }

    const startIdx = dates.indexOf(item.period.start_date as string);
    const endIdx = dates.indexOf(item.period.end_date as string);

    // return "m-4 p-4 bg-slate-400 row-span-" + (endIdx - startIdx)
    return "m-4 p-4 bg-slate-400 row-span-" + (endIdx - startIdx)

}



export default async function BlogPage() {
    const schedule = await getSchedule();

    const datesList : string[] = [];
    schedule.items.forEach((item) => {
        datesList.push(item.period.start_date as string);
        datesList.push(item.period.end_date as string);
    });
    const uniqueDateList = datesList.filter((d, idx) => datesList.indexOf(d) === idx);
    const sortedDateList = uniqueDateList.sort();

    const nbRows = sortedDateList.length;
    return (
        <div>
            <div className={`grid grid-cols-3 grid-rows-${nbRows}`}>
                {sortedDateList.map((dt) => (
                    <>
                        <div className="">{(new Date(dt)).getTime()}</div>

                        <div className={getClassName(schedule.items.filter((item,i) => (item.period.start_date === dt))[0], sortedDateList)}>{schedule.items.filter((item,i) => (item.period.start_date === dt))[0]?.session.title}</div>
                        <div className={getClassName(schedule.items.filter((item,i) => (item.period.start_date === dt))[1], sortedDateList)}>{schedule.items.filter((item,i) => (item.period.start_date === dt))[1]?.session.title}</div>
                        
                    </>
                ))}
            </div>

            
            {/* {schedule.items.map((item) => (
                <div>{(new Date(item.period.start_date)).getHours()}</div>

            ))} */}
        </div>
    )
}