import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { Book, LandPlot, Layers } from 'lucide-react';
import { ZoneForm } from './components/ZoneForm';

interface ZoneFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
        genre: string;
        floor_id: string;
    },
    floors: { id: string; story: number, capacity: number, zones_count: number}[];
    genres: { id: string; name: string }[];
}

export default function CreateZone({floors, genres}:ZoneFormProps) {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.zones.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <LandPlot color="#2762c2" />
                                {t('ui.zones.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ZoneForm floors={floors} genres={genres}/>
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}
