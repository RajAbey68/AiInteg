# Agent Customization Rules

These rules govern the behavior of Antigravity and other workspace agents when running in this project.

## 1. Actionable Autonomy
* **Rule**: If a task can be done directly by the agent, do it yourself.
* **Instruction**: Do not ask or instruct the user to run commands, edit files, or execute scripts that the agent has tools to execute directly. Automate everything within your capability.

## 2. Remote Agent Execution
* **Rule**: When spawning multiple agents to do work, execute them on remote servers where possible.
* **Instruction**: Offload computational load, multi-agent orchestrations, or parallel task subagents to remote execution servers instead of consuming local resources, when available.

## 3. Model & Agent Mix
* **Rule**: Always use Hermes and a mixture of agents where possible. Default to OpenRouter where possible.
* **Instruction**: Optimize tasks by orchestrating a mix of specialized agents. Leverage OpenRouter as the default API provider for model queries.
