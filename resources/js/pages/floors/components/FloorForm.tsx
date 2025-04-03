import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Layers2, Save, User, X } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface FloorFormProps {
    initialData?: {
        id: string;
        story: number;
        capacity: number;
    };
    storyList: number[];
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

export function FloorForm({ initialData, page, perPage, storyList }: FloorFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            story: initialData?.story ?? undefined,
            capacity: initialData?.capacity ?? undefined,
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['floors'] });

                    // Construct URL with page parameters
                    let url = '/floors';
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
                        toast.error(initialData ? t('messages.floors.error.update') : t('messages.floors.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/floors/${initialData.id}`, value, options);
            } else {
                router.post('/floors', value, options);
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
                {/* Story field */}
                <div>
                    <form.Field
                        name="story"
                        // validators={{
                        //     onChangeAsync: async ({ value }) => {
                        //         await new Promise((resolve) => setTimeout(resolve, 500));
                        //         return !value && value!=0 ? t('ui.validation.required', { attribute: t('ui.floors.fields.story').toLowerCase() }) :
                        //         storyList.includes(value) && value!=initialData?.story ? t('ui.validation.unique', { attribute: t('ui.floors.fields.story').toLowerCase() })
                        //         : undefined
                        //     },
                        // }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Layers2 color="grey" size={18} />
                                        {t('ui.floors.fields.story')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    step="1"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.floors.placeholders.story')}
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
                                return !value && value!=0 ? t('ui.validation.required', { attribute: t('ui.floors.fields.capacity').toLowerCase() }) :
                                value <= 0 ? t('ui.validation.positive', { attribute: t('ui.floors.fields.capacity').toLowerCase() }) : undefined
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">
                                        <Box color="grey" size={18} />
                                        {t('ui.floors.fields.capacity')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.floors.placeholders.capacity')}
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
                            let url = '/floors';
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
                        {t('ui.floors.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.floors.buttons.saving')
                                    : initialData
                                      ? t('ui.floors.buttons.update')
                                      : t('ui.floors.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
