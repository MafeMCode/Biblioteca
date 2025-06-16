import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { cn } from '@/lib/utils';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Book, BookShelf } from './components';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nightOwlTheme } from './utils/BookshelfThemes';

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

const genreHexColors = {
        Fantasy: '#4338ca', // hover:bg-indigo-700
        Drama: '#7e22ce', // hover:bg-purple-700
        Historical: '#a16207', // hover:bg-yellow-800
        'Science Fiction': '#0e7490', // hover:bg-cyan-700
        Horror: '#7f1d1d', // hover:bg-red-900
        Mystery: '#334155', // hover:bg-slate-700
        Thriller: '#3f3f46', // hover:bg-zinc-800
        Romance: '#db2777', // hover:bg-pink-600
        Adventure: '#ea580c', // hover:bg-orange-600
        Dystopian: '#1f2937', // hover:bg-gray-800
        Gothic: '#171717', // hover:bg-neutral-900
        'Magical Realism': '#059669', // hover:bg-emerald-600
        Satire: '#65a30d', // hover:bg-lime-600
        Comedy: '#eab308', // hover:bg-yellow-500
        Tragedy: '#881337', // hover:bg-rose-900
        'Crime Fiction': '#7f1d1d', // hover:bg-red-800
        Mythology: '#b45309', // hover:bg-amber-700
        Western: '#78350f', // hover:bg-amber-900
        Cyberpunk: '#a21caf', // hover:bg-fuchsia-800
        Poetry: '#0284c7', // hover:bg-sky-600
    };


    return (
        <FloorLayout title={t('ui.floors.title')}>
            <div>
                <div className="flex items-center justify-center">
                    <div className="flex w-[70%] flex-col justify-center">
                        <div>
                            <Accordion type="single" className="border-2" collapsible>
                                {floors.toReversed().map((floor) => {
                                    const accordionLevel = 'item-' + String(floor.story);
                                    let visualizeFloor = false;
                                    floor.zones.map((zone) => {
                                        if (zone.bookcases_count > 0) {
                                            zone.bookcases.map((bookcase) => {
                                                if (bookcase.books_count > 0) {
                                                    visualizeFloor = true;
                                                }
                                            });
                                        }
                                    });
                                    return (
                                        <AccordionItem
                                            value={accordionLevel}
                                            key={floor.story}
                                            className="hover:bg-secondary border-4"
                                            disabled={!visualizeFloor}
                                        >
                                            <AccordionTrigger
                                                className={cn(
                                                    'justify-center text-xl',
                                                    visualizeFloor ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed',
                                                    'hover:no-underline',
                                                    !visualizeFloor && 'cursor-not-allowed',
                                                    visualizeFloor ? 'text-primary' : 'dark:text-secondary text-gray-300',
                                                )}
                                            >
                                                {t('ui.userUI.floor')} {floor.story}
                                            </AccordionTrigger>
                                            <AccordionContent className="flex justify-center">
                                                <div className="grid gap-x-15 md:grid-cols-2 lg:grid-cols-3">
                                                    {floor.zones.map((zone) => {
                                                        let visualizeZone = false;
                                                        zone.bookcases.map((bookcase) => {
                                                            if (bookcase.books_count > 0) {
                                                                visualizeZone = true;
                                                            }
                                                        });
                                                        if (visualizeZone) {
                                                            return (
                                                                <div key={zone.id}>
                                                                    <div className="flex h-[100px] w-[200px] justify-center p-4">
                                                                        <Dialog>
                                                                            <DialogTrigger asChild className="w-full">
                                                                                <Card
                                                                                    className={`btn text-primary hover:cursor-pointer ${genreColorMap[zone.genreName]} flex flex-col justify-center rounded-xl shadow-[0_9px_0_rgb(0,0,0)] transition-all ease-out active:translate-y-1 active:shadow-[0_4px_0px_rgb(0,0,0)]`}
                                                                                >
                                                                                    <DialogTitle className="text-center">
                                                                                        <div>
                                                                                            {t('ui.userUI.zone')} {zone.number}
                                                                                        </div>
                                                                                        {t(`ui.genres.names.${zone.genreName}`)}
                                                                                    </DialogTitle>
                                                                                </Card>
                                                                            </DialogTrigger>

                                                                            <DialogContent
                                                                                className="flex !h-[80vh] !w-[40vw] flex-col overflow-auto p-0"
                                                                                style={{ maxWidth: 'none', maxHeight: 'none' }}
                                                                            >
                                                                                {' '}
                                                                                <DialogDescription>
                                                                                    <h1 className='text-xl'>
                                                                                        {t('ui.userUI.zone')} {zone.number} -{' '}
                                                                                        {t(`ui.genres.names.${zone.genreName}`)}
                                                                                    </h1>
                                                                                    </DialogDescription>
                                                                                <div className="h-full w-full">
                                                                                    <ScrollArea>
                                                                                    <BookShelf key={zone.bookcases[0].id} >
                                                                                        {zone.bookcases[0].books.map((book) => {
                                                                                            const orientationDeterminator = Math.floor(
                                                                                                Math.random() * (10 - 1 + 1) + 1,
                                                                                            );
                                                                                            let orientation =
                                                                                                orientationDeterminator == 10 && book.length<400 ? 'tilted' : '';

                                                                                            const designDeterminator = Math.floor(
                                                                                                Math.random() * (5 - 1 + 1) + 1,
                                                                                            );
                                                                                            let design =
                                                                                                designDeterminator == 5
                                                                                                    ? 'split bands'
                                                                                                    : designDeterminator == 4
                                                                                                      ? 'dual top bands'
                                                                                                      : designDeterminator == 3
                                                                                                        ? 'colored spine'
                                                                                                        : '';

                                                                                            const bookgenres = book.genres.split(', ');
                                                                                            const colorDeterminator = Math.floor(
                                                                                                Math.random() * (bookgenres.length - 0) + 0,
                                                                                            );
                                                                                            let colorCode = bookgenres[colorDeterminator];

                                                                                            function handleBookClick(orientation: string) {
                                                                                                if (orientation == 'onDisplay') {
                                                                                                    orientation = '';
                                                                                                } else {
                                                                                                    orientation = 'onDisplay';
                                                                                                }
                                                                                            }
                                                                                            return (
                                                                                                <div
                                                                                                    className="cursor-pointer"
                                                                                                    onClick={(e) => handleBookClick(orientation)}
                                                                                                >
                                                                                                    <Book
                                                                                                        key={book.id}
                                                                                                        title={book.title}
                                                                                                        subtitle={book.author}
                                                                                                        orientation={orientation}
                                                                                                        design={design}
                                                                                                        color={genreHexColors[colorCode]}
                                                                                                        width={book.length}
                                                                                                    ></Book>
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </BookShelf>
                                                                                    </ScrollArea>
                                                                                </div>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </FloorLayout>
    );
}
