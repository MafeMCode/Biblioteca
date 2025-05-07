<?php

return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'books' => 'Libros',
            'zones' => 'Zonas',
            'bookcases' => 'Estanterías',
            'loans' => 'Préstamos',
            'reservations' => 'Reservas',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
            'stats' => 'Estadísticas'
        ],
    ],
    'dashboard' => [
        'users' => 'Usuarios',
        'floors' => 'Pisos',
        'books' => 'Libros',
        'zones' => 'Zonas',
        'loans' => 'Préstamos',
        'stats' => 'Estadísticas',
        'bookcases' => 'Estanterías',
        'reservations' => 'Reservas',
        'description' => [
            'users' => 'Gestiona los usuarios del sistema',
            'floors' => 'Gestiona los pisos y secciones del sistema',
            'books' => 'Gestiona los libros del sistema',
        'stats' => 'Estadísticas de actividad',
            'zones' => 'Gestiona las zonas del sistema',
            'loans' => 'Gestiona los prestamos del sistema',
            'bookcases' => 'Gestiona las estanterías del sistema',
            'reservations' => 'Gestiona las reservas del sistema',
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
            'timeline' => [
                'title' => 'Historial de Actividad',
                'description' => "Aquí puedes ver todo tu historial de actividad",
                'description' => "Aquí puedes ver todo el historial de actividad de este usuario",
                'inProgress' => 'En préstamo',
                'returned' => 'Devuelto',
                'dueDate' => 'Fecha límite: ',
                'unknown' => 'Libro desconocido',
                'overdue' => '(Retrasado)',
                'isOverdue' => 'Llevas retraso en tu fecha de entrega.',
                'lend' => '~ Feliz lectura ~',
                'isReturned' => '¡Esperamos que lo hayas disfrutado!',
                'returnedOverdue' => 'Devuelto con retraso - Por favor, ten más cuidado la próxima vez.'
            ]
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
            'userEmail' => 'El campo :attribute debe ser una dirección de correo válida de un usuario activo en el sistema.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
            'pastDueDate' => 'La :attribute no puede ser una fecha pasada u hoy.',
            'sunday' => 'La :attribute no puede ser un domingo.',
            'positive' => 'El campo :attribute debe ser positivo y mayor de 0.',

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
            'results' => ':attribute resultados encontrados.',
            'trigger' => 'Filtros',
            'all' => 'Todos'

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
        'show' => 'Datos del Usuario',
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
            'publisher' => 'Editorial',
            'editor' => 'Editorial',
            'length' => 'Número de Páginas',
            'bookcase' => 'Estantería',
            'zone' => 'Zona',
            'floor' => 'Piso',
            'image' => 'Imagen',
            'selgenres' => 'Géneros Seleccionados'
        ],
        'utils' => [
            'available' => 'Disponible',
            'unavailable' => 'No disponible'
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
            'image' => 'Imagen',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'title' => 'Título',
            'author' => 'Autor',
            'genres' => 'Géneros',
            'publisher' => 'Editorial',
            'pages' => 'Páginas',
            'bookcase' => 'Estantería',
            'available' => 'Disponibilidad',
            'zone' => 'Zona',
            'floor' => 'Piso',
        ],
        'placeholders' => [
            'title' => 'Ingrese el Título',
            'author' => 'Ingrese el Autor',
            'ISBN' => 'Ingrese el ISBN',
            'genres' => 'Ingrese los Géneros',
            'publisher' => 'Ingrese la Editorial',
            'pages' => 'Ingrese el número de Páginas',
            'available' => 'Disponibilidad',
            'bookcase' => 'Ingrese la Estantería',
            'zone' => 'Ingrese la Zona',
            'floor' => 'Ingrese el Piso',
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
            'loan' => 'Prestar',
            'queue' => 'Reservar',
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
            'capacity' => 'Capacidad Máxima',
            'number' => 'Número',
            'zoneGenre' => "Género",
            'zone' => 'Zona',
            'floor' => 'Piso',
            'created_at' => 'Fecha de Creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'capacity' => 'Capacidad Máxima',
            'number' => 'Número',
            'genre' => "Género",
            'zone' => 'Zona',
            'floor' => 'Piso',
        ],
        'placeholders' => [
            'capacity' => 'Ingrese la capacidad máxima...',
            'number' => 'Ingrese el número indentificador...',
            'genre' => "Ingrese el género...",
            'zone' => 'Ingrese la zona...',
            'floor' => 'Ingrese el piso...',
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
            'capacity' => 'Máxima Capacidad',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'filters' => [
            'story' => 'Planta',
            'capacity' => 'Máxima Capacidad',
        ],
        'placeholders' => [
            'story' => 'Ingrese el número de planta',
            'capacity' => 'Ingrese el número máximo de zonas',
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
            'floors' => 'Piso',
            'number' => 'Número',
            'genres' => 'Género',
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
            'number' => 'Número',
            'capacity' => 'Capacidad Máxima',
            'genre' => 'Género',
            'floor' => 'Piso',
        ],
        'placeholders' => [
            'number' => 'Ingrese el número identificador...',
            'capacity' => 'Ingrese la capacidad máxima...',
            'genre' => 'Ingrese el género...',
            'floor' => 'Ingrese el piso...',
            'search' => 'Buscar libros...',
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear Nueva Zona',
                'description' => 'Ingresa la información para crear un nuevo piso en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Zona',
                'description' => 'Ingresa la nueva información para editar la zona'
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
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente la zona del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la zona',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las zonas. Por favor, inténtalo de nuevo.',
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
            'Thriller' => 'Suspense',
            'Romance' => 'Romance',
            'Adventure' => 'Aventura',
            'Dystopian' => 'Distópico',
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

    ],
    'loans' => [
        'title' => 'Préstamos',
        'create' => 'Crear Préstamo',
        'edit' => 'Editar Préstamo',
        'fields' => [
            'book' => 'UUID del libro',
            'user' => 'Email del usuario',
            'duedate' => 'Fecha de entrega límite'
        ],
        'columns' => [
            'book' => 'Título del libro',
            'email' => 'Email del usuario',
            'status' => 'Estado',
            'remaining' => 'Entrega',
            'duedate' => 'Fecha límite',
            'created_at' => 'Fecha de inicio',
            'actions' => 'Acciones',
        ],
        'utils' => [
            'remaining' => ' restante/s',
            'overdue' => ' de retraso',
            'returned' => 'Devuelto',
            'finished' => 'Finalizado',
            'inProgress' => 'En progreso',
            'pickDate' => 'Seleccione una fecha',
            'days' => 'días',
            'hours' => 'horas',
            'minutes' => 'minutos',
        ],
        'filters' => [
            'book' => 'Título del libro',
            'email' => 'Email del usuario',
            'status' => 'Estado',
            'remaining' => 'Entrega',
            'duedate' => 'Fecha límite',
            'created_at' => 'Fecha de inicio',
            'start_date' => 'Fecha de inicio',
            'due_date' => 'Fecha límite',

        ],
        'placeholders' => [
            'book' => 'Introduzca el UUID del libro',
            'user' => 'Introduzca el email del usuario',
            'booktitle' => 'Título del libro',
            'email' => 'Email del usuario',
            'status' => 'Estado',
            'start_date' => 'Fecha de inicio',
            'due_date' => 'Fecha límite',
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear Nuevo Préstamo',
                'description' => 'Ingresa la información para crear un nuevo préstamo en el sistema'
            ],
            'edit' => [
                'title' => 'Editar Préstamo',
                'description' => 'Ingresa la nueva información para editar el préstamo'
            ]
        ],
        'buttons' => [
            'new' => 'Nuevo Préstamo',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
            'return' => 'Devolver',
            'delayOneWeek' => 'Aplazar fecha una semana',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el préstamo del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el préstamo del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el préstamo',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los préstamos. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],

    'reservations' => [
        'title' => 'Reservas',
        'columns' => [
            'book_id' => "Título del Libro",
            'user_id' => "Email del Usuario",
            'puesto' => "Posición en cola",
            'created_at' => 'Fecha de Creación',
            'actions' => 'Borrar',
        ],
        'utils' => [
            'title' => 'Hacer una reserva',
            'description' => 'Introduzca el email del usuario que desea ser notificado cuando el libro esté disponible.',
            'book' => 'Libro',
            'email' => 'Email del usuario',
            'confirm' => 'Confirmar',
        ],
        'filters' => [
            'book' => "Titulo del libro",
            'email' => "Email del usuario",
            'status' => 'Status',
            'queue' => 'Posición en cola',
        ],
        'placeholders' => [
            'book' => "Introduce el titulo del libro",
            'user' => "Introduce el email del usuario",
            'queue' => 'Posición en cola',
        ],
        'buttons' => [
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
            'return' => 'Volver',
        ],
        'delete' => [
            'title' => 'Are you sure?',
            'description' => 'This action cannot be undone. The loan will be permanently deleted from the system.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el préstamo del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar la reserva',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar las reservas. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'stats' => [
        'reservations' => 'Reservas',
        'zone' => 'Zona',
        'floor' => 'Piso',
        'loans' => 'Préstamos',
        'topUsers' => 'Top Usuarios',
        'topBooks' => 'Top Libros',
        'topZones' => 'Top Zonas',
    ]
];
