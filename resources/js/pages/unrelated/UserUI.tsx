import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Book {
    id: string;
    title: string;
    genres: string;
    author: string;
    ISBN: string;
    length: number;
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
                            <Accordion type='single' collapsible>
                                {floors.toReversed().map((floor) => {
                                    const accordionLevel = 'item-' + String(floor.story);
                                    let visualizeFloor = false;
                                    floor.zones.map((zone) => {
                                        if (zone.bookcases_count > 0) {
                                            zone.bookcases.map((bookcase) => {
                                                if (bookcase.books_count>0){
                                                    visualizeFloor = true;
                                                }
                                            })
                                        }
                                    });
                                    if (visualizeFloor)
                                        return (
                                            <AccordionItem value={accordionLevel} key={floor.story}>
                                                <AccordionTrigger className="justify-center">Planta número {floor.story}</AccordionTrigger>
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
                                                                        <Card>
                                                                            <div className="flex justify-center p-4 sm:h-[100px] sm:w-[200px]">
                                                                                <Dialog>
                                                                                    <DialogTrigger>
                                                                                        Zona {zone.number}
                                                                                        <DialogTitle>
                                                                                            {t(`ui.genres.names.${zone.genreName}`)}
                                                                                        </DialogTitle>
                                                                                    </DialogTrigger>
                                                                                    <DialogContent>
                                                                                        <DialogDescription />

                                                                                        <div>
                                                                                            <h1>
                                                                                                Zona {zone.number} - {zone.genreName}
                                                                                            </h1>
                                                                                            <Accordion type="multiple">
                                                                                                {zone.bookcases.map((bookcase) => {
                                                                                                    if (bookcase.books_count > 0) {
                                                                                                        return (
                                                                                                            <div key={bookcase.id}>
                                                                                                                <Card>
                                                                                                                    <div className="flex justify-center">
                                                                                                                        <Dialog>
                                                                                                                            <DialogTrigger>
                                                                                                                                <DialogTitle>
                                                                                                                                    Estantería{' '}
                                                                                                                                    {bookcase.number}{' '}
                                                                                                                                    - Libros:{' '}
                                                                                                                                    {
                                                                                                                                        bookcase.books_count
                                                                                                                                    }
                                                                                                                                </DialogTitle>
                                                                                                                            </DialogTrigger>
                                                                                                                            <DialogContent>
                                                                                                                                <DialogDescription />
                                                                                                                                <div>
                                                                                                                                    <h1>
                                                                                                                                        Estantería{' '}
                                                                                                                                        {
                                                                                                                                            bookcase.number
                                                                                                                                        }{' '}
                                                                                                                                        -{' '}
                                                                                                                                        {
                                                                                                                                            zone.genreName
                                                                                                                                        }
                                                                                                                                    </h1>
                                                                                                                                    <Accordion type="multiple">
                                                                                                                                        {bookcase.books.map(
                                                                                                                                            (
                                                                                                                                                book,
                                                                                                                                            ) => {
                                                                                                                                                let StringGenres = ''
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
                                                                                                                                                        StringGenres = aux;
                                                                                                                                                } else {
                                                                                                                                                    StringGenres = t(
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
                                                                                                                                                    >
                                                                                                                                                        <AccordionTrigger>
                                                                                                                                                            <p>
                                                                                                                                                                {
                                                                                                                                                                    book.title
                                                                                                                                                                }
                                                                                                                                                            </p>
                                                                                                                                                        </AccordionTrigger>
                                                                                                                                                        <AccordionContent>
                                                                                                                                                            <div className="grid grid-cols-2">
                                                                                                                                                                <div className="grid grid-cols-1">
                                                                                                                                                                    <p>
                                                                                                                                                                        Autor:{' '}
                                                                                                                                                                        {
                                                                                                                                                                            book.author
                                                                                                                                                                        }
                                                                                                                                                                    </p>
                                                                                                                                                                    <p>
                                                                                                                                                                        Lenght:{' '}
                                                                                                                                                                        {
                                                                                                                                                                            book.length
                                                                                                                                                                        }
                                                                                                                                                                    </p>
                                                                                                                                                                    <p>
                                                                                                                                                                        Genre/s:{' '}
                                                                                                                                                                        {
                                                                                                                                                                            StringGenres
                                                                                                                                                                        }
                                                                                                                                                                    </p>
                                                                                                                                                                    <p>
                                                                                                                                                                        Editorial:{' '}
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
                                                                                                                </Card>
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                })}
                                                                                            </Accordion>
                                                                                        </div>
                                                                                    </DialogContent>
                                                                                </Dialog>
                                                                            </div>
                                                                        </Card>
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
