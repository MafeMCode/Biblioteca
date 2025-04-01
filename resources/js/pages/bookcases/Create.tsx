import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookcaseLayout } from '@/layouts/bookcases/BookcaseLayout';
import { Book, ChartColumnStacked, LandPlot, Layers } from 'lucide-react';
import { BookcaseForm } from './components/BookcaseForm';

interface Zone {
    id: string;
    number: number;
    genreName: string;
    capacity: number;
    floor_id: string;
    bookcases_count: number;
}

interface BookcaseFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
        genre: string;
        zone_id: string;
        floor_id: string;
    },
    floors: { // Floors data passed as a prop
        id: string;
      story: number;
    }[];
    zones: Zone[];
}

export default function CreateBookcase({zones, floors}:BookcaseFormProps) {
    const { t } = useTranslations();

    return (
        <BookcaseLayout title={t('ui.bookcases.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <ChartColumnStacked color="#2762c2" />
                                {t('ui.bookcases.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.bookcases.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookcaseForm floors={floors} zones={zones}/>
                    </CardContent>
                </Card>
            </div>
        </BookcaseLayout>
    );
}
