import { Sandbox } from "@e2b/code-interpreter"
import { createAgent, openai } from "@inngest/agent-kit"
import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      // Imagine this is a sandbox creation step
      const sandbox = await Sandbox.create("cwa-loveable-test-1")
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: "Database summarizer",
      description: "Provides expert support for managing PostgreSQL databases",
      system:
        "You are a PostgreSQL expert database administrator. " +
        "You only provide answers to questions related to PostgreSQL database schema, indexes, and extensions.",
      model: openai({ model: "gpt-4o" })
    })

    const { output } = await codeAgent.run(
      `Provide a brief summary of the database schema for sandbox with ID: ${sandboxId}`
    )

    console.log("Summary:", output)

    return { message: `Hello ${event.data.email}!` }
  }
)
