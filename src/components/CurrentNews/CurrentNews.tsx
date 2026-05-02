import Card from "../Card";
import Paragraph from "../Paragraph";

const CurrentNews = () => {
  return (
    <div className="max-w-600 mx-auto">
      <Card title="Aktuellt">
        <div className="mx-auto max-w-3xl space-y-5">
          <article className="rounded border border-[#e6dfd2] bg-[#f7f5ef] p-4 shadow-sm sm:p-6">
            <p className="regular-text-font text-sm font-medium text-[#45651f]">
              23 maj, 10.00-14.00
            </p>
            <h2 className="h1-text-font mt-1 text-2xl leading-tight text-[#25301f]">
              Gatuloppis på Oknö
            </h2>

            <img
              src="/assets/images/Gatuloppis.jpg"
              alt="Logotyp för gatuloppis på Oknö"
              className="mx-auto mt-4 w-full max-w-sm rounded border border-[#d8d0c0] object-cover shadow-sm"
            />

            <div className="mt-4 space-y-4">
              <Paragraph>
                Den 23 maj mellan 10.00 och 14.00 är det gatuloppis på Oknö. Då
                kommer drygt 40 fastighetsägare ha loppis på sina egna tomter.
                Jag kommer att sälja min oknöbok samt mycket annat gott och
                blandat! Välkommen till Lillövägen 36.
              </Paragraph>

              <Paragraph>
                Via kartan nedan kan du se var på Oknö det finns möjlighet att
                göra loppisfynd.
              </Paragraph>

              <Paragraph>
                OBS! De pengar jag får in på min loppisförsäljning kommer jag
                att skänka till hjälp i Ukraina.
              </Paragraph>
            </div>

            <p className="regular-text-font mt-5 text-base leading-7 text-[#2d332a] sm:text-lg sm:leading-8">
              Läs mer i{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61583954412440"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-blue-700 underline decoration-2 underline-offset-4 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Facebook-gruppen för gatuloppis på Oknö
              </a>
              .
            </p>

            <div className="mt-5 overflow-hidden rounded border border-[#d8d0c0] bg-white shadow-sm">
              <iframe
                title="Karta över gatuloppis på Oknö"
                src="https://www.google.com/maps/d/embed?mid=1VUg7gBKdmhNbOJCYBNSc-CBOdZhhwF0&ehbc=2E312F"
                className="h-80 w-full sm:h-[30rem]"
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </Card>
    </div>
  );
};

export default CurrentNews;
