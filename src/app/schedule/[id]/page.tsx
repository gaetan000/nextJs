import { ScheduleItemApi } from '@/types/api-types';

async function getTalk(id: string) {
	const res = await fetch(
		`https://konfetti.monkeypatch.io/web/conferences/demo-konfetti-2023/sessions/${id}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function TalkId({ params }: { params: { id: string } }) {
	const { id } = params;
	const res: ScheduleItemApi = await getTalk('XyJihoZ2Hl97jSl9qRME');
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>{res.session.title}</div>
		</main>
	);
}
