import { useState } from "react";
import { Eye, EyeOff, User, Lock, Mail, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";

interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}

export function UserForm({ initialData, page, perPage }: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                // preserveState:true,
                onSuccess: () => {

                    console.log("Usuario creado con éxito.")

                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // Construct URL with page parameters
                    let url = "/users";
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
                        toast.error(
                            initialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post("/users", value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [showPassword, setShowPassword] = useState(false);

    const accesoPermisos = false;

    return (

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name field */}
            <div>
                <form.Field
                    name="name"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                                : value.length < 2
                                    ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Label htmlFor={field.name}>
                                <div className="flex items-center gap-1 mb-1">
                                    <User color="grey" size={18}/>
                                    {t("ui.users.fields.name")}
                                </div>
                            </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.name")}
                                disabled={form.state.isSubmitting}
                                required={false}
                                autoComplete="off"
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
            </div>

            {/* Email field */}
            <div>
                <form.Field
                    name="email"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.email").toLowerCase() })
                                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? t("ui.validation.email", { attribute: t("ui.users.fields.email").toLowerCase() })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                                    <Label htmlFor={field.name}>
                                        <div className="flex items-center gap-1 mb-1">
                                            <Mail color="grey" size={18}/>
                                            {t("ui.users.fields.email")}
                                        </div>
                                    </Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.email")}
                                disabled={form.state.isSubmitting}
                                required={false}
                                autoComplete="off"
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
            </div>

            {/* Password field */}
            <div>
                <form.Field
                    name="password"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            if (!initialData && (!value || value.length === 0)) {
                                return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                            }
                            if (value && value.length > 0 && value.length < 8) {
                                return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" });
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => {

                        return (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="flex items-center gap-1 mb-1">
                                        <Lock color="grey" size={18}/>
                                        {initialData
                                        ? t("ui.users.fields.password_optional")
                                        : t("ui.users.fields.password")}
                                    </div>
                                </Label>

                                {/* Input and Toggle Wrapper */}
                                <div className="relative w-full">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type={showPassword ? "text" : "password"}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t("ui.users.placeholders.password")}
                                        disabled={form.state.isSubmitting}
                                        autoComplete="off"
                                        required={false}
                                        className="pr-10"
                                    />

                                    {/* Visibility Toggle Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <p className="mt-1 text-xs text-muted-foreground">{t("ui.users.placeholders.passRulings")}</p>

                                <FieldInfo field={field} />
                            </>
                        );
                    }}
                </form.Field>
            </div>
            {/* Form buttons */}
            <div className="flex justify-center gap-100 mt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/users";
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
                    {t("ui.users.buttons.cancel")}
                </Button>


                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                    >
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t("ui.users.buttons.saving")
                                    : initialData
                                        ? t("ui.users.buttons.update")
                                        : t("ui.users.buttons.save")}
                            </Button>

                        )}
                    </form.Subscribe>


            </div>


        </form>

    );
}
