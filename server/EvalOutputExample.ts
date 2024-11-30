class UserFeedback {
  constructor(private userScore: number, private userFeedback: string) {}

  getUserScore(): number {
    return this.userScore;
  }

  getUserFeedback(): string {
    return this.userFeedback;
  }
}

export default class EvalOutputExample {
  constructor(
    private exampleText: string,
    private userFeedback: UserFeedback
  ) {}

  getExampleText(): string {
    return this.exampleText;
  }

  getUserFeedback(): UserFeedback {
    return this.userFeedback;
  }
}
