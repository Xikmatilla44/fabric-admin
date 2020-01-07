<template>

  <div class="jumbotron">

    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
