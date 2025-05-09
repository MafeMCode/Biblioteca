import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Hash, LandPlot, Layers, Lock, Save, User, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';

// interface Zone {
//     id: string;
//     number: number;
//     genreName: string;
//     floor_id: string;
//     bookcase_count: number;
// }

interface BookcaseFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
        zone_id: string;
    };
    floors: {
        id: string;
        story: number;
    }[];
    zones: {
        id: string;
        number: number;
        genreName: string;
        capacity: number;
        floor_id: string;
        bookcases_count: number;
    }[];
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function BookcaseForm({ initialData, page, perPage, floors, zones }: BookcaseFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    let prePisoId = undefined;

    if (initialData?.zone_id) {
        prePisoId = zones.filter(zone => zone.id === initialData.zone_id)[0].floor_id;
    }

    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(prePisoId);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(initialData?.zone_id);


    function comprobantePiso() {
        if (selectedFloor != undefined) {
            return false;
        } else {
            return true;
        }
    }


    const handleFloorChange = (floorId: string) => {
        setSelectedFloor(floorId);
    };

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            // floor_id: initialData.floor_id ?? '',
            zone_id: initialData?.zone_id ?? '',
            number: initialData?.number ?? '',
            capacity: initialData?.capacity ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['bookcases'] });

                    // Construct URL with page parameters
                    let url = '/bookcases';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.bookcases.error.update') : t('messages.bookcases.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/bookcases/${initialData.id}`, value, options);
            } else {
                router.post('/bookcases', value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Number field */}
                <div>
                    <form.Field name="number" validators={{}}>
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Hash color="grey" size={18} />
                                        {t('ui.bookcases.fields.number')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.bookcases.placeholders.number')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Capacity field */}
                <div>
                    <form.Field
                        name="capacity"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.bookcases.fields.capacity').toLowerCase() }) : null;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Box color="grey" size={18} />
                                        {t('ui.bookcases.fields.capacity')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.bookcases.placeholders.capacity')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
<div>
                {/* Floor Select */}

                <Label>
                    <div className="mb-1 flex items-center gap-1">
                        <Layers color="grey" size={18} />
                        {t('ui.bookcases.fields.floors')}
                    </div>
                </Label>
                <Select required={true} value={selectedFloor} onValueChange={(value) => handleFloorChange(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('ui.bookcases.placeholders.floor')} />
                    </SelectTrigger>
                    <SelectContent>
                        {floors.map((floor) => (
                            <SelectItem key={floor.id} value={floor.id}>
                                {t('ui.bookcases.fields.floor')} {floor.story}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
</div>
                {/* Zone field */}
                <div>
                    <form.Field
                        name="zone_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.bookcases.fields.zone').toLowerCase() }) : null;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <LandPlot color="grey" size={18} />
                                        {t('ui.bookcases.fields.zones')}
                                    </div>
                                </Label>
                                <Select disabled={comprobantePiso()} required={true} value={selectedZone} onValueChange={(value) => field.handleChange(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t('ui.bookcases.placeholders.zone')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {zones.filter(zone => zone.floor_id === selectedFloor).map((zone) => (
                                                <SelectItem key={zone.id} value={zone.id} disabled={zone.bookcases_count >= zone.capacity}>
                                                    {`${t(`ui.bookcases.fields.zone`)} ${zone.number} - ${t(`ui.genres.names.${zone.genreName}`)}`}{zone.bookcases_count >= zone.capacity ? <Lock/> : ""}
                                                    {/* DIABLO */}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                </div>


                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/bookcases';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <X />
                        {t('ui.bookcases.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.bookcases.buttons.saving')
                                    : initialData
                                      ? t('ui.bookcases.buttons.update')
                                      : t('ui.bookcases.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
