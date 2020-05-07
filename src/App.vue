<template>
  <div id="app">
    <h1>Z<span>&#128065;</span> Client</h1>
    <div style="width:250px">
      <zeye-peer-media
        :show-volume-bar="true"
        :peer-id="$zeyeClient.getMe().id"
      ></zeye-peer-media>
    </div>
    <div
      v-for="peer in $zeyeClient.getPeers()"
      :key="peer.id"
      style="width:250px"
    >
      <zeye-peer-media
        :show-volume-bar="true"
        :peer-id="peer.id"
      ></zeye-peer-media>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$zeyeClient.setRoomUrl();

    const roomId = "example01";
    const peerId = "example" + Math.random();

    this.$zeyeClient.setMe(peerId);

    this.$zeyeClient.join({
      roomId,
      peerId,
      displayName: this.$zeyeClient.getMe().displayName
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
