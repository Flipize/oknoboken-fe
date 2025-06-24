import Card from "../Card";
import Boken from "/assets/images/Boken.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Paragraph from "../Paragraph";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToOknoboken) {
      const el = document.querySelector('[data-scroll-target="oknoboken"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div
      data-scroll-target="oknoboken"
      className="scroll-mt-20 max-w-600 mx-auto"
    >
      <Card title="Oknöboken">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mx-30">
          <div className="space-y-4">
            <Paragraph>
              Min bok om Oknö är naturligtvis en hyllning till denna underbara
              plats men jag vill också genom boken ge fler möjlighet att få
              kunskap om öns historia. Det finns många som har eller har haft
              ett hus på Oknö som inte känner till hur det kom sig att det blev
              en semesterö.
            </Paragraph>
            <Paragraph>
              Jag har haft förmånen att få bosätta mig här permanent sedan 2020
              och har haft mitt hus sedan 1993. Då visste inte jag heller mycket
              om Oknö eller dess historia. Att jag skulle skriva en bok drygt
              trettio år senare trodde jag inte då!
            </Paragraph>
            <Paragraph>
              Oknö är en ö strax utanför Mönsterås på Ostkusten, mitt emellan
              Kalmar och Oskarshamn. Ön har broförbindelse med fastlandet och
              här bor cirka 400 personer permanent och klassificeras som en
              tätort. Här finns fler än 500 fastigheter, två campingplatser, sex
              kommunala badplatser, naturförskola och en underbar natur.
            </Paragraph>
            <Paragraph>
              År 1950 öppnade Sveriges första kommunala semesterby som några år
              senare hade 127 uthyrningsstugor. Platsen blev känd över hela
              Sverige för dess fina stugor med hög standard med dåtidens mått
              för en billig peng som alla hade råd med.
            </Paragraph>
            <Paragraph>
              Innan Oknö blev ett semesterparadis brukades jorden av
              torparfamiljer redan från slutet av 1600-talet.
            </Paragraph>
            <Paragraph>
              I boken kan man läsa om de första tre torpen, de första
              sommarstugorna och den första kommunala semesterbyn i Sverige. Här
              finns också berättelser om Karolina, hon som sov i 32 år,
              lotsstationen, färjeläget, vattenrutschkanan på Lillön och mycket
              mer.
            </Paragraph>
            <Paragraph>
              Jag hoppas du är intresserad och vill köpa boken. Skicka din
              adress till min mejladress info@lizettavonsmil.se, dit du vill att
              jag ska skicka boken, och swisha totalt 325 kr varav 75 kr avser
              frakt. Vill du hellre hämta den hemma hos mig på Lillövägen 36 på
              Oknö, Mönsterås, går det också bra, då är priset endast 250 kr.
              Meddela innan så jag är hemma. Boken kommer också att finnas till
              försäljning hos Erikas Galleri och Atelje på Storgatan i
              Mönsterås.
            </Paragraph>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="flex flex-col items-center md:items-end">
              <img
                src={Boken}
                alt="Bild på Oknöbokens omslag"
                className="max-w-100 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-200 w-9/10"
              />
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-9/10"
                onClick={() => navigate("/order")}
              >
                Köp
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Main;
