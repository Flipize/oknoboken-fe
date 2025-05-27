import Card from "../Card";
import Boken from "../../assets/boken.jpg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToOknoboken) {
      const el = document.querySelector('[data-scroll-target="oknoboken"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div data-scroll-target="oknoboken" className="scroll-mt-20">
      <Card title="Oknöboken">
        <div>
          <img
            src={Boken}
            alt="Oknoboken"
            className="w-60 mb-4 md:float-right md:ml-6 mx-auto md:mx-0 block rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-200 transform rotate-[0.3deg] hover:scale-105 transition duration-300"
          />
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Min bok om Oknö är naturligtvis en hyllning till denna underbara
            plats men jag vill också genom boken ge fler möjlighet att få
            kunskap om öns historia. Det finns många som har eller har haft ett
            hus på Oknö som inte känner till hur det kom sig att det blev en
            semesterö.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Jag har haft förmånen att få bosätta mig här permanent sedan 2020
            och har haft mitt hus sedan 1993. Då visste inte jag heller mycket
            om Oknö eller dess historia. Att jag skulle skriva en bok drygt
            trettio år senare trodde jag inte då!
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Oknö är en ö strax utanför Mönsterås på Ostkusten, mitt emellan
            Kalmar och Oskarshamn. Ön har broförbindelse med fastlandet och här
            bor cirka 400 personer permanent och klassificeras som en tätort.
            Här finns fler än 500 fastigheter, två campingplatser, sex kommunala
            badplatser, naturförskola och en underbar natur.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            År 1950 öppnade Sveriges första kommunala semesterby som några år
            senare hade 127 uthyrningsstugor. Platsen blev känd över hela
            Sverige för dess fina stugor med hög standard med dåtidens mått för
            en billig peng som alla hade råd med.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Innan Oknö blev ett semesterparadis brukades jorden av
            torparfamiljer redan från slutet av 1600-talet.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            I boken kan man läsa om de första tre torpen, de första
            sommarstugorna och den första kommunala semesterbyn i Sverige. Här
            finns också berättelser om Karolina, hon som sov i 32 år,
            lotsstationen, färjeläget, vattenrutschkanan på Lillön och mycket
            mer.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            Jag hoppas du är intresserad och vill köpa boken. Skicka din adress
            till min mejladress info@lizettavonsmil.se, dit du vill att jag ska
            skicka boken, och swisha totalt 325 kr varav 75 kr avser frakt. Vill
            du hellre hämta den hemma hos mig på Lillövägen 36 på Oknö,
            Mönsterås, går det också bra, då är priset endast 250 kr. Meddela
            innan så jag är hemma. Boken kommer också att finnas till
            försäljning hos Erikas Galleri och Atelje på Storgatan i Mönsterås.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Main;
