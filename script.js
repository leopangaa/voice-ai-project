const APP_ID = "20942dcc36494ebcb2b362e383d6cca0";   // paste your Agora App ID
const CHANNEL = "testChannel";

let client;
let localAudioTrack;

async function joinChannel() {

    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    await client.join(APP_ID, CHANNEL, null, null);

    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    await client.publish([localAudioTrack]);

    console.log("Joined channel and speaking...");
}

async function leaveChannel() {

    if(localAudioTrack){
        localAudioTrack.close();
    }

    await client.leave();

    console.log("Left the channel");
}

client.on("user-published", async (user, mediaType) => {

    await client.subscribe(user, mediaType);

    if (mediaType === "audio") {
        const remoteTrack = user.audioTrack;
        remoteTrack.play();
    }

});