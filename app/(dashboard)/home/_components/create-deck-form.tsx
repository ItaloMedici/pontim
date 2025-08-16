import { CardsPicker } from "@/components/cards-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { labelVariants } from "@/components/ui/label";
import {
  DECK_DELIMITER,
  DECK_MAX_CARD_LENGTH,
  DECK_MAX_CARDS,
} from "@/lib/consts";
import { CreateRoom } from "@/lib/schemas/create-room";
import { InfoIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

const inititalChoices = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
];

export const CreateDeckForm = () => {
  const form = useFormContext<CreateRoom>();
  const [choices, setChoices] = useState(inititalChoices);

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const sanitizedValue = value.replace(/,+/g, ",");

    const sanitizedArray = sanitizedValue
      .split(DECK_DELIMITER)
      .map((value) => value.trim().slice(0, DECK_MAX_CARD_LENGTH))
      .filter(Boolean);

    const uniqueChoices = Array.from(new Set(sanitizedArray)).slice(
      0,
      DECK_MAX_CARDS,
    );

    form.setValue("values", sanitizedValue);
    setChoices(uniqueChoices.map((value) => ({ value })));
  };

  return (
    <>
      <FormField
        control={form.control}
        name="deckname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Deck</FormLabel>
            <FormControl>
              <Input placeholder="Super Deck" {...field} autoComplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="values"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cartas do deck</FormLabel>
            <FormControl>
              <Input
                placeholder="1,2,3"
                {...field}
                autoComplete="off"
                onChange={onValueChange}
              />
            </FormControl>
            <FormDescription>
              <span>
                <InfoIcon className="inline mr-1" size={14} />
              </span>
              Insira os valores separados por virgula, com máximo de 3 letras.{" "}
              <br />
              Emojis são bem-vindos 👍
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-6">
        <span className={labelVariants()}>Visualização do deck</span>
        <CardsPicker
          choiceOptions={choices}
          handleChoice={() => {}}
          selfChoice={null}
          showTitle={false}
        />
      </div>
    </>
  );
};
