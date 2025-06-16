import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import CardFlip from '@/components/ui/card-flip';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { cn } from '@/lib/utils';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import App from './App';

interface Book {
    id: string;
    title: string;
    genres: string;
    author: string;
    ISBN: string;
    length: number;
    imgURL: string;
    editor: string;
}

interface Bookcase {
    id: string;
    capacity: number;
    number: number;
    books_count: number;
    books: Book[];
}
interface Zone {
    id: string;
    name: string;
    number: number;
    capacity: number;
    bookcases_count: number;
    genreName: string;
    bookcases: Bookcase[];
}

interface Floor {
    id: string;
    story: string;
    capacity: number;
    zones_count: number;
    zones: Zone[];
}

interface IndexFloorProps extends PageProps {
    floors: Floor[];
}
export default function FloorsIndex({ floors }: IndexFloorProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    const genreColorMap: { [key: string]: string } = {
    Fantasy: 'bg-indigo-900 hover:bg-indigo-700',
    Drama: 'bg-purple-900 hover:bg-purple-700',
    Historical: 'bg-yellow-900 hover:bg-yellow-800',
    'Science Fiction': 'bg-cyan-900 hover:bg-cyan-700',
    Horror: 'bg-red-950 hover:bg-red-900',
    Mystery: 'bg-slate-900 hover:bg-slate-700',
    Thriller: 'bg-zinc-900 hover:bg-zinc-800',
    Romance: 'bg-pink-800 hover:bg-pink-600',
    Adventure: 'bg-orange-800 hover:bg-orange-600',
    Dystopian: 'bg-gray-900 hover:bg-gray-800',
    Gothic: 'bg-neutral-950 hover:bg-neutral-900',
    'Magical Realism': 'bg-emerald-800 hover:bg-emerald-600',
    Satire: 'bg-lime-800 hover:bg-lime-600',
    Comedy: 'bg-yellow-700 hover:bg-yellow-500',
    Tragedy: 'bg-rose-950 hover:bg-rose-900',
    'Crime Fiction': 'bg-red-900 hover:bg-red-800',
    Mythology: 'bg-amber-800 hover:bg-amber-700',
    Western: 'bg-amber-950 hover:bg-amber-900',
    Cyberpunk: 'bg-fuchsia-900 hover:bg-fuchsia-800',
    Poetry: 'bg-sky-800 hover:bg-sky-600',
};


    return (
        <FloorLayout title={t('ui.floors.title')}>
            <App/>
        </FloorLayout>
    );
}
