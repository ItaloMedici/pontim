import { ChoiceOptions } from "@/types/choice-options";

export const fibonacciChoiceOptions: ChoiceOptions = [
  { value: "1", label: "1", weight: 1 },
  { value: "2", label: "2", weight: 2 },
  { value: "3", label: "3", weight: 3 },
  { value: "5", label: "5", weight: 5 },
  { value: "8", label: "8", weight: 8 },
  { value: "13", label: "13", weight: 13 },
  { value: "21", label: "21", weight: 21 },
  { value: "☕", label: "☕", weight: 0 },
  { value: "?", label: "?", weight: 0 },
];

export const fibonacciAverageOptions = {
  small: 2,
  medium: 5,
  large: 13,
};
