import { PubSubManager } from "./PubSubManager";

const pubSubInstance = PubSubManager.getInstance()

pubSubInstance.listenForUpdates()