export default class UserParams {
  /**
   * The base prompt that the user submits for evaluation
   */
  prompt: string;

  /**
   * Path to the test data that the user optionally submits
   */
  input_file: string | null;

  /**
   * LLM they are using
   */
  model: string; // switch to Enum

  /**
   * Different types of error the user wants to avoid in their system
   */
  error_categories: string[];

  /**
   * Different desired behaviors the user wants
   */
  desired_traits: string[];

  /**
   * Top level goal the user is trying to achieve
   */
  user_scenario: string;

  constructor(
    prompt: string,
    input_file: string | null,
    model: string,
    error_categories: string[] = [],
    desired_traits: string[] = [],
    user_scenario: string
  ) {
    this.prompt = prompt;
    this.input_file = input_file;
    this.model = model;
    this.error_categories = error_categories;
    this.desired_traits = desired_traits;
    this.user_scenario = user_scenario;
  }
}
