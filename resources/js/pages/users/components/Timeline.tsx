import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { Book, CalendarIcon, CalendarX2, Clapperboard, ClipboardList, ClockAlertIcon, FileQuestion, Frown, Smile } from 'lucide-react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface ActivityHistoryItem {
    title: string | null;
    ISBN: string | null;
    isActive: boolean;
    returnedAt: string | null;
    dueDate: string | null;
    createdAt: Date | null;
    overdue: boolean;
    author: string | null;
    imgURL: string | null;
    type: string; // loan - reservation
}

interface TimelineProps {
    activityList: ActivityHistoryItem[];
}

export default function Timeline({ activityList }: TimelineProps) {
    const { t } = useTranslations();
    const [selectedFilter, setselectedFilter] = useState<string>('all');
    const loanCount = activityList.filter((item) => item.type === 'loan').length;
    const reservationCount = activityList.filter((item) => item.type === 'reservation').length;

    const [selectedStart, setSelectedStart] = useState<Date | undefined>(undefined);
    const [selectedEnd, setSelectedEnd] = useState<Date | undefined>(undefined);

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

function comprobanteFechaGrupal(array: ActivityHistoryItem[]): boolean {

    let res = false;

    array.map((element) => {
        if(((new Date(element.createdAt) >= new Date(selectedStart)) || selectedStart==undefined) && ((new Date(element.createdAt) <= new Date(selectedEnd)) || selectedEnd==undefined)){
            res = true;
        }
    })

    return res;
}
    const filterMap = {
        all: activityList.length,
        loans: loanCount,
        reservations: reservationCount,
    };

    const handleFilterChange = (filter: string) => {
        setselectedFilter(filter);
    };

    const handleClearStart = (pop: any) => {
        setSelectedStart(pop);
    };

    const handleClearEnd = (pop: any) => {
        setSelectedEnd(pop);
    };

    return (
        <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
            <div className="text-center">
                <HeadingSmall title={t('ui.settings.profile.timeline.title')} description={t('ui.settings.profile.timeline.description')} />
            </div>
            {activityList.length != 0 && (
                <div className='grid grid-cols-1 md:grid-cols-3  gap-6 justify-center'>
                    <div className="flex flex-col">
                        <Label className="p-2">{t('ui.settings.profile.timeline.filter_start')}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className="w-[240px] justify-start text-left font-normal">
                                    <CalendarIcon />
                                    {selectedStart ? format(selectedStart, 'PPP') : <span>{t('ui.loans.utils.pickDate')}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    disabled={[{ after: new Date() }]}
                                    timeZone="Europe/Madrid"
                                    selected={selectedStart}
                                    onSelect={(value) => {
                                        console.log(value)
                                        console.log(selectedStart)
                                        setSelectedStart(value)}}
                                />
                            </PopoverContent>
                        </Popover>
                        <Button onClick={(e) => handleClearStart(undefined)}>
                            <CalendarX2/>
                        </Button>
                    </div>
                                        <div className="flex flex-col">

                    <Label className="p-2">{t('ui.settings.profile.timeline.filter_type')}</Label>

                    <Select value={selectedFilter} onValueChange={(value) => handleFilterChange(value)}>
                        <SelectTrigger className="w-[240]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('ui.common.filters.all')}</SelectItem>
                            <SelectItem value="reservations">{t('ui.reservations.title')}</SelectItem>
                            <SelectItem value="loans">{t('ui.loans.title')}</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="flex flex-col">
                        <Label className="p-2">{t('ui.settings.profile.timeline.filter_end')}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} className="w-[240px] justify-start text-left font-normal">
                                    <CalendarIcon />
                                    {selectedEnd ? format(selectedEnd, 'PPP') : <span>{t('ui.loans.utils.pickDate')}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    disabled={[{ after: new Date() }]}
                                    timeZone="Europe/Madrid"
                                    selected={selectedEnd}
                                    onSelect={(value) => setSelectedEnd(value)}
                                />
                            </PopoverContent>
                        <Button onClick={(e) =>(handleClearEnd(undefined))}>
                            <CalendarX2/>
                        </Button>
                        </Popover>
                    </div>
                </div>
            )}
            {((activityList.length > 0 && filterMap[selectedFilter] !== 0) && comprobanteFechaGrupal(activityList)) ? (
                <div className="border-primary rounded-xl border-6 bg-neutral-700">
                    <div className="border-secondary rounded-xl border-3">
                        <VerticalTimeline layout={'1-column-left'} lineColor="var(--primary)">
                            {activityList.map((loan, index) =>
                                ((loan.type == 'loan' && (((new Date(loan.createdAt) >= new Date(selectedStart)) || selectedStart==undefined) && ((new Date(loan.createdAt) <= new Date(selectedEnd)) || selectedEnd==undefined))) && (selectedFilter == 'all' || selectedFilter == 'loans')) ? (
                                    <VerticalTimelineElement
                                        key={index + loan.type}
                                        contentStyle={{
                                            background: 'rgba(49, 49, 49, 0.8)',
                                            color:
                                                loan.overdue && loan.isActive
                                                    ? 'rgb(213, 185, 125)'
                                                    : loan.overdue && !loan.isActive
                                                      ? 'rgb(206, 138, 138)'
                                                      : !loan.overdue && !loan.isActive
                                                        ? 'rgb(132, 192, 131)'
                                                        : 'rgb(135, 193, 198)',
                                            borderTop:
                                                '7px solid ' +
                                                (loan.overdue && loan.isActive
                                                    ? 'rgb(210, 144, 0)'
                                                    : loan.overdue && !loan.isActive
                                                      ? 'rgb(210, 0, 0)'
                                                      : !loan.overdue && !loan.isActive
                                                        ? 'rgb(4, 210, 0)'
                                                        : 'rgb(0, 193, 210)'),
                                            borderTopLeftRadius: '0.5rem',
                                            borderTopRightRadius: '0.5rem',
                                        }}
                                        contentArrowStyle={
                                            loan.overdue && loan.isActive
                                                ? { borderRight: '7px solid  rgb(210, 144, 0)' }
                                                : loan.overdue && !loan.isActive
                                                  ? { borderRight: '7px solid  rgb(210, 0, 0)' }
                                                  : !loan.overdue && !loan.isActive
                                                    ? { borderRight: '7px solid  rgb(4, 210, 0)' }
                                                    : { borderRight: '7px solid  rgb(0, 193, 210)' }
                                        }
                                        date={
                                            loan.overdue && loan.isActive
                                                ? t('ui.loans.filters.due_date') +
                                                  ': ' +
                                                  loan.dueDate +
                                                  ' ' +
                                                  t('ui.settings.profile.timeline.overdue')
                                                : loan.overdue && !loan.isActive
                                                  ? t('ui.loans.utils.returned') +
                                                    ': ' +
                                                    loan.returnedAt +
                                                    ' ' +
                                                    t('ui.settings.profile.timeline.overdue')
                                                  : !loan.overdue && !loan.isActive
                                                    ? t('ui.loans.utils.returned') + ': ' + loan.returnedAt
                                                    : t('ui.loans.filters.due_date') + ': ' + loan.dueDate
                                        }
                                        iconStyle={
                                            loan.overdue && loan.isActive
                                                ? { background: 'rgb(210, 144, 0)', color: '#fff' }
                                                : loan.overdue && !loan.isActive
                                                  ? { background: '#d20000', color: '#fff' }
                                                  : !loan.overdue && !loan.isActive
                                                    ? { background: '#04d200', color: '#fff' }
                                                    : { background: 'rgb(0, 193, 210)', color: '#fff' }
                                        }
                                        icon={
                                            loan.overdue && loan.isActive ? (
                                                <ClockAlertIcon strokeWidth={3} />
                                            ) : loan.overdue && !loan.isActive ? (
                                                <Frown strokeWidth={3} />
                                            ) : !loan.overdue && !loan.isActive ? (
                                                <Smile strokeWidth={3} />
                                            ) : (
                                                <Book strokeWidth={3} />
                                            )
                                        }
                                    >
                                        <div className="flex w-full items-center justify-between">
                                            <div className="w-4/5">
                                                <h3 className="mb-2 text-3xl font-semibold">{loan.title}</h3>
                                                <h4 className="mb-4 text-xl text-gray-300">{loan.author}</h4>
                                                <p className="text-2xl font-medium text-gray-500">ISBN: {loan.ISBN}</p>
                                            </div>
                                            <div className="flex h-full w-1/5 items-center justify-center">
                                                <img src={loan.imgURL} alt="Preview" />
                                            </div>
                                        </div>
                                    </VerticalTimelineElement>
                                ) : ((loan.type == 'reservation' && (selectedFilter == 'all' || selectedFilter == 'reservations')) && (((new Date(loan.createdAt) >= new Date(selectedStart)) || selectedStart==undefined) && ((new Date(loan.createdAt) <= new Date(selectedEnd)) || selectedEnd==undefined))) ? (
                                    <VerticalTimelineElement
                                        key={index + loan.type}
                                        contentStyle={{
                                            background: 'rgba(49, 49, 49, 0.8)',
                                            color: 'rgb(189, 150, 210)',
                                            borderTop: '7px solid #9600d2',
                                            borderTopLeftRadius: '0.5rem',
                                            borderTopRightRadius: '0.5rem',
                                        }}
                                        contentArrowStyle={{ borderRight: '7px solid  rgb(150, 0, 210)' }}
                                        date={`${t('ui.reservations.columns.created_at')}: ${formatDate(loan.createdAt)}`}
                                        iconStyle={{ background: 'rgb(150, 0, 210)', color: '#fff' }}
                                        icon={<ClipboardList strokeWidth={2} />}
                                    >
                                        <div className="flex w-full items-center justify-center">
                                            <div className="w-4/5">
                                                <h3 className="mb-2 text-3xl font-semibold">{loan.title}</h3>
                                                <h4 className="mb-4 text-xl text-gray-300">{loan.author}</h4>
                                                <p className="text-2xl font-medium text-gray-500">ISBN: {loan.ISBN}</p>
                                            </div>
                                            <div className="flex h-full w-1/5 items-center justify-center">
                                                <img src={loan.imgURL} alt="Preview" />
                                            </div>
                                        </div>
                                    </VerticalTimelineElement>
                                ) : (
                                    ''
                                ),
                            )}
                        </VerticalTimeline>
                    </div>
                </div>
            ) : (
                // <iframe
                //     width="420"
                //     height="240"
                //     src="https://www.youtube.com/embed/LLRmBWP2ob4"
                //     title='"THERE&#39;S NOTHING HERE"'
                //     frameborder="0"
                //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                //     referrerpolicy="strict-origin-when-cross-origin"
                //     allowfullscreen
                // ></iframe>
                <p>{t('messages.timeline.nothing')}</p>
            )}
        </div>
    );
}
