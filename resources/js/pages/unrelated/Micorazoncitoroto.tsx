import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { PageProps } from '@inertiajs/core';
import { Link, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface Zone {
    id: number;
    name: string;
    number: number;
    genre: string;
}

interface Floor {
    id: number;
    story: string;
    capacity: number;
    count: number;
    zones: Zone[];
}

interface IndexFloorProps extends PageProps {
    floors: Floor[];
    genres: string[];
    preSelecPiso?: number;
}



export default function FloorsIndex({ floors, genres }: IndexFloorProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    //Manejador de multiples pisos abiertos

    const [opcionAccordion, setopcionAccordion] = useState(true);



    return (
        <FloorLayout title={t('ui.floors.title')}>
            <div>
                <div className="align-center flex">
                    <div className="float-left flex items-center gap-2">
                        <h2>Permitir multiples pisos abiertos</h2>
                        <Checkbox className="border-blue-500" onClick={() => setopcionAccordion(!opcionAccordion)} />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex w-[70%] flex-col justify-center">
                        <div className="flex justify-center">
                                <Dialog>
                                    <DialogTrigger>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    {t('ui.floors.buttons.new')}</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Crear nuevo piso</DialogTitle>
                                            <DialogDescription>
                                                {/* <FloorForm/> */}
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                        </div>
                        <br />
                        <div>
                            <Accordion type={opcionAccordion ? 'single' : 'multiple'} collapsible>
                                {/* Añadir campo preselccionado de piso cuando se enlace desde fuera */}
                                {floors.toReversed().map((floor) => {
                                    const accordionLevel = 'item-' + String(floor.story);
                                    return (
                                        <AccordionItem value={accordionLevel} key={floor.story}>
                                            <AccordionTrigger className="justify-center">
                                                Planta número {floor.story} - Zonas Usadas ({floor.count}/{floor.capacity})
                                            </AccordionTrigger>
                                            <AccordionContent className="flex justify-center">
                                                <div className="grid grid-cols-3">
                                                    {floor.zones.map((zone) => {
                                                        return (
                                                            <div>
                                                                <Card>
                                                                    <div className="flex justify-center">
                                                                        <Dialog>
                                                                            <DialogTrigger>
                                                                                Zona {zone.number} - {zone.genre}
                                                                            </DialogTrigger>
                                                                            <DialogContent>
                                                                                {/* <ZoneDialog number={zone.number} /> */}
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                    </div>
                                                                </Card>
                                                            </div>
                                                        );
                                                    })}
                                                    {floor.count < floor.capacity && (
                                                        <div className="flex justify-center">
                                                            <Dialog>
                                                                <DialogTrigger>
                                                                    <PlusIcon className="mr-2 h-4 w-4" />
                                                                    {t('ui.zones.buttons.new')}
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>{t('ui.zones.create.title')}</DialogTitle>
                                                                        <DialogDescription>{t('ui.zones.create.desc')}</DialogDescription>
                                                                    </DialogHeader>
                                                                    <form>
                                                                        <input type="text" />
                                                                    </form>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    )}
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
