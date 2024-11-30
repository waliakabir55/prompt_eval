import { OpenAI } from "openai";
import EvalPromptGenerator from "./EvalPromptGenerator";
import UserParams from "./UserParams";

const openai = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

async function main() {
  const promptGenerator = new EvalPromptGenerator(
    new UserParams(
      "", // prompt,
      null, // input_file,
      "", // model,
      ["Make sure plot points are accurate", "Add some spice."], // error_categories,
      [], // desired_traits,
      "The user is trying to summarize short stories." // user_scenario
    )
  );

  const metaEvalPrompt = promptGenerator.generatePrompt();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",

    messages: [{ role: "system", content: `${metaEvalPrompt}` }],
  });

  console.log(completion.choices[0].message.content);
}

main();
