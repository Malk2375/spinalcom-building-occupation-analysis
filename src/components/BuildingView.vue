<template>
  <div>
    <h1>Building Occupancy</h1>
    <div v-if="buildings.length === 0">No buildings available</div>
    <div v-for="building in buildings" :key="building.dynamicId">
      <h2>Nom du batiment :{{ building.name }}</h2>
      <FloorView :floors="building.children || []" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FloorView from './FloorView.vue';

export default {
  name: 'BuildingView',
  components: {
    FloorView
  },
  computed: {
    ...mapState({
      buildings: state => state.buildings.children || []  // assuming the children array contains floors
    })
  },
  created() {
    this.fetchBuildings();
  },
  methods: {
    ...mapActions(['fetchBuildings'])
  }
};
</script>
