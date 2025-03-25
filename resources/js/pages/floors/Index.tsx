import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PageProps } from '@inertiajs/core';
import { ChevronDown } from 'lucide-react';

interface IndexFloorProps extends PageProps {
    floors: string[];
    genres: string[];
}

export default function FloorsIndex({ floors, genres }: IndexFloorProps) {
    return (
        <section>
            <h1>Buenas tardes</h1>
            <div>

                {floors.map((floor) => {
                    return (
                        <Card>
                    <Collapsible>
                        <CollapsibleTrigger className="align-self-center align-items-center flex">
                            Planta X <ChevronDown />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-blue">
                            <Card>Aqui van las zonas</Card>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
                    )
                })}
            </div>
            <div></div>
        </section>
    );
}
