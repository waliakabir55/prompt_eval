import UserParams from "./UserParams";
import EvalOutputExample from "./EvalOutputExample";
import fs from "fs";
import path from "path";

export default class EvalPromptGenerator {
  META_EVAL_PROMPT_PATH = path.join(
    __dirname,
    "prompts",
    "meta_eval_prompt.txt"
  );

  MEDICAL_SUMMARY_EVAL_PROMPT_PATH = path.join(
    __dirname,
    "prompts",
    "medical_summary_eval_prompt.txt"
  );

  EMAIL_SUMMARY_EVAL_PROMPT_PATH = path.join(
    __dirname,
    "prompts",
    "email_summary_eval_prompt.txt"
  );

  REGEX_FOR_TEMPLATE_MATCH = /{{(\w+)}}/g;

  constructor(
    private params: UserParams // private examples: EvalOutputExample[], // private metric_type: string
  ) {}

  generatePrompt(): string {
    const template = this.__getMetaEvalPromptTemplate();
    return this.__hydrateTemplate(template);
  }

  /**
   * Reads the file at META_EVAL_PROMPT_PATH and returns the content
   */
  __getMetaEvalPromptTemplate(): string {
    return fs.readFileSync(this.META_EVAL_PROMPT_PATH, "utf-8");
  }

  __getMedicalSummaryEvalPromptTemplate(): string {
    return fs.readFileSync(this.MEDICAL_SUMMARY_EVAL_PROMPT_PATH, "utf-8");
  }

  __getEmailSummaryEvalPromptTemplate(): string {
    return fs.readFileSync(this.EMAIL_SUMMARY_EVAL_PROMPT_PATH, "utf-8");
  }

  __hydrateTemplate(template: string): string {
    const variableMap: { [key: string]: string } = {
      medicine_example: this.__getMedicalSummaryEvalPromptTemplate(),
      email_example: this.__getEmailSummaryEvalPromptTemplate(),
      user_scenario: this.params.user_scenario,
      evaluation_description: "- " + this.params.error_categories.join("\n- "),
    };

    return template.replace(this.REGEX_FOR_TEMPLATE_MATCH, (_, key: string) => {
      return variableMap[key];
    });
  }
}

function main() {
  const params = new UserParams(
    "", // prompt,
    null, // input_file,
    "", // model,
    ["Make sure plot points are accurate", "Add some spice."], // error_categories,
    [], // desired_traits,
    "The user is trying to summarize short stories." // user_scenario
  );

  const generator = new EvalPromptGenerator(params);
  const prompt = generator.generatePrompt();

  // Write to file
  fs.writeFileSync("eval_prompt.txt", prompt);
}

main();
