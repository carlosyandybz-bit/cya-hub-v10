# CYA Hub v10 — Modular Txx Registry

`.cya/tool-registry.yaml` is the canonical global registry index for schema, policy and action routing.

Each `Txx.yaml` file in this directory is the single machine-readable authority for that tool's lifecycle state and tool-specific metadata.

Do not duplicate Txx lifecycle blocks back into `.cya/tool-registry.yaml`, `CURRENT.md`, `.cya/project-state.yaml` or other operational mirrors.
