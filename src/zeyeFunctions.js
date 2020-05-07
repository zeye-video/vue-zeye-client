import registerRoomFunctions from "./functions/room";
import registerMeFunctions from "./functions/me";
import registerCommonFunctions from "./functions/common";
import registerProducersFunctions from "./functions/producers";
import registerPeersFunctions from "./functions/peers";
import registerConsumersFunctions from "./functions/consumers";

export default function registerFunctions({ app, store }) {
  registerRoomFunctions({ app, store });
  registerMeFunctions({ app, store });
  registerCommonFunctions({ app, store });
  registerProducersFunctions({ app, store });
  registerConsumersFunctions({ app, store });
  registerPeersFunctions({ app, store });
}

/**
 ** In case you`ll ever need computed property
 **

 Object.defineProperties(app.$zeyeClient, {
    amIActiveSpeaker: {
      get() {
        return (
          store.state.zeyeClient.me.id ===
          store.state.zeyeClient.room.activeSpeakerId
        )
      }
    }
  })
*/
