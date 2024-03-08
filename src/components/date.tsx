import { parseISO, format } from 'date-fns';

export default function Date({
	dateString,
	formatting,
}: {
	dateString: string;
	formatting: string;
}) {
	const date = parseISO(dateString);
	return <time dateTime={dateString}>{format(date, formatting)}</time>;
}
