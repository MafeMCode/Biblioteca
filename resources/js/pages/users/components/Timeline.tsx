import HeadingSmall from '@/components/heading-small';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { Book, CircleSlash2, ClipboardList, ClockAlertIcon, FileQuestion, Frown, Smile } from 'lucide-react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface ActivityHistoryItem {
    title: string | null;
    ISBN: string | null;
    isActive: boolean;
    returnedAt: string | null;
    dueDate: string | null;
    createdAt: string | null;
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
    const loanCount = activityList.filter(item => item.type === 'loan').length;
    const reservationCount = activityList.filter(item => item.type === 'reservation').length;


    const filterMap = {
        'all' : activityList.length,
        'loans' : loanCount,
        'reservations' : reservationCount,
    };
    const handleFilterChange = (filter: string) => {
        setselectedFilter(filter);
    };


    return (
        <div className="mx-auto flex w-4/5 flex-col items-center space-y-6">
            <div className="text-center">
                <HeadingSmall title={t('ui.settings.profile.timeline.title')} description={t('ui.settings.profile.timeline.description')} />
            </div>
            {activityList.length != 0  && (<Select value={selectedFilter} onValueChange={(value) => handleFilterChange(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">{t('ui.common.filters.all')}</SelectItem>
                    <SelectItem value="reservations">{t('ui.reservations.title')}</SelectItem>
                    <SelectItem value="loans">{t('ui.loans.title')}</SelectItem>
                </SelectContent>
            </Select>)}
            {(activityList.length > 0 && filterMap[selectedFilter] !== 0) ? (
            <div className="border-primary rounded-xl border-6 bg-neutral-700">
                    <div className="border-secondary rounded-xl border-3">

                        <VerticalTimeline layout={'1-column-left'} lineColor="var(--primary)">
                            {activityList.map((loan, index) =>
                                (loan.type == 'loan' && (selectedFilter=='all' || selectedFilter=='loans')) ? (
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
                                ) : (loan.type == 'reservation' && (selectedFilter=='all' || selectedFilter=='reservations')) ? (
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
                                        date={`${t('ui.reservations.columns.created_at')}: ${loan.createdAt}`}
                                        iconStyle={{ background: 'rgb(150, 0, 210)', color: '#fff' }}
                                        icon={<ClipboardList strokeWidth={2} />}
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
                                ) : '',
                            )}
                        </VerticalTimeline>
                        </div>
                        </div>
            ) :                     <iframe width="420" height="240" src="https://www.youtube.com/embed/LLRmBWP2ob4" title="&quot;THERE&#39;S NOTHING HERE&quot;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
}
            </div>
    );
}
