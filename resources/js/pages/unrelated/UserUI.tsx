import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { cn } from '@/lib/utils';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';

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

    return (
        <FloorLayout title={t('ui.floors.title')}>
            <div>
                <div className="flex items-center justify-center">
                    <div className="flex w-[70%] flex-col justify-center">
                        <div>
                            <Accordion type="single" collapsible>
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
                                            className="hover:bg-secondary"
                                            disabled={!visualizeFloor}
                                        >
                                            <AccordionTrigger
                                                className={cn('justify-center text-xl hover:no-underline', !visualizeFloor && 'cursor-not-allowed')}
                                            >
                                                Planta número {floor.story}
                                            </AccordionTrigger>
                                            <AccordionContent className="flex justify-center">
                                                <div className="grid md:grid-cols-2 lg:grid-cols-3">
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

                                                                        <div className="flex justify-center p-4 sm:h-[100px] sm:w-[200px]">
                                                                            <Dialog>
                                                                                <DialogTrigger
                                                                                asChild
                                                                                className='w-full'>
                                                                                    <Card className="btn text-primary hover:bg-[#4e64a0] rounded-xl shadow-[0_9px_0_rgb(0,0,0)] transition-all ease-out hover:translate-y-1 hover:shadow-[0_4px_0px_rgb(0,0,0)]">

                                                                                    <DialogTitle className='text-center'>
                                                                                        <div>
                                                                                        Zona {zone.number}</div>
                                                                                        {t(`ui.genres.names.${zone.genreName}`)}
                                                                                    </DialogTitle>
                                                                                    </Card>
                                                                                </DialogTrigger>
                                                                                <DialogContent>
                                                                                    <DialogDescription />

                                                                                    <div>
                                                                                        <h1>
                                                                                            {t('ui.userUI.zone')} {zone.number} -{' '}
                                                                                            {t(`ui.genres.names.${zone.genreName}`)}
                                                                                        </h1>
                                                                                        <Accordion type="multiple">
                                                                                            {zone.bookcases.map((bookcase) => {
                                                                                                if (bookcase.books_count > 0) {
                                                                                                    return (
                                                                                                        <div key={bookcase.id}>
                                                                                                                <Dialog>
                                                                                                                    <DialogTrigger
                                                                                                                        asChild
                                                                                                                        className="w-full"
                                                                                                                    >
                                                                                                                        <Card className="btn text-primary hover:bg-secondary rounded shadow-[0_9px_0_rgb(0,0,0)] transition-all ease-out hover:translate-y-1 hover:shadow-[0_4px_0px_rgb(0,0,0)]">
                                                                                                                            <DialogTitle className="justify-center">
                                                                                                                                {t(
                                                                                                                                    'ui.userUI.bookcase',
                                                                                                                                )}{' '}
                                                                                                                                {bookcase.number} -{' '}
                                                                                                                                {t('ui.books.title')}:{' '}
                                                                                                                                {bookcase.books_count}
                                                                                                                            </DialogTitle>{' '}
                                                                                                                        </Card>
                                                                                                                    </DialogTrigger>
                                                                                                                    <DialogContent>
                                                                                                                        <DialogDescription />
                                                                                                                        <div>
                                                                                                                            <h1 className='text-center text-xl'>
                                                                                                                                {t('ui.userUI.bookcase')} {bookcase.number} -{' '}
                                                                                                                                {t(`ui.genres.names.${zone.genreName}`)}
                                                                                                                            </h1>
                                                                                                                            <br />
                                                                                                                            <Separator/>
                                                                                                                            <Accordion type="multiple" className='w-full'>
                                                                                                                                {bookcase.books.map(
                                                                                                                                    (book) => {
                                                                                                                                        let StringGenres =
                                                                                                                                            '';
                                                                                                                                        let aux;
                                                                                                                                        let res: string[] =
                                                                                                                                            [];
                                                                                                                                        if (
                                                                                                                                            book.genres.includes(
                                                                                                                                                ',',
                                                                                                                                            )
                                                                                                                                        ) {
                                                                                                                                            aux =
                                                                                                                                                book.genres.split(
                                                                                                                                                    ', ',
                                                                                                                                                );
                                                                                                                                            aux.map(
                                                                                                                                                (
                                                                                                                                                    genre,
                                                                                                                                                ) => {
                                                                                                                                                    genre =
                                                                                                                                                        t(
                                                                                                                                                            `ui.genres.names.${genre}`,
                                                                                                                                                        );
                                                                                                                                                    res.push(
                                                                                                                                                        genre,
                                                                                                                                                    );
                                                                                                                                                },
                                                                                                                                            );
                                                                                                                                            aux =
                                                                                                                                                res.join(
                                                                                                                                                    ', ',
                                                                                                                                                );
                                                                                                                                            StringGenres =
                                                                                                                                                aux;
                                                                                                                                        } else {
                                                                                                                                            StringGenres =
                                                                                                                                                t(
                                                                                                                                                    `ui.genres.names.${book.genres}`,
                                                                                                                                                );
                                                                                                                                        }
                                                                                                                                        return (
                                                                                                                                            <AccordionItem
                                                                                                                                                value={
                                                                                                                                                    book.id
                                                                                                                                                }
                                                                                                                                                key={
                                                                                                                                                    book.id
                                                                                                                                                }
                                                                                                                                                className='w-full'
                                                                                                                                            >
                                                                                                                                                <AccordionTrigger
                                                                                                                                                className='justify-center text-xl hover:no-underline'>
                                                                                                                                                    <p>
                                                                                                                                                        {
                                                                                                                                                            book.title
                                                                                                                                                        }
                                                                                                                                                    </p>
                                                                                                                                                </AccordionTrigger>
                                                                                                                                                <AccordionContent className='w-full'>
                                                                                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-full">
                                                                                                                                                        <div className="grid grid-cols-1 text-center w-full">
                                                                                                                                                            <p>
                                                                                                                                                                {t(
                                                                                                                                                                    'ui.books.fields.author',
                                                                                                                                                                )}

                                                                                                                                                                :{' '}
                                                                                                                                                                {
                                                                                                                                                                    book.author
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                            <p>
                                                                                                                                                                {t(
                                                                                                                                                                    'ui.books.fields.length',
                                                                                                                                                                )}

                                                                                                                                                                :{' '}
                                                                                                                                                                {
                                                                                                                                                                    book.length
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                            <p>
                                                                                                                                                                {t(
                                                                                                                                                                    'ui.books.fields.genres',
                                                                                                                                                                )}

                                                                                                                                                                :{' '}
                                                                                                                                                                {
                                                                                                                                                                    StringGenres
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                            <p>
                                                                                                                                                                {t(
                                                                                                                                                                    'ui.books.fields.editor',
                                                                                                                                                                )}

                                                                                                                                                                :{' '}
                                                                                                                                                                {
                                                                                                                                                                    book.editor
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                            <p>
                                                                                                                                                                ISBN:{' '}
                                                                                                                                                                {
                                                                                                                                                                    book.ISBN
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                        </div>
                                                                                                                                                        <br />
                                                                                                                                                        <div>
                                                                                                                                                            <img
                                                                                                                                                                src={
                                                                                                                                                                    book.imgURL
                                                                                                                                                                }
                                                                                                                                                                alt="Preview"
                                                                                                                                                            />
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </AccordionContent>
                                                                                                                                            </AccordionItem>
                                                                                                                                        );
                                                                                                                                    },
                                                                                                                                )}
                                                                                                                            </Accordion>
                                                                                                                        </div>
                                                                                                                    </DialogContent>
                                                                                                                </Dialog>
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            })}
                                                                                        </Accordion>
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
