import { FaCheckCircle } from "react-icons/fa";

export default function Verification({ publication }: { publication: boolean }) {
  return (
    <span
      className={`text-blue-500 flex items-center justify-center ${
        publication ? "text-sm" : "text-base"
      }`}
      title='Verificado'
    >
      <FaCheckCircle />
    </span>
  );
}
