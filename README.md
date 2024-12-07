** # Food Organiser - Fullstack project **

El frontend de Food Organiser es una aplicación basada en React que permite a los usuarios gestionar un menú semanal, crear listas de compras y actualizar menús desde una interfaz intuitiva y organizada. Se conecta con una API para gestionar los datos de manera dinámica.

### Repositorio de backend asociado a este repositorio:
-> https://github.com/dem116/fullstack-project

### Tecnologías y librerías Utilizadas
React: Framework para construir la interfaz de usuario.
React Router Dom: Para gestionar las rutas y navegación entre páginas.
Vite: Herramienta de construcción que optimiza el desarrollo y compilación.
dotenv: Para gestionar variables de entorno.

## Estructura de archivos
```
/public
  └── img
      └── background.png
/src
  ├── App.jsx
  ├── Home.jsx
  ├── List.jsx
  ├── MenuCreate.jsx
  ├── main.jsx
  ├── App.css
  └── index.css
/index.html
/package.json
/vite.config.js
```

--------
1-/public: Carpeta estática con activos, como imágenes.
2-/src: Contiene los componentes de React, hojas de estilo y la lógica principal de la aplicación.
3-index.html: Punto de entrada de la aplicación.
4-package.json: Contiene las dependencias y scripts del proyecto.

## Componentes principales
```
-App.jsx
Gestión principal de rutas con react-router-dom.
Incluye las rutas: / (Home), /items (Lista de Compras) y /menu/create (Crear o editar menú).

-Home.jsx
Página principal que muestra el menú semanal.
Usa useEffect y useState para obtener datos del menú desde la API.
Botones para navegar a las demás funcionalidades.

-List.jsx
Página para gestionar la lista de compras.
Funciones principales:
Añadir: Envía datos a la API mediante un POST.
Eliminar: Elimina elementos mediante un DELETE.
Marcar elementos: Permite cruzar ítems con interacción directa.

-MenuCreate.jsx
Página para editar o crear un menú semanal.
Funcionalidades:
Cargar menú actual desde la API.
Modificar entradas y guardar cambios mediante un POST.
Reiniciar menú a valores predeterminados con un PUT.

-main.jsx
Punto de entrada de la aplicación React.
Renderiza el componente principal App.jsx.
```

## Instalación y configuración

1-Instalación de Node.js y npm:
Descargar e instalar Node.js

2-Clonar repositorio (bash):
git clone <URL del repositorio>
cd nombre-del-proyecto

3-Instalar dependencias:
npm install

4-Configurar variables de entorno:
Crear un archivo .env en la raíz con las siguientes variables:
```
VITE_APP_API_URL=<URL de la API>
VITE_APP_API_URL_LIST=<URL para la lista>
VITE_APP_API_URL_LISTCREATE=<URL para crear ítems>
VITE_APP_API_URL_LISTDELETE=<URL para eliminar ítems>
VITE_APP_API_URL_CREATEMENU=<URL para crear menú>
```

5-Iniciar el sevidor:
npm run dev


## Proximas imprementaciones
```
-Componetización y refactorizaciones
-Componentes y paginas para el login (firebase)
-Vista para la edicion de items y otros datos
```