export type Match = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: 'Match replay';
};

export const MATCHES: readonly Match[] = [
  {
    id: 'x7CC2FaSTFY',
    title: 'Paploha vs Kansala',
    description: 'Return to the ground with this match from the Ismailpur Live24 archive.',
    videoUrl: 'https://www.youtube.com/watch?v=x7CC2FaSTFY',
    category: 'Match replay',
  },
];

export const LINKS = {
  live: 'https://www.youtube.com/channel/UCyrSPBlUxkNQk3K9JiZIc6g/live',
  channel: 'https://www.youtube.com/@Ismailpurlive24',
  videos: 'https://www.youtube.com/@Ismailpurlive24/videos',
  email: 'mailto:bhullardesi49@gmail.com',
  telecast: 'tel:+917973155513',
  phone: 'tel:+17059889016',
} as const;

export const CONTACTS = [
  { label: 'Live telecast bookings', value: '+91 79731 55513', url: LINKS.telecast },
  { label: 'Partnerships & support', value: 'bhullardesi49@gmail.com', url: LINKS.email },
  { label: 'Call us', value: '+1 705-988-9016', url: LINKS.phone },
] as const;

const availableIds = new Set(MATCHES.map(match => match.id));

/** Accept only unique identifiers belonging to the current verified library. */
export function normalizeSavedMatchIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((id): id is string => typeof id === 'string' && availableIds.has(id)))];
}
