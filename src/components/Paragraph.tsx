import { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
      {children}
    </p>
  );
};

export default Paragraph;
