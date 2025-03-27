import { useForm } from '@tanstack/react-form';

interface ZoneForm {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
}


export function ZoneForm() {
     // TanStack Form setup
     const form = useForm({
        defaultValues: {
            // name: initialData?.name ?? '',
            // email: initialData?.email ?? '',
            // password: '',
        },
        onSubmit: async ({ value }) => {

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Usuario creado con éxito.');

                    // // queryClient.invalidateQueries({ queryKey: ['users'] });

                    // // Construct URL with page parameters
                    // let url = '/users';
                    // if (page) {
                    //     url += `?page=${page}`;
                    //     if (perPage) {
                    //         url += `&per_page=${perPage}`;
                    //     }
                    // }

                    // router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    // if (Object.keys(errors).length === 0) {
                    //     toast.error(initialData ? t('messages.users.error.update') : t('messages.users.error.create'));
                    // }
                },
            };

            // Submit with Inertia
            // if (initialData) {
            //     router.put(`/users/${initialData.id}`, userData, options);
            // } else {
            //     router.post('/users', userData, options);
            // }
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input type="text" id='text1'/>
            <select name="testselect" id="test1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
    )
}
