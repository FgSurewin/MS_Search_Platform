export function convertLogprobsToProbs(tokenProbs: number[]): number[] {
  // Convert log probabilities to probabilities
  const probs = tokenProbs.map((x: number) => Math.exp(x));
  return probs;
}

export function concatTokensAndTokenProbs(
  tokens: string[],
  tokenProbs: number[],
  numberOfTokens: number
): string {
  // Concatenate tokens and token probabilities to a text string
  let text = "";
  for (let i = 0; i < numberOfTokens; i++) {
    text += `${tokens[i]}-[${(tokenProbs[i] * 100).toFixed(2)}%] `;
  }
  return text;
}
