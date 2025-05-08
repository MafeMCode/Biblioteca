import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from '@/hooks/use-translations';
import { ScrollAreaScrollbar, ScrollAreaThumb } from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';
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
    totaldata: {
        name: string;
        total: number;
        Loans: number;
        Reservations: number;
        zonename?: number;
        ISBN?: string;
        floor?: number;
    }[];
    loandata: {
        name: string;
        total: number;
        Loans: number;
        Reservations: number;
        zonename?: number;
        ISBN?: string;
        floor?: number;
    }[];
    reservationdata: {
        name: string;
        total: number;
        Loans: number;
        Reservations: number;
        zonename?: number;
        ISBN?: string;
        floor?: number;
    }[];
    labels: any[];
}

// @TODO
// Axis Y actualizado en vivo en funcion del dato

const MixedBar: React.FC<MixedBarProps> = (props) => {
    const { t } = useTranslations();
    const { data, labels, totaldata, loandata, reservationdata } = props;
    const [selectedData, setSelectedData] = useState(totaldata);

    function evenDataMax(dataMax: number) {
        if (dataMax % 2 !== 0) {
            dataMax = dataMax + 1;
        }
        return dataMax;
    }

    const [YMaxRange, setYMaxRange] = useState(evenDataMax(totaldata[0].total));

    // Customized Legend

    const [barProps, setBarProps] = useState(
        labels.reduce(
            (a, { key }) => {
                a[key] = false;
                return a;
            },
            { hover: null },
        ),
    );

    const handleLegendMouseEnter = (e) => {
        if (!barProps[e.dataKey]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = (e) => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBar = (e) => {
        const toggledKey = e.dataKey;
        const toggledValue = !barProps[toggledKey];

        const newBarProps = {
            ...barProps,
            [toggledKey]: toggledValue,
            hover: null,
        };

        setBarProps(newBarProps);

        if (!newBarProps['Loans'] && !newBarProps['Reservations']) {
            setSelectedData(totaldata);
            setYMaxRange(evenDataMax(totaldata[0].total));
        } else if ((!toggledValue && toggledKey === 'Reservations') || (toggledValue && toggledKey === 'Loans')) {
            setSelectedData(reservationdata);
            setYMaxRange(evenDataMax(reservationdata[0].total));

        } else if ((!toggledValue && toggledKey === 'Loans') || (toggledValue && toggledKey === 'Reservations')) {
            setSelectedData(loandata);
            setYMaxRange(evenDataMax(loandata[0].total));

        }
    };

    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip flex flex-col items-center rounded-md border border-black bg-white p-2 text-black">
                    <p className="desc text-bold text-xl underline decoration-double decoration-2">{`Top ${selectedData[label - 1]?.index}`}</p>
                    {selectedData[label - 1]?.name && <p className="desc">{selectedData[label - 1]?.name}</p>}
                    {selectedData[label - 1].ISBN && <p className="label">{`ISBN : ${selectedData[label - 1].ISBN}`}</p>}

                    {selectedData[label - 1]?.zonename && (
                        <p className="desc">{`${t('ui.stats.zone')} ${selectedData[label - 1]?.zonename} - ${t('ui.stats.floor')} ${selectedData[label - 1]?.floor}`}</p>
                    )}
                    {!barProps['Loans'] && !barProps['Reservations'] && <p className="desc">{`Total: ${selectedData[label - 1]?.total}`}</p>}
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                    {payload[1] && <p className="label">{`${payload[1].name} : ${payload[1].value}`}</p>}
                </div>
            );
        }

        return null;
    };

    return (
        <ScrollArea className="max-sm:h-sm rounded-md border p-4 max-sm:w-sm">
            <BarChart width={1000} height={500} data={selectedData}>
                <XAxis dataKey="index" tickFormatter={(index: number) => 'Top ' + index} />
                <YAxis domain={[0, YMaxRange]} allowDecimals={false}/>
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 300 }} />

                <Legend onClick={selectBar} onMouseOver={handleLegendMouseEnter} onMouseOut={handleLegendMouseLeave} />
                {labels.map((label, index) => (
                    <Bar
                        key={index}
                        dataKey={label.key}
                        name={t(`ui.stats.${label.key}`)}
                        fill={label.color}
                        stackId="a"
                        hide={barProps[label.key] === true}
                        fillOpacity={Number(barProps.hover === label.key || !barProps.hover ? 1 : 0.6)}
                    />
                ))}
            </BarChart>
            <ScrollAreaScrollbar orientation="horizontal">
                <ScrollAreaThumb />
            </ScrollAreaScrollbar>
        </ScrollArea>
    );
};

export default MixedBar;
