# ab_plugin_ab_mvc

AppBuilder plugin: **DefinitionBundle** validation + persistence (one `process` row + N child rows in `appbuilder_definition`).

## HTTP (platform)

- `POST /definition/bundle/create` — body: `{ "bundle": { "process": {...}, "children": [...] } }`
- Auth: same as `POST /definition/create` (Builder).
- Handler: [developer/definition_manager/handlers/bundle-create.js](../../definition_manager/handlers/bundle-create.js)
- See [lib/DEFINITION_SCHEMA.md](lib/DEFINITION_SCHEMA.md)

## Build

```bash
npm install
npm run build:update   # dist/ABAbMvc_service.js
```

## Node API (from `service/serviceRegister.js`)

- `parseBundle(raw)` — Zod parse
- `validateBundle(bundle)` — Zod + cross-row / BPMN checks
- `persistBundle(req, AB, bundle)` — `AB.definitionCreate` with rollback on failure

Secrets: processed in the `definition_manager` handler before `validateBundle` (uses `processSecrets` like `definition-create`).
