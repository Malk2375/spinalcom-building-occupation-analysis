<template>
  <div>
    <div v-if="rooms.length === 0">No rooms available</div>

    <!-- Affichage des sommes des occupations par étage -->
    <div v-for="floorOccupations in floorOccupationsSummary" :key="floorOccupations.floorName">
      <h3>{{ floorOccupations.floorName }}</h3>
      <p>Occupations true: {{ floorOccupations.trueOccupations }}</p>
      <p>Occupations false: {{ floorOccupations.falseOccupations }}</p>
      <p>Total Occupations: {{ floorOccupations.totalOccupations }}</p>
      <p>Occupations Pourcentage: {{ floorOccupations.occupationPourcentage.toFixed(0) }}%</p>
    </div>

    <!-- Boucle pour afficher les pièces -->
    <div v-for="room in rooms" :key="room.dynamicId">
      <h4>{{ room.name }}</h4>
      <p :class="getOccupationClass(room.dynamicId)">{{ getRoomOccupation(room.dynamicId) }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RoomView',
  props: {
    rooms: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['getRoomDetails']),
    // Calcul des sommes des occupations par étage
    floorOccupationsSummary() {
      const floorOccupations = {};

      // Calcul des sommes pour chaque étage
      this.rooms.forEach(room => {
        const details = this.getRoomDetails(room.dynamicId);
        const floorName = details ? details.floorName : 'Unknown Floor'; // Assurez-vous d'avoir le nom de l'étage dans vos données
        if (!floorOccupations[floorName]) {
          floorOccupations[floorName] = {
            floorName,
            trueOccupations: 0,
            falseOccupations: 0,
            undefinedOccupations: 0,
            totalOccupations: 0
          };
        }
        if (details && details.occupation === true) {
          floorOccupations[floorName].trueOccupations++;
        } else if (details && details.occupation === false) {
          floorOccupations[floorName].falseOccupations++;
        } else {
          floorOccupations[floorName].undefinedOccupations++;
        }
        floorOccupations[floorName].totalOccupations++;
      });

      // Calcul du pourcentage d'occupation pour chaque étage
      Object.values(floorOccupations).forEach(floor => {
        floor.occupationPourcentage = ((floor.trueOccupations * 100) / floor.totalOccupations);
      });

      return Object.values(floorOccupations);
    }
  },
  methods: {
    ...mapActions(['fetchRoomDetails']),
    getRoomOccupation(roomId) {
      const details = this.getRoomDetails(roomId);
      if (!details || details.occupation === undefined) {
        return 'Occupation: UNDEFINED';
      } else {
        return `Occupation: ${details.occupation}`;
      }
    },
    getOccupationClass(roomId) {
      const details = this.getRoomDetails(roomId);
      if (!details || details.occupation === undefined) {
        return 'undefined-occupation';
      } else {
        return details.occupation ? 'true-occupation' : 'false-occupation';
      }
    }
  },
  watch: {
    rooms: {
      immediate: true,
      handler(newRooms) {
        newRooms.forEach(room => this.fetchRoomDetails(room.dynamicId));
      }
    }
  }
};
</script>

<style>
.false-occupation {
  color: red;
}

.true-occupation {
  color: green;
}

.undefined-occupation {
  color: grey;
}
</style>
