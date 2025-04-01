<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'books' => 'Libros',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'dashboard' => [
        'users' => 'Usuarios',
        'floors' => 'Pisos',
        'books' => 'Libros',
        'zones' => 'Zonas',
        'bookcases' => 'Estanterías',
        'description' => [
            'users' => 'Gestiona los usuarios del sistema',
            'floors' => 'Gestiona los pisos y secciones del sistema',
            'books' => 'Gestiona los libros del sistema',
            'zones' => 'Gestiona las zonas del sistema',
            'bookcases' => 'Gestiona las estanterías del sistema',
        ]
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo :attribute es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
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
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'books' => [
        'title' => 'Libros',
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'fields' => [
            'title' => 'Titulo',
            'author' => 'Autor',
            'genres' => 'Género/s',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'title' => 'Título',
            'author' => 'Autor',
            'genres' => 'Géneros',
            'editor' => 'Editorial',
            'length' => 'Páginas',
            'bookcase' => 'Estantería',
            'zone' => 'Zona',
            'floor' => 'Piso',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del Libro',
            'author' => 'Autor del Libro',
        ],
        'placeholders' => [
            'title' => 'Titulo...',
            'author' => 'Autor...',
            'genres' => 'Seleccione el/los generos...',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear Nuevo Libro',
                'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Libro',
                'description' => 'Ingresa la nueva información para editar el libro'
            ]
        ],
        'buttons' => [
            'new' => 'Nuevo Libro',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'bookcases' => [
        'title' => 'Estanterías',
        'create' => 'Crear Estantería',
        'edit' => 'Editar Estantería',
        'fields' => [
            'number' => 'Número',
            'floors' => 'Piso',
            'floor' => 'Piso',
            'zones' => 'Zona',
            'zone' => 'Zona',
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
                'title' => 'Crear Nuevo Piso',
                'description' => 'Ingresa la información para crear una nueva estantería en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Estantería',
                'description' => 'Ingresa la nueva información para editar la estantería'
            ]
        ],
        'buttons' => [
            'new' => 'Nueva Estantería',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la estantería del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la estantería del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la estantería',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las estanterías. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'floors' => [
        'title' => 'Pisos',
        'create' => 'Crear Piso',
        'edit' => 'Editar Piso',
        'fields' => [
            'story' => 'Planta',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'story' => 'Planta',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del Libro',
            'author' => 'Autor del Libro',
        ],
        'placeholders' => [
            'story' => 'Ingrese el número de planta',
            'capacity' => 'Ingrese el número máximo de zonas',
            'genres' => 'Seleccione el/los generos...',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear Nuevo Piso',
                'description' => 'Ingresa la información para crear un nuevo piso en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Piso',
                'description' => 'Ingresa la nueva información para editar el piso'
            ]
        ],
        'buttons' => [
            'new' => 'Nuevo Piso',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el piso del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el piso',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los pisos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear Zona',
        'edit' => 'Editar Zona',
        'fields' => [
            'story' => 'Planta',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'columns' => [
            'floor' => 'Piso',
            'capacity' => 'Capacidad',
            'number' => 'Número',
            'genre' => 'Género',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título de la Libro',
            'author' => 'Autor de la Libro',
        ],
        'placeholders' => [
            'story' => 'Ingrese el número de planta',
            'capacity' => 'Ingrese el número máximo de zonas',
            'genres' => 'Seleccione el/los generos...',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear Nueva Zona',
                'description' => 'Ingresa la información para crear un nuevo piso en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Zona',
                'description' => 'Ingresa la nueva información para editar la piso'
            ]
        ],
        'buttons' => [
            'new' => 'Nueva Zona',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la piso del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la piso del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la piso',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los pisos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'genres' => [
        'names' => [
            'Fantasy' => 'Fantasía',
            'Drama' => 'Drama',
            'Historical' => 'Histórico',
            'Science Fiction' => 'Ciencia Ficción',
            'Horror' => 'Terror',
            'Mystery' => 'Misterio',
            'Thriller' => 'Suspenso',
            'Romance' => 'Romance',
            'Adventure' => 'Aventura',
            'Dystopian' => 'Distopía',
            'Gothic' => 'Gótico',
            'Magical Realism' => 'Realismo Mágico',
            'Satire' => 'Sátira',
            'Comedy' => 'Comedia',
            'Tragedy' => 'Tragedia',
            'Crime Fiction' => 'Ficción Criminal',
            'Mythology' => 'Mitología',
            'Western' => 'Occidental',
            'Cyberpunk' => 'Cyberpunk',
            'Poetry' => 'Poesía',
        ]

    ]
];
