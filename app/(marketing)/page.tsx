import { getCombinedSession } from "@/lib/auth/universal-auth";
import { getDefaultDecksSelection } from "@/use-cases/deck";
import { getPlanPricings } from "@/use-cases/plan/get-pricings";
import { getValidTemporaryRoomByGuestEmail } from "@/use-cases/room/temporary-room";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Pricings } from "./_components/pricings";
import { TemporaryRoomProvider } from "./_components/temporary-room-context";

const MarketingPage = async () => {
  const [pricings, decks, session] = await Promise.all([
    getPlanPricings(),
    getDefaultDecksSelection(),
    getCombinedSession(),
  ]);
  const room = await getValidTemporaryRoomByGuestEmail(session?.user);

  return (
    <>
      <TemporaryRoomProvider decks={decks} currentRoomId={room?.id}>
        <Hero />
      </TemporaryRoomProvider>
      <HowItWorks />
      <Pricings pricings={pricings} />
    </>
  );
};

export default MarketingPage;
