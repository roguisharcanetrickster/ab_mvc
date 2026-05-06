# `appbuilder_definition` rows for processes

Maps to MySQL table `appbuilder_definition` (database typically `appbuilder-admin`): columns `id`, `name`, `type`, `json` (longtext JSON string), `createdAt`, `updatedAt`.

## Process row (`type`: `process`)

The `json` column stores one JSON object (not double-encoded) with at least:

| Field | Description |
|-------|-------------|
| `id` | Same UUID as row `id` |
| `name` | Short name |
| `translations` | `[{ language_code, label }]` |
| `xmlDefinition` | BPMN 2.0 XML string (`bpmn2:definitions` root) |
| `elementIDs` | UUIDs for nested definition rows (one per modeled BPMN element / task) |
| `connections` | Map of sequence flow id → `{ id, type: "bpmn:SequenceFlow", from, to }` |

See [`example_json/process.json`](example_json/process.json) under this plugin’s `lib/` for sample process rows (reference only; not a full `DefinitionBundle`).

## Child rows (same table)

Each BPMN element that AppBuilder treats as a definition has its own row. Examples from platform seeds:

| `type` | Purpose |
|--------|---------|
| `trigger` | Start event / lifecycle (`processID`, `diagramID`, `key`, `objectID`, …) |
| `process.task.service.*` | Service task configuration |
| `process.task.email` | Email step (`to`, `from`, `subject`, `message`, …) |
| `process.task.end` | End event |

Child `json` includes:

- `id` — UUID (matches an entry in process `elementIDs` when applicable)
- `name`, `translations`
- `processID` — UUID of parent process row
- `diagramID` — BPMN element id from `xmlDefinition` (e.g. `Task_0ahzuru`)
- `type` — same as row `type`
- Task-specific fields (`key`, email fields, etc.)

## Bundles

This service generates a **`DefinitionBundle`**:

```json
{
  "process": { "id", "name", "type": "process", "json": { ... } },
  "children": [ { "id", "name", "type", "json": { ... } } ]
}
```

Publishing inserts **process first**, then **children**, in one transaction.
