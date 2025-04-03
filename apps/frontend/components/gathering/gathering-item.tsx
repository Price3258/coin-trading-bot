import { Gathering } from "~/types/gathering";

type Props = {
  item: Gathering;
};

export default function GatheringItem({ item }: Props) {
  return <li>{item.market}</li>;
}
