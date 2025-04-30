<?php

return [
    'navigation' => [
        'menu' => 'Navigation Menu',
        'items' => [
            'dashboard' => 'Dashboard',
            'users' => 'Users',
            'floors' => 'Floors',
            'books' => 'Books',
            'zones' => 'Zones',
            'bookcases' => 'Bookcases',
            'loans' => 'Loans',
            'reservations' => 'Reservations',
            'repository' => 'Repository',
            'documentation' => 'Documentation',
        ],
    ],
    'dashboard' => [
        'users' => 'Users',
        'floors' => 'Floors',
        'books' => 'Books',
        'zones' => 'Zones',
        'loans' => 'Loans',
        'bookcases' => 'Bookcases',
        'reservations' => 'Reservations',
        'description' => [
            'users' => 'Manage all users in the system',
            'floors' => 'Manage all floors and sections in the system',
            'books' => 'Manage all books in the system',
            'zones' => 'Manage all zones in the system',
            'loans' => 'Manage all loans in the system',
            'bookcases' => 'Manage all bookcases in the system',
            'reservations' => 'Manage all reservations in the system',
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
            'timeline' => [
                'title' => 'Activity History',
                'description' => "Here's a timeline with all your activity",
                'description2' => "Here's a timeline with all of this user's activity",
                'inProgress' => 'Currently lend',
                'returned' => 'Returned',
                'unknown' => 'Unknown book',
                'dueDate' => 'Due date: ',
                'overdue' => '(Overdue)',
                'isOverdue' => 'You are overdue your return date.',
                'lend' => '~ Happy reading ~',
                'isReturned' => 'We hope you enjoyed it!',
                'returnedOverdue' => 'Returned overdue - Be more careful next time please.'
            ]
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
            'userEmail' => 'The :attribute field must be a valid email of an active user in the system.',
            'min' => [
                'string' => 'The :attribute field must be at least :min characters.',
            ],
            'max' => [
                'string' => 'The :attribute field must not be greater than :max characters.',
            ],
            'unique' => 'The :attribute has already been taken.',
            'confirmed' => 'The :attribute confirmation does not match.',
            'pastDueDate' => 'The :attribute cannot be a past date or today.',
            'sunday' => 'The :attribute cannot be a Sunday.',
            'positive' => 'The :attribute must be positive and greater than 0.',
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
            'results' => ':attribute results found.',
            'trigger' => 'Filters',
            'all' => 'All'
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
        'show' => 'User Details',
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
            'genres' => 'Genres',
            'publisher' => 'Publisher',
            'editor' => 'Publisher',
            'length' => 'Pages',
            'bookcase' => 'Bookcase',
            'zone' => 'Zone',
            'floor' => 'Floor',
            'image' => 'Image',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
            'selgenres' => 'Selected Genres'
        ],
        'utils' => [
            'available' => 'Available',
            'unavailable' => 'Unavailable'
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
            'image' => 'Image',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'title' => 'Title',
            'author' => 'Author',
            'genres' => 'Genres',
            'publisher' => 'Publisher',
            'pages' => 'Pages',
            'bookcase' => 'Bookcase',
            'available' => 'Availability',
            'zone' => 'Zone',
            'floor' => 'Floor',
        ],
        'placeholders' => [
            'title' => 'Enter the Title...',
            'author' => 'Enter the Author...',
            'ISBN' => 'Enter the ISBN...',
            'genres' => 'Enter the Genre/s...',
            'publisher' => 'Enter the Publisher...',
            'available' => 'Availability',
            'pages' => 'Enter number of pages...',
            'bookcase' => 'Enter the Bookcase...',
            'zone' => 'Enter the Zone...',
            'floor' => 'Enter the Floor...',
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
            'loan' => 'Lend',
            'queue' => 'Make a reservation',

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
            'number' => 'Number',
            'floors' => 'Floor',
            'floor' => 'Floor',
            'zones' => 'Zone',
            'zone' => 'Zone',
            'capacity' => 'Max Capacity',
        ],
        'columns' => [
            'capacity' => 'Max Capacity',
            'number' => 'Number',
            'zoneGenre' => "Genre",
            'zone' => 'Zone',
            'floor' => 'Floor',
            'created_at' => 'Creation at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'capacity' => 'Capacity',
            'number' => 'Number',
            'genre' => "Genre",
            'zone' => 'Zone',
            'floor' => 'Floor',
        ],
        'placeholders' => [
            'capacity' => 'Enter max capacity...',
            'number' => 'Enter identifying number...',
            'genre' => "Enter genre...",
            'zone' => 'Enter zone number...',
            'floor' => 'Enter floor...',
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
            'capacity' => 'Max Capacity',
            'created_at' => 'Created at',
            'actions' => 'Actions',
        ],
        'filters' => [
            'story' => 'Story',
            'capacity' => 'Max Capacity',
        ],
        'placeholders' => [
            'story' => 'Enter the story number',
            'capacity' => 'Enter zone capacity',
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
            'floors' => 'Floor',
            'number' => 'Number',
            'genres' => 'Genre',
            'capacity' => 'Capacity',
            'password_optional' => 'Contraseña (opcional)',
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
        'filters' => [
            'search' => 'Buscar',
            'number' => "Number",
            'capacity' => "Max Capacity",
            'genre' => "Genre",
            'floor' => "Floor",
        ],
        'placeholders' => [
            'number' => 'Enter the identifying number for the zone',
            'floor' => 'Enter the floor...',
            'capacity' => 'Enter max capacity...',
            'genre' => 'Enter the genre...',
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
        ],
'loans' => [
            'title' => 'Loans',
            'create' => 'Create Loan',
            'edit' => 'Edit Loan',
            'fields' => [
                'book' => "Book's UUID",
                'user' => "User's Email",
                'duedate' => 'Due Date'
            ],
            'columns' => [
                'book' => "Book's Title",
                'email' => "User's Email",
                'status' => 'Status',
                'remaining' => 'Remaining',
                'duedate' => 'Due Date',
                'created_at' => 'Starting Date',
                'actions' => 'Actions',
            ],
            'utils' => [
                'remaining' => ' remaining',
                'overdue' => ' overdue',
                'finished' => 'Finished',
                'inProgress' => 'In progress',
                'pickDate' => 'Pick a date',
                'returned' => 'Returned',
                'days' => 'days',
                'hours' => 'hours',
                'minutes' => 'minutes',
            ],
            'filters' => [
                'book' => "Book's Title",
                'email' => "User's Email",
                'status' => 'Status',
                'start_date' => 'Start date',
                'due_date' => 'Due date',
            ],
            'placeholders' => [
                'book' => "Enter the book's UUID",
                'user' => "Enter the user's email",
                'booktitle' => "Book's Title",
                'email' => "User's Email",
                'status' => 'Status',
                'start_date' => 'Start date',
                'due_date' => 'Due date',
            ],
            'cards' => [
                'create' => [
                    'title' => 'Create New Loan',
                    'description' => 'Enter the information to create a new loan in the system'
                ],
                'edit' => [
                    'title' => 'Edit Loan',
                    'description' => 'Enter the new information to edit this loan'
                    ]
            ],
            'buttons' => [
                'new' => 'New Loan',
                'edit' => 'Edit',
                'save' => 'Save',
                'update' => 'Update',
                'cancel' => 'Cancel',
                'delete' => 'Delete',
                'deleting' => 'Deleting...',
                'saving' => 'Saving...',
                'retry' => 'Retry',
                'return' => 'Return',
                'delayOneWeek' => 'Delay due date by one week',
            ],
            'delete' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
            ],
            'delete_dialog' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
                'success' => 'Successfully deleted ;)',
            ],
            'deleted_error' => 'Error deleting loan',
            'no_results' => 'No results.',
            'error_loading' => 'Error loading loans. Please try again.',
            'showing_results' => 'Showing :from to :to of :total results',
            'pagination' => [
                'previous' => 'Previous',
                'next' => 'Next',
            ],
        ],
'reservations' => [
            'title' => 'Reservations',
            'columns' => [
                'book_id' => "Book's Title",
                'user_id' => "User's Email",
                'puesto' => "Position in Queue",
                'created_at' => 'Created At',
                'actions' => 'Actions',
            ],
            'utils' => [
                'title' => 'Make a reservation',
                'description' => 'Input the email of the user that wants to be notified when the book becomes available.',
                'book' => 'Book',
                'email' => 'User Email',
                'confirm' => 'Confirm',
            ],
            'filters' => [
                'book' => "Book's Title",
                'email' => "User's Email",
                'status' => 'Status',
                'queue' => 'Place in queue',
            ],
            'placeholders' => [
                'book' => "Enter the book's Title",
                'user' => "Enter the user's email",
                'booktitle' => "Book's Title",
                'email' => "User's Email",
                'status' => 'Status',
                'queue' => 'Place in queue',
            ],
            'cards' => [
                'create' => [
                    'title' => 'Create New Loan',
                    'description' => 'Enter the information to create a new loan in the system'
                ],
                'edit' => [
                    'title' => 'Edit Loan',
                    'description' => 'Enter the new information to edit this loan'
                    ]
            ],
            'buttons' => [
                'new' => 'New Loan',
                'edit' => 'Edit',
                'save' => 'Save',
                'update' => 'Update',
                'cancel' => 'Cancel',
                'delete' => 'Delete',
                'deleting' => 'Deleting...',
                'saving' => 'Saving...',
                'retry' => 'Retry',
                'return' => 'Return',
                'delayOneWeek' => 'Delay due date by one week',
            ],
            'delete' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
            ],
            'delete_dialog' => [
                'title' => 'Are you sure?',
                'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
                'success' => 'Successfully deleted ;)',
            ],
            'deleted_error' => 'Error deleting loan',
            'no_results' => 'No results.',
            'error_loading' => 'Error loading loans. Please try again.',
            'showing_results' => 'Showing :from to :to of :total results',
            'pagination' => [
                'previous' => 'Previous',
                'next' => 'Next',
            ],
        ],
];
