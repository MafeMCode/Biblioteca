import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

interface AppearanceTabsProps extends HTMLAttributes<HTMLDivElement> {
    currentAppearance: Appearance;
}

export default function AppearanceToggleTab({ className = '', currentAppearance, ...props }: AppearanceTabsProps) {
    const { appearance, updateAppearance } = useAppearance(currentAppearance);
    const { t } = useTranslations();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: t('ui.settings.appearance.modes.light') },
        { value: 'dark', icon: Moon, label: t('ui.settings.appearance.modes.dark') },
        { value: 'system', icon: Monitor, label: t('ui.settings.appearance.modes.system') },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
