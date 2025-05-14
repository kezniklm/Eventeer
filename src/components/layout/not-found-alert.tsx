import { XCircle } from "lucide-react";

export type NotFoundProps = {
  title: string;
  description: string;
};

export const NotFoundAlert = ({ title, description }: NotFoundProps) => (
  <div className="flex h-[70vh] flex-col items-center justify-center text-gray-600">
    <XCircle className="mb-6 h-24 w-24" style={{ color: "var(--primary)" }} />
    <p className="text-2xl font-semibold" style={{ color: "var(--primary)" }}>
      {title}
    </p>
    <p className="mt-1 text-lg text-gray-500">{description}</p>
  </div>
);
