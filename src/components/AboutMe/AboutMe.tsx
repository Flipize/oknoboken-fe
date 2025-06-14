import Card from "../Card";
import Paragraph from "../Paragraph";
import Lizette from "../../assets/Lizette.png";

const AboutMe = () => {
  return (
    <div className="h-screen">
      <Card title="Om mig">
        <div className="flex justify-center md:block">
          <img
            src={Lizette}
            alt="Jag"
            className="w-60 max-w-full mb-3 md:float-left md:mr-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-200 transform rotate-[0.3deg] hover:scale-105 transition duration-300"
          />
        </div>
        <Paragraph>
          Hej! Jag heter Lizette Nilsson och är författare till boken Oknöboken.
        </Paragraph>
        <Paragraph>
          Jag är född 1963 i Vimmerby. Mitt efternamn som ogift var Anemyr.
          Eftersom Vimmerby inte hade någon gymnasieskola 1979 fick alla som
          ville gå gymnasiet åka buss till grannkommunen Hultsfred. Jag gick den
          samhällsvetenskapliga linjen, en klass med 26 tjejer och fyra killar.
          En av dessa fyra killar blev senare min man, Mikael Nilsson. Vi blev
          ett par 1981, förlovade oss 1985, gifte oss 1987, fick första barnet
          1992, tvillingar 1994. Innan det var dags för giftermål och barn
          studerade jag till ekonom i Kristianstad och Växjö. Jag startade min
          yrkeskarriär på Skattemyndigheten i Vimmerby 1985. År 1988 började jag
          arbeta som ekonomichef på Roshamns (bytte senare namn till Svelux,
          Luxo och Glamox) i Målilla. Där arbetade jag i 17 år varav tio av
          dessa på distans från Huskvarna dit vi flyttade 1995.
        </Paragraph>
        <Paragraph>
          I Jönköping har jag arbetat som ekonomichef dels på ett företag som
          heter Hettich och min senaste anställning var på Jönköpings kommunala
          bostadsbolag Vätterhem.
        </Paragraph>
        <Paragraph>
          Under coronaåret 2020 slutade jag på Vätterhem efter nio år. Min man
          hade några år tidigare fått diagnosen atypisk Parkinson, Lewy Body
          Demens, vilket är en obotlig sjukdom. Vi beslutade oss för att sälja
          vårt hus i Huskvarna och flytta till vårt sommarhus på Oknö. Vi ville
          ta vara på tiden och njuta av varandra och vår paradisö, vi visste att
          Mikaels hälsotillstånd så småningom skulle bli sämre och sämre. Jag sa
          upp mig från mitt arbete på Vätterhem och Mikael hade redan slutat
          sitt arbete några år tidigare. Under tre år som ”lyxlediga” kunde vi
          njuta av vårt Oknö. Vi skaffade en hundvalp, vilket var MYCKET svårare
          än jag hade räknat med, men Nelson är nu en härlig ”kompis”.
        </Paragraph>
        <Paragraph>
          Den 21 maj 2023 hände det som inte skulle hända, jag hittar min man
          medvetslös på badrumsgolvet när jag kommer hem från morgonrundan med
          Nelson. Jag ringer 112 och jag påbörjar HLR. Ambulansen och
          Räddningstjänsten kommer snabbt men Mikaels liv går inte att rädda.
          Jag har förlorat min livskamrat sedan 42 år! Mikael dog inte av sin
          sjukdom, han hade fått proppar i lungorna, lungemboli. Troligtvis gick
          allt mycket fort.
        </Paragraph>
        <Paragraph>
          Efter att detta hände är jag så otroligt tacksam för att jag vågade
          säga upp mig från mitt arbete och flytta till Oknö med Mikael. Vi fick
          tre år tillsammans som permanentboende på Oknö.
        </Paragraph>
        <Paragraph>
          Man vet inte vad som händer i morgon så därför är min livsfilosofi att
          ta vara på livet medan man lever. Jag vill uppleva mycket och träffa
          många människor och göra bra saker, inte bara för mig själv utan även
          för andra. Jag har tagit uppdrag som god man eftersom jag då kan
          hjälpa några med mina kunskaper inom bland annat ekonomi.
        </Paragraph>
        <Paragraph>
          Strax efter att min man gick bort började jag med mitt bokprojekt om
          Oknö. En form av terapi i sorgearbetet men också fantastiskt kul. Jag
          har lärt känna så många trevliga människor i samband med
          hundpromenader och intervjuer.
        </Paragraph>
        <Paragraph>
          Mitt engagemang i Oknö Stugförening, där jag är kassör, har också
          bidragit till att min kärlek till Oknö bara blir större och större.
        </Paragraph>
        <Paragraph>Skjut inte upp det du vill göra, lev livet idag!</Paragraph>
      </Card>
    </div>
  );
};

export default AboutMe;
