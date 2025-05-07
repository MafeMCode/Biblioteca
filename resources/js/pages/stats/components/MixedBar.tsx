import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from '@/hooks/use-translations';
import { ScrollAreaScrollbar, ScrollAreaThumb } from '@radix-ui/react-scroll-area';
import React from 'react';
import { Bar, BarChart, Legend, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface MixedBarProps {
    data: {
        name: string;
        total: number;
        Loans: number;
        Reservations: number;
        zonename?: number;
        ISBN?: string;
        floor?: number;
    }[];
}

const MixedBar: React.FC<MixedBarProps> = (props) => {
    const { t } = useTranslations();
    const { data } = props;

    // Add index starting from 1 for use in XAxis
    const numberedData = data.map((item, index) => ({
        ...item,
        index: index + 1,
    }));
    function evenDataMax(dataMax: number) {
        if (dataMax % 2 !== 0) {
            dataMax = dataMax + 1;
        }
        return dataMax;
    }

    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip flex flex-col items-center rounded-md border border-black bg-white p-2 text-black">
                    <p className="desc text-bold text-xl underline decoration-double decoration-2">{`Top ${numberedData[label - 1]?.index}`}</p>
                    {numberedData[label - 1]?.name && <p className="desc">{numberedData[label - 1]?.name}</p>}
                    {numberedData[label-1].ISBN && (<p className="label">{`ISBN : ${numberedData[label-1].ISBN}`}</p>)}

                    {numberedData[label - 1]?.zonename && (
                        <p className="desc">{`${t('ui.stats.zone')} ${numberedData[label - 1]?.zonename} - ${t('ui.stats.floor')} ${numberedData[label - 1]?.floor}`}</p>
                    )}
                    <p className="desc">{`Total: ${numberedData[label - 1]?.total}`}</p>
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                    {payload[1] && (<p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>)}
                </div>
            );
        }

        return null;
    };

    return (
        <ScrollArea className="max-sm:h-sm rounded-md border p-4 max-sm:w-sm">
            <BarChart width={1000} height={500} data={numberedData}>
                <XAxis dataKey="index" tickFormatter={(index: number) => 'Top ' + index} />
                <YAxis domain={[0, evenDataMax(data[0].total)]} />
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 300 }} />
                <Legend />
                <Bar dataKey="Loans" stackId="a" fill="#378235" name={t('ui.stats.loans')} barSize={50} />
                <Bar dataKey="Reservations" stackId="a" fill="#9600d2" name={t('ui.stats.reservations')} barSize={50} />
            </BarChart>
            <ScrollAreaScrollbar orientation="horizontal">
                <ScrollAreaThumb />
            </ScrollAreaScrollbar>
        </ScrollArea>
    );
};

export default MixedBar;
