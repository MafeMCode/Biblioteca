import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { StatsLayout } from '@/layouts/StatsLayout';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import MixedBar from './stats/components/MixedBar';
import { es } from 'date-fns/locale';

interface dataProps {
    userdata: {
        name: string;
        total: number;
        Loans: number;
        ISBN: string;
        Reservations: number;
        zonename?: number;
        floor?: number;
    }[];
    bookdata: {
        name: string;
        total: number;
        Loans: number;
        ISBN: string;
        Reservations: number;
        zonename?: number;
        floor?: number;
    }[];
    zonedata: {
        name: string;
        total: number;
        Loans: number;
        ISBN: string;
        Reservations: number;
        zonename?: number;
        floor?: number;
    }[];
}

export default function Stats({ userdata, bookdata, zonedata }: dataProps) {
    const { t } = useTranslations();
    const [selectedStat, setSelectedStat] = useState('top-users');
    const [selectedStart, setSelectedStart] = useState<Date | undefined>(undefined);
    const [selectedEnd, setSelectedEnd] = useState<Date | undefined>(undefined);


  let inputLabels = [
    { key: "Loans", color: "#378235" },
    { key: "Reservations", color: "#9600d2" },
  ];

    return (
        <StatsLayout title={t('ui.dashboard.stats')}>
            <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className="w-[240px] justify-start text-left font-normal">
                            <CalendarIcon />
                            {selectedStart ? format(selectedStart, 'PPP') : <span>{t('ui.loans.utils.pickDate')}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            disabled={[{ after: new Date() }, new Date()]}
                            timeZone="Europe/Madrid"
                            locale={es}
                            selected={selectedStart}
                            onSelect={(value) => setSelectedStart(value)}
                        />
                    </PopoverContent>
                </Popover> */}
                <div className='m-3'>
                <Select defaultValue="top-users" onValueChange={(value) => setSelectedStat(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stats" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="top-users">{t('ui.stats.topUsers')}</SelectItem>
                        <SelectItem value="top-books">{t('ui.stats.topBooks')}</SelectItem>
                        <SelectItem value="top-zones">{t('ui.stats.topZones')}</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                {/* <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className="w-[240px] justify-start text-left font-normal">
                            <CalendarIcon />
                            {selectedEnd ? format(selectedEnd, 'PPP') : <span>{t('ui.loans.utils.pickDate')}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            disabled={[{after: new Date() }, new Date()]}
                            timeZone="Europe/Madrid"
                            selected={selectedEnd}
                            onSelect={(value) => setSelectedEnd(value)}
                        />
                    </PopoverContent>
                </Popover> */}
            </div>

            <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
                <ResponsiveContainer className={`${selectedStat === 'top-users' ? 'block' : 'hidden'}`}>
                    <MixedBar  data={userdata['total']} totaldata={userdata['total']} loandata={userdata['loans']} reservationdata={userdata['reservations']} labels={inputLabels}/>
                </ResponsiveContainer>
                <ResponsiveContainer className={`${selectedStat === 'top-books' ? 'block' : 'hidden'}`}>
                    <MixedBar  data={bookdata['total']} totaldata={bookdata['total']} loandata={bookdata['loans']} reservationdata={bookdata['reservations']} labels={inputLabels} />
                </ResponsiveContainer>
                <ResponsiveContainer className={`${selectedStat === 'top-zones' ? 'block' : 'hidden'}`}>
                    <MixedBar data={zonedata['total']} totaldata={zonedata['total']} loandata={zonedata['loans']} reservationdata={zonedata['reservations']} labels={inputLabels} />
                </ResponsiveContainer>
            </div>
        </StatsLayout>
    );
}
