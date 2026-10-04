import { AiOutlineLoading } from "react-icons/ai";

export default function Loading({size}:{size:number}) {
  return (
      <AiOutlineLoading size={size} className="animate-spin  text-gold" />
  );
}