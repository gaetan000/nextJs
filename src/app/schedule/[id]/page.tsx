import { ScheduleItemApi, ScheduleTalkApi } from '@/types/api-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Date from '@/components/date';

async function getSchedulItem(id: string) {
	const res = await fetch(
		`https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/sessions/${id}`
	);

	if (!res.ok) {
		throw new Error('Session not found');
	}

	return res.json();
}

export default async function S({ params }: { params: { id: string } }) {
	const { id } = params;
	const res: ScheduleItemApi = await getSchedulItem('XyJihoZ2Hl97jSl9qRME'); // TODO replace with id

	const avatarFallaback = (res.session as ScheduleTalkApi).speakers[0].full_name
		.split(' ')
		.map((name) => name[0])
		.join('');
	return (
		<main className="flex min-h-screen flex-col justify-between p-24">
			<h2 className="text-lg">{res.session.title}</h2>
			<div className="flex">
				<Date
					dateString={String(res.period.start_date)}
					formatting="LLLL d, h'h'mm"
				/>{' '}
				- <Date dateString={String(res.period.end_date)} formatting="h'h'mm" />
			</div>
			<p>{res.room.name}</p>
			<p>{res.session.description}</p>
			<h4>Speakers</h4>
			<div className="flex items-center justify-start space-x-5 pt-8">
				{(res.session as ScheduleTalkApi).speakers.map((sp) => (
					<div key={sp.id} className="flex gap-3">
						<Avatar>
							<AvatarImage
								src={sp.avatar_url}
								alt={`Image of ${sp.full_name}`}
							/>
							<AvatarFallback>{avatarFallaback}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<div>{sp.full_name}</div>
							<div className="text-gray-600">{sp.company}</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
