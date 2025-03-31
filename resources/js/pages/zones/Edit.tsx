import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { LandPlot, Layers } from 'lucide-react';

interface ZoneFormProps {
    zone?: {
        id: string;
        number: number;
        capacity: number;
        genre: string;
        floor_id: string;
    },
    floors: { id: string; story: number }[];
    genres: { id: string; name: string }[];
}

export default function CreateZone({zone, floors, genres}:ZoneFormProps) {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.zones.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <LandPlot color="#2762c2" />
                                {t('ui.zones.cards.edit.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.cards.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ZoneForm  initialData={zone} floors={floors} genres={genres}/>
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}
