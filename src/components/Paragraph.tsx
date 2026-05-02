import { ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p className="regular-text-font text-base sm:text-lg leading-7 sm:leading-8 text-[#2d332a]">
      {children}
    </p>
  );
};

export default Paragraph;
