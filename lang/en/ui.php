<?php

return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'floors' => 'Floors',
            'books' => 'Books',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
        ],
    ],
    'dashboard' => [
        'users' => 'Users',
        'floors' => 'Floors',
        'books' => 'Books',
        'zones' => 'Zones',
        'bookcases' => 'Bookcases',
        'description' => [
            'users' => 'Manage all users in the system',
            'floors' => 'Manage all floors and sections in the system',
            'books' => 'Manage all books in the system',
            'zones' => 'Manage all zones in the system',
            'bookcases' => 'Manage all bookcases in the system',
        ]
    ],
    'user_menu' => [
        'settings' => 'Settings',
        'logout' => 'Log out',
    ],
    'auth' => [
        'failed' => 'These credentials do not match our records.',
        'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    ],
    'settings' => [
        'title' => 'Settings',
        'description' => 'Manage your profile and account settings',
        'navigation' => [
            'profile' => 'Profile',
            'password' => 'Password',
            'appearance' => 'Appearance',
            'languages' => 'Languages',
        ],
        'profile' => [
            'title' => 'Profile settings',
            'information_title' => 'Profile information',
            'information_description' => 'Update your name and email address',
            'name_label' => 'Name',
            'name_placeholder' => 'Full name',
            'email_label' => 'Email address',
            'email_placeholder' => 'Email address',
            'unverified_email' => 'Your email address is unverified.',
            'resend_verification' => 'Click here to resend the verification email.',
            'verification_sent' => 'A new verification link has been sent to your email address.',
            'save_button' => 'Save',
            'saved_message' => 'Saved',
        ],
        'password' => [
            'title' => 'Password settings',
            'update_title' => 'Update password',
            'update_description' => 'Ensure your account is using a long, random password to stay secure',
            'current_password_label' => 'Current password',
            'current_password_placeholder' => 'Current password',
            'new_password_label' => 'New password',
            'new_password_placeholder' => 'New password',
            'confirm_password_label' => 'Confirm password',
            'confirm_password_placeholder' => 'Confirm password',
            'save_button' => 'Save password',
            'saved_message' => 'Saved',
        ],
        'appearance' => [
            'title' => 'Appearance settings',
            'description' => 'Update your account\'s appearance settings',
            'modes' => [
                'light' => 'Light',
                'dark' => 'Dark',
                'system' => 'System'
            ]
        ],
        'languages' => [
            'title' => 'Language settings',
            'description' => 'Change your preferred language',
        ],
    ],
    'validation' => [
           'required' => 'The :attribute field is required.',
            'email' => 'The :attribute field must be a valid email address.',
            'min' => [
                'string' => 'The :attribute field must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'close' => 'Close',
        ],
        'filters'=> [
            'title' => 'Filters',
            'clear' => 'Clear',
        ],
        'delete_dialog' => [
            'success' => 'User deleted successfully',
        ],
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
            'first' => 'First',
            'last' => 'Last',
        ],
        'per_page' => 'Per page',
        'no_results' => 'No results',
    ],
    'users' => [
        'title' => 'Users',
        'create' => 'Create User',
        'edit' => 'Edit User',
        'fields' => [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'password_optional' => 'Password (optional)',
            'created_at' => 'Created at',
            'actions' => 'Actions',
            'rolPpal' => 'Main Role',
            'permisos' => 'Specific Permissions'
        ],
        'columns' => [
            'name' => 'Name',
            'email' => 'Email',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'View users',
                    'create' => 'Create users',
                    'edit' => 'Edit users',
                    'delete' => 'Delete users'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'View products',
                    'create' => 'Create products',
                    'edit' => 'Edit products',
                    'delete' => 'Delete products'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'View reports',
                    'export' => 'Export reports',
                    'print' => 'Print reports'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Access configuration',
                    'modify' => 'Modify configuration'
                ],

            ],
        ],
        'gridelements' => [
            'users' => 'Users',
            'products' => 'Products',
            'reports' => 'Reports',
            'configurations' => 'Configuration',

        ],
        'roles' => [
            'default' => 'Select a Role',
            'admin' => 'Administrator',
            'advanced' => 'Advanced User',
            'usuario' => 'Basic User'
        ],
        'filters' => [
            'search' => 'Search',
            'name' => 'User name',
            'email' => 'User email',
        ],
        'placeholders' => [
            'name' => 'Complete user name',
            'email' => 'email@example.com',
            'password' => 'Secure user password',
            'search' => 'Search users...',
            'passRulings' => 'The password must be at least 8 characters long, including nubers and letters'
        ],
        'tabs' => [
            'userForm' => 'Basic Information',
            'permissionsForm' => 'Roles and Permissions'
        ],
        'cards' => [
            'title' => 'Create New User',
            'description' => 'Input the information to create a new user in the system.'
        ],
        'buttons' => [
            'new' => 'New User',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The user will be permanently deleted from the system.',
            'success' => 'Successfully deleted ;)',
        ],
        'deleted_error' => 'Error deleting user',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading users. Please try again.',
        'showing_results' => 'Showing :from to :to of :total results',
        'pagination' => [
            'previous' => 'Previous',
            'next' => 'Next',
        ],
    ],
    'books' => [
        'title' => 'Books',
        'create' => 'Create Book',
        'edit' => 'Edit Book',
        'fields' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genre/s',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genres',
            'editor' => 'Publisher',
            'length' => 'Pages',
            'bookcase' => 'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => "Book's Title...",
            'author' => "Book's Author...",
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'genres' => 'Select the genre or genres...',
            'search' => 'Search books...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Create New Book',
                'description' => 'Enter the information to create a new book in the system'
            ],
            'edit' => [
                'title' => 'Edit Book',
                'description' => 'Enter the new information to edit this book'
            ]
        ],
        'buttons' => [
            'new' => 'New Book',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Deleted successfully ;)',
        ],
        'deleted_error' => 'Error trying to delete the book',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading books. Please, try again.',
        'showing_results' => 'showing :from to :to from :total results',
        'pagination' => [
            'previous' => 'Last',
            'next' => 'Next',
        ],
    ],
    'bookcases' => [
        'title' => 'Bookcases',
        'create' => 'Create Bookcase',
        'edit' => 'Edit Bookcase',
        'fields' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genre/s',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'capacity' => 'Capacity',
            'number' => 'Number',
            'zoneGenre' => "Genre",
            'zone' => 'Zone',
            'floor' => 'Floor',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => "Book's Title...",
            'author' => "Book's Author...",
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'genres' => 'Select the genre or genres...',
            'search' => 'Search books...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Create New Bookcase',
                'description' => 'Enter the information to create a new bookcase in the system'
            ],
            'edit' => [
                'title' => 'Edit Bookcae',
                'description' => 'Enter the new information to edit this bookcase'
            ]
        ],
        'buttons' => [
            'new' => 'New Bookcase',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Deleted successfully ;)',
        ],
        'deleted_error' => 'Error trying to delete the book',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading books. Please, try again.',
        'showing_results' => 'showing :from to :to from :total results',
        'pagination' => [
            'previous' => 'Last',
            'next' => 'Next',
        ],
    ],
    'floors' => [
        'title' => 'Floors',
        'create' => 'Create Floor',
        'edit' => 'Edit Floor',
        'fields' => [
            'story' => 'Story',
            'capacity' => 'Capacity',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'columns' => [
            'story' => 'Story',
            'capacity' => 'Capacity',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'search' => 'Search',
            'title' => 'Título del Libro',
            'author' => 'Autor del Libro',
        ],
        'placeholders' => [
            'story' => 'Enter the story number',
            'capacity' => 'Enter zone capacity',
            'genres' => 'Seleccione el/los generos...',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Create New Floor',
                'description' => 'Enter the information to create a new floor in the system'
            ],
            'edit' => [
                'title' => 'Edit Floor',
                'description' => 'Enter the new information to edit this floor'
            ]
        ],
        'buttons' => [
            'new' => 'New Floor',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Last',
            'next' => 'Next',
        ],
    ],
    'zones' => [
        'title' => 'Zones',
        'create' => 'Create Zone',
        'edit' => 'Edit Zone',
        'fields' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genre/s',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'capacity' => 'Capacity',
            'number' => 'Number',
            'genre' => "Genre",
            'zone' => 'Zone',
            'floor' => 'Floor',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => "Book's Title...",
            'author' => "Book's Author...",
        ],
        'placeholders' => [
            'title' => 'Title...',
            'author' => 'Author...',
            'genres' => 'Select the genre or genres...',
            'search' => 'Search books...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Create New Zone',
                'description' => 'Enter the information to create a new zone in the system'
            ],
            'edit' => [
                'title' => 'Edit Zone',
                'description' => 'Enter the new information to edit this zone'
            ]
        ],
        'buttons' => [
            'new' => 'New Zone',
            'edit' => 'Edit',
            'save' => 'Save',
            'update' => 'Update',
            'cancel' => 'Cancel',
            'delete' => 'Delete',
            'deleting' => 'Deleting...',
            'saving' => 'Saving...',
            'retry' => 'Retry',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => 'Are you sure?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Deleted successfully ;)',
        ],
        'deleted_error' => 'Error trying to delete the book',
        'no_results' => 'No results.',
        'error_loading' => 'Error loading books. Please, try again.',
        'showing_results' => 'showing :from to :to from :total results',
        'pagination' => [
            'previous' => 'Last',
            'next' => 'Next',
        ],
    ],
    'genres' => [
        'names' => [
            'Fantasy' => 'Fantasy',
            'Drama' => 'Drama',
            'Historical' => 'Historical',
            'Science Fiction' => 'Science Fiction',
            'Horror' => 'Horror',
            'Mystery' => 'Mystery',
            'Thriller' => 'Thriller',
            'Romance' => 'Romance',
            'Adventure' => 'Adventure',
            'Dystopian' => 'Dystopian',
            'Gothic' => 'Gothic',
            'Magical Realism' => 'Magical Realism',
            'Satire' => 'Satire',
            'Comedy' => 'Comedy',
            'Tragedy' => 'Tragedy',
            'Crime Fiction' => 'Crime Fiction',
            'Mythology' => 'Mythology',
            'Western' => 'Western',
            'Cyberpunk' => 'Cyberpunk',
            'Poetry' => 'Poetry',
        ]
    ]
];
