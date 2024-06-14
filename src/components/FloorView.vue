<template>
  <div>
    <div v-if="floors.length === 0">No floors available</div>
    <div v-for="floor in floors" :key="floor.dynamicId">
      <h3>Nom de l'étage : {{ floor.name }}</h3>
      <RoomView :rooms="floor.children || []" />
    </div>
  </div>
</template>

<script>
import RoomView from './RoomView.vue';

export default {
  name: 'FloorView',
  components: {
    RoomView
  },
  props: {
    floors: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>
