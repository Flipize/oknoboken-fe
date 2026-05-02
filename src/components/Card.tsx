interface CardProps {
  title: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <section className="content-card mx-auto mt-4 sm:mt-6 bg-white/95 shadow-[0_12px_36px_rgba(42,51,38,0.12)] rounded-lg border border-[#e6dfd2] px-4 py-5 sm:p-7 md:p-9 overflow-hidden">
      <h1 className="h1-text-font text-center text-2xl sm:text-4xl md:text-5xl leading-tight mb-5 text-[#25301f] break-words">
        {title}
      </h1>
      {children}
    </section>
  );
};

export default Card;
