import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Layers, Save, User, X } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface ZoneFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
        genre: string;
        floor_id: string;
    };
    floors: { id: string; story: number }[];
    genres: { id: string; name: string }[];
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

export function ZoneForm({ initialData, page, perPage, floors, genres }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            floor_id: initialData?.floor_id ?? '',
            number: initialData?.number ?? '',
            genre: initialData?.genre ?? '',
            capacity: initialData?.capacity ?? '',
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['zones'] });

                    // Construct URL with page parameters
                    let url = '/zones';
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
                        toast.error(initialData ? t('messages.zones.error.update') : t('messages.zones.error.create'));
                    }
                },
            };

            console.log(value);

            // Submit with Inertia
            if (initialData) {
                router.put(`/zones/${initialData.id}`, value, options);
            } else {
                router.post('/zones', value, options);
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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                {/* Number field */}
                <div>
                    <form.Field
                        name="number"
                        validators={{
                        }}


                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <User color="grey" size={18} />
                                        {t('ui.zones.fields.number')}
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
                                    placeholder={t('ui.zones.placeholders.number')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                {/* Floor field */}
                <div>
                    <form.Field
                        name="floor_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor').toLowerCase() }) : null;
                            },
                        }}>
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Layers color="grey" size={18} />
                                        {t('ui.zones.fields.floors')}
                                    </div>
                                </Label>
                                <Select
                        required={true} value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={t('ui.zones.fields.floors')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {floors.map((floor) => (
                                            <SelectItem key={floor.id} value={String(floor.id)}>
                                                {floor.story}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Genre field */}
                <div>
                    <form.Field name="genre" validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor').toLowerCase() }) : null;
                            },
                        }}>
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Layers color="grey" size={18} />
                                        {t('ui.zones.fields.genres')}
                                    </div>
                                </Label>
                                <Select required={true} value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={t('ui.zones.fields.genres')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genres.map((genre) => (
                                            <SelectItem key={genre.id} value={String(genre.id)}>
                                                {genre.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                return !value ? t('ui.validation.required', { attribute: t('ui.zones.fields.capacity').toLowerCase() }) : null;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <User color="grey" size={18} />
                                        {t('ui.zones.fields.capacity')}
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
                                    placeholder={t('ui.zones.placeholders.capacity')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/zones';
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
                        {t('ui.zones.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.zones.buttons.saving')
                                    : initialData
                                      ? t('ui.zones.buttons.update')
                                      : t('ui.zones.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
