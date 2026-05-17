# Prompts — GRG

Registro de prompts utilizados en distintas sesiones con agentes de IA (Cursor, Claude Code, Copilot, etc.). Solo se guarda el mensaje del usuario, no las respuestas del asistente.

---

## Sesión 2026-05-17 — Guía `AGENTS.md`

```
Analiza exhaustivamente este repositorio y genera un fichero AGENTS.md en la raíz 
del proyecto que sirva como guía operativa para futuros agentes de IA (Claude Code, 
Cursor, Copilot, etc.) que desarrollarán código en él.

## Fase 1: Exploración del repositorio

Antes de escribir nada, explora el proyecto y recopila información de:

1. **Estructura**: árbol de directorios (2-3 niveles), propósito de cada carpeta clave.
2. **Stack técnico**: lenguajes, frameworks, runtimes y versiones exactas (lee 
   package.json, pyproject.toml, go.mod, pom.xml, Cargo.toml, requirements.txt, 
   .nvmrc, .python-version, Dockerfile, etc.).
3. **Gestores de dependencias y scripts**: npm/pnpm/yarn, pip/poetry/uv, etc. 
   Lista todos los scripts disponibles y para qué sirven.
4. **Configuración**: variables de entorno (.env.example), ficheros de config, 
   secretos esperados.
5. **Testing**: framework, ubicación de tests, comandos para ejecutarlos, 
   cobertura mínima si existe.
6. **Linting y formato**: ESLint, Prettier, Ruff, Black, gofmt, etc. Reglas 
   activas y comandos.
7. **CI/CD**: workflows en .github/, .gitlab-ci.yml, etc. Qué se ejecuta en 
   cada push/PR.
8. **Convenciones existentes**: lee CONTRIBUTING.md, README.md, CODEOWNERS, 
   commits recientes para inferir estilo (Conventional Commits, etc.).
9. **Arquitectura**: patrones detectados (capas, hexagonal, MVC, monorepo, 
   microservicios), puntos de entrada principales.
10. **Documentación existente**: README, docs/, ADRs.

## Fase 2: Estructura del AGENTS.md

Genera el fichero con estas secciones, en este orden:

### 1. Resumen del proyecto
Qué hace, para quién, en 3-5 líneas. Sin marketing.

### 2. Stack técnico
Tabla o lista con: lenguaje + versión, framework + versión, base de datos, 
servicios externos.

### 3. Estructura del repositorio
Árbol comentado explicando qué vive en cada carpeta clave.

### 4. Setup inicial
Pasos exactos y reproducibles para tener el proyecto corriendo en local. 
Comandos copy-paste, requisitos previos (Node X, Python Y, Docker, etc.).

### 5. Comandos esenciales
Tabla con: comando | qué hace | cuándo usarlo. Incluye al menos: instalar, 
arrancar dev, build, test, lint, format, type-check, migrar BD si aplica.

### 6. Convenciones de código
- Estilo (indentación, comillas, naming).
- Patrones a seguir y antipatrones a evitar.
- Estructura de imports.
- Manejo de errores.
- Logging.
- Tipado (si aplica).

### 7. Testing
Cómo escribir tests, dónde ubicarlos, qué se espera (unitarios, integración, 
e2e), comandos para ejecutar subsets, cómo añadir fixtures/mocks.

### 8. Flujo de trabajo Git
- Naming de ramas.
- Formato de commits (Conventional Commits u otro).
- Política de PRs (revisiones requeridas, checks que deben pasar).
- Ramas protegidas.

### 9. Arquitectura y decisiones clave
Diagrama textual o descripción de capas/módulos, flujo de datos, dependencias 
entre módulos, decisiones arquitectónicas notables (con enlace a ADRs si 
existen).

### 10. Variables de entorno y configuración
Lista de variables, qué hace cada una, valor por defecto, si es obligatoria, 
dónde se consume.

### 11. Reglas específicas para agentes IA
- Qué SÍ debe hacer un agente al modificar este código (ejecutar tests antes 
  de commitear, respetar tipos, etc.).
- Qué NO debe hacer (no tocar carpetas X, no instalar dependencias sin 
  aprobación, no modificar migraciones existentes, no commitear secretos, etc.).
- Comandos de verificación obligatorios antes de dar por terminada una tarea 
  (lint + typecheck + test).
- Ficheros sensibles o frágiles que requieren extra cuidado.

### 12. Gotchas y problemas conocidos
Cosas no obvias: bugs raros, workarounds en el código, partes legacy, 
dependencias con quirks, comandos que fallan en ciertos SO.

### 13. Recursos adicionales
Enlaces a documentación interna, dashboards, runbooks, canales de Slack 
relevantes (si los hay).

## Reglas para escribir el AGENTS.md

- Sé concreto. Cero relleno. Cada frase debe aportar información accionable.
- Prioriza comandos copy-paste sobre explicaciones largas.
- Si una sección no aplica al proyecto, omítela en vez de rellenarla.
- No inventes información: si algo no se puede determinar del repo, márcalo 
  como "POR DEFINIR" en lugar de adivinar.
- Usa Markdown estándar (encabezados, listas, tablas, bloques de código con 
  lenguaje).
- Longitud objetivo: lo que necesite el proyecto, ni más ni menos. 
  Proyectos pequeños 200-400 líneas; grandes 600-1000.
- Idioma: español.

## Entrega

1. Genera el fichero como `AGENTS.md` en la raíz del proyecto.
2. Después de generarlo, muéstrame un resumen de:
   - Qué secciones has incluido y cuáles has omitido (con justificación).
   - Qué información no has podido determinar y deberías confirmar conmigo.
   - 3-5 preguntas para refinar el documento si las hubiera.
```

---

## Sesión 2026-05-14 — PRD Interfaz Kanban de Posición

### Prompt 1 — Generación del PRD

```
Eres un Product Manager senior con amplia experiencia redactando documentos PRD 
(Product Requirements Document) claros, estructurados y orientados al negocio.

**Objetivo:** A partir de los requisitos que te proporcionaré (extraídos de un 
correo de cliente), redactarás un PRD completo en formato Markdown, bien 
estructurado, con la información esencial, justa y necesaria. No debes inventar, 
asumir ni añadir funcionalidades o requisitos que no estén explícitamente 
mencionados en el texto del cliente.

**Restricciones importantes:**
- Basa el PRD únicamente en lo que el cliente describe. Si algo no está claro, 
  márcalo como "Por confirmar" en lugar de inventarlo.
- No añadas secciones vacías ni relleno innecesario.
- El documento debe ser profesional, conciso y accionable.

**Estructura sugerida del PRD (adáptala solo si el contenido del cliente lo 
justifica):**
1. Resumen ejecutivo
2. Contexto y problema
3. Objetivos del producto
4. Usuarios objetivo
5. Requisitos funcionales
6. Requisitos no funcionales
7. Fuera de alcance
8. Preguntas abiertas / Por confirmar

**Proceso de trabajo:**
Antes de redactar el PRD completo, preséntame un boceto o esquema con las 
secciones que planeas incluir y un breve resumen de los puntos clave 
identificados en el texto del cliente. Espera mi confirmación antes de continuar.

**Texto del cliente:**
Es necesario crear la interfaz "position", una página en la que poder visualizar 
y gestionar los diferentes candidatos de una posición específica.

Se ha decidido que la interfaz sea tipo kanban, mostrando los candidatos como 
tarjetas en diferentes columnas que representan las fases del proceso de 
contratación, y pudiendo actualizar la fase en la que se encuentra un candidato 
solo arrastrando su tarjeta. Se adjunta ejemplo de interfaz posible.

Algunos de los requerimientos del equipo de diseño que se pueden ver en el 
ejemplo son:

Se debe mostrar el título de la posición en la parte superior, para dar contexto

Añadir una flecha a la izquierda del título que permita volver al listado de 
posiciones

Deben mostrarse tantas columnas como fases haya en el proceso

La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe 
mostrar su nombre completo y su puntuación media

Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical 
ocupando todo el ancho)

Algunas observaciones:

Asume que la página de posiciones la encuentras

Asume que existe la estructura global de la página, la cual incluye los 
elementos comunes como menú superior y footer. Lo que estás creando es el 
contenido interno de la página.

Para implementar la funcionalidad de la página cuentas con diversos endpoints 
API que ha preparado el equipo de backend:
GET /positions/:id/interviewFlow
GET /positions/:id/candidates
PUT /candidates/:id/stage

[Se incluyeron los JSON de ejemplo de cada endpoint]
```

### Prompt 2 — Ajuste: eliminar referencias al cliente + preguntas interactivas

```
Elimina las referencias al cliente en el PRD. Hazme las preguntas de la 
sección 9 una a una
```

### Respuestas a preguntas abiertas

```
P1 (Usuarios objetivo): Todos los anteriores
P2 (Comportamiento ante fallo en drag & drop): A (vuelve a columna original + mensaje de error)
P3 (Representación visual de puntuación): Puntos verdes
P4 (Ordenamiento de tarjetas en columna): A (por puntuación media, mayor a menor)
```

### Prompt 3 — Mover PRD e imagen a docs/

```
Cambia el fichero a docs/ así como la imagen
```

---

## Sesión 2026-05-15 — Implementación Kanban de Posición (TDD)

### Prompt 1 — Fase 1: exploración (SDD + PRD)

```
Eres un desarrollador Senior Frontend con amplia experiencia en arquitecturas 
escalables, pruebas automatizadas y desarrollo guiado por comportamiento.

## Objetivo

Implementar la funcionalidad descrita en el documento PRD adjunto, siguiendo un 
enfoque estricto de TDD (Test-Driven Development) y un flujo de trabajo SDD 
(Structured Development Drive) dividido en tres fases secuenciales.

## Flujo de trabajo obligatorio

Debes seguir estas tres fases en orden. NO avances a la siguiente fase sin recibir 
mi aprobación explícita ("ok", "continúa" o similar).

### Fase 1 — Exploración
### Fase 2 — Plan de implementación
### Fase 3 — Implementación

[Restricciones: no omitir fases, no asumir requisitos fuera del PRD, TDD estricto, 
stack del proyecto]

## Inicio

Comienza ahora con la Fase 1 analizando el PRD adjunto. @docs/PRD-PositionKanban.md
```

### Prompt 2 — Resolución de ambigüedades (Fase 1 → Fase 2)

```
Ambiguedades: (1) opción A (2) otra fuente (3) parte entera truncada (4) mantenemos 
lo que hay alineado al seed (5) @dnd-kit (6) solo frontend (7) si, siempre español
```

### Respuesta — Título de posición (RF1)

```
Ambos: state al navegar, fallback a mock por id (recomendado)
```

### Prompt 3 — Ejecutar plan (Fase 3)

```
Plan — Kanban de Posición (Fase 2)

Implement the plan as specified, it is attached for your reference. Do NOT edit 
the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark 
them as in_progress as you work, starting with the first one. Don't stop until you 
have completed all the to-dos.
```

### Prompt 4 — Reanudar implementación

```
Parece que antes estabas tardando mucho, sigue por donde ibas
```

```
Continua
```

### Prompt 5 — Error en pruebas manuales (304 / datos no cargan)

```
Estoy haciendo pruebas manuales. Para el caso de "Ver Proceso" para la posición 1, 
obtengo mensaje de error "No se pudieron cargar los datos del proceso." y si miro 
la consola, hay errores 304 en los endpoints de interviewflow y candidates, dos 
por cada uno, adjunto captura
```

### Prompt 6 — Peticiones mezcladas en red (canceladas, 204, pending)

```
Al hacer la prueba, veo peticiones canceladas, otras pendientes, otras con 200, 
otra con 204... adjunto captura
```

### Prompt 7 — Kanban con 200 pero sin pintar

```
El kanban no carga, veo las peticion con 200 y con contenido en la response, pero 
no se está pintando
```

### Prompt 8 — Carlos García sin puntuación

```
¿Por qué Carlos García no tiene puntuación?
```

### Prompt 9 — UI “Sin puntuación”

```
Ok opción recomendada
```

(Contexto: aceptación de mostrar el texto «Sin puntuación» en tarjetas con 
`averageScore` 0 en lugar de puntos verdes vacíos.)

### Prompt 10 — Commit y push

```
/git-commit-push
```

---

## Sesión 2026-05-17 — Mejoras visuales `/positions` y correcciones Kanban

### Prompt 1 — Análisis y propuesta UI (Fase 1)

```
Eres un experto en diseño de UI/UX y maquetación web con amplia experiencia en 
mejora visual de interfaces sin alterar funcionalidad.

## Objetivo
Revisar la interfaz visual de la pantalla disponible en `/positions/`, analizar 
su código fuente ubicado en la carpeta @frontend, y proponer mejoras 
estrictamente visuales que optimicen la experiencia del usuario.

## Restricciones críticas
- NO modificar ningún comportamiento, lógica ni funcionalidad de la aplicación.
- NO implementar ninguna mejora sin autorización explícita del usuario.
- SOLO implementar las mejoras que el usuario indique, en el momento exacto en 
  que lo indique.
- Cualquier cambio en el código debe limitarse únicamente a aspectos visuales: 
  estilos, colores, tipografía, espaciado, disposición visual, etc.

## Fase 1 — Análisis y propuesta
1. Accede a la pantalla en `URL_A_REVISAR` y examina su apariencia visual actual.
2. Revisa el código en la carpeta `frontend` para comprender la estructura y los 
   estilos aplicados.
3. Elabora un listado detallado de mejoras visuales propuestas, organizadas por 
   categoría (tipografía, color, espaciado, componentes, responsive, 
   accesibilidad visual, etc.).
4. Para cada mejora, describe: qué se propone cambiar, por qué mejoraría la UI, 
   y qué archivos se verían afectados.
5. Presenta las propuestas al usuario y espera su respuesta antes de proceder.

## Fase 2 — Implementación (solo bajo instrucción explícita)
- Implementa únicamente las mejoras que el usuario apruebe, una a una o en el 
  lote que indique.
- Tras cada implementación, confirma qué se modificó y en qué archivos.
- Espera nuevas instrucciones antes de continuar.

## Formato de las propuestas
Presenta cada mejora con la siguiente estructura:

**Mejora [N]: [Título breve]**
- Descripción: qué se propone
- Justificación: por qué mejora la UI
- Archivos afectados: lista de archivos
- Impacto funcional: ninguno
```

### Prompt 2 — Implementar mejoras prioridad alta

```
Aplica las mejoras visuales de prioridad alta. Sólo y exclusivamente estas
```

### Prompt 3 — Bug: resaltado de columna pisa el título (drag & drop)

```
Antes de seguir, he encontrado un error. Dentro de una posicion, al hacer drag & 
drop, el resaltado de la columna lo pisa el título adjunto evidencia
```

### Prompt 4 — Commit y push (prioridad alta + fix kanban)

```
/git-commit-push
```

### Prompt 5 — Implementar mejoras prioridad media

```
Implementa ahora las mejoras de prioridad media
```

### Prompt 6 — Bug: altura inconsistente de tarjetas Kanban

```
He encontrado una inconsistencia. Las cards deberían tener el mismo alto. Adjunto 
evidencia donde puedes ver que la card de Carlos Garcia es más alta que las demás.
```

### Prompt 7 — Commit y push (prioridad media + altura tarjetas)

```
/git-commit-push
```

### Prompt 8 — Implementar mejoras prioridad baja

```
Implementa ahora las mejoras de baja prioridad
```

### Prompt 9 — Commit y push (prioridad baja)

```
/git-commit-push
```

### Prompt 10 — Registrar prompts de la sesión

```
Añade a @docs/prompts-GRG.md los prompts utilizados en esta sesión. Sigue la 
estructura del fichero
```
