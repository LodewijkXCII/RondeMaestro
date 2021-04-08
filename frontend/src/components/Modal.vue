<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
          <font-awesome-icon :icon="['fas', 'times']" @click="$emit('close')" />
        </div>

        <div class="modal-body">
          <slot name="body">
            <p>Selecteer het team waarin de renner op dit moment nog zit.</p>
            <label for="year">Kies het oude team:</label>
            <select
              name="team"
              id="team"
              v-model="selectedTeam"
              required
              @change="searchRiders(selectedTeam.id)"
            >
              <option :value="team" v-for="team in allTeams" :key="team.id">
                {{ team.year }} - {{ team.name }}
              </option>
            </select>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="modalRenners">
              <div
                class="modalRenners__renner"
                :class="renner.selected ? 'selected' : ''"
                v-for="(renner, index) in teamMembers"
                :key="renner.cyclist_id"
              >
                <div class="modalRenners__renner--name">
                  {{ renner.first_name }}
                  <span class="lastName">{{ renner.last_name }}</span>
                </div>
                <div class="modalRenners__renner--icons">
                  <font-awesome-icon
                    :icon="['fas', 'clipboard-check']"
                    @click.prevent="addRennerToSelectie(renner, index)"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'arrow-right']"
                    @click="addRennerToTeam(renner.cyclist_id)"
                  />
                </div>
              </div>
            </div>
            <button
              class="btn btn-succes"
              v-if="rennerArray.length > 0"
              @click.prevent="changeSelection"
              style="margin-top: 1rem"
            >
              Wijzig alle renners ({{ rennerArray.length }})
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../utils/config';

export default {
  props: {
    allTeams: Array,
    team_id: Number,
  },
  data() {
    return {
      selectedTeam: {},
      teamMembers: [],
      rennerArray: [],
    };
  },
  methods: {
    async searchRiders(id) {
      const teamMembers = await axios.get(
        `${config.DEV_URL}cyclists?team=${id}`
      );

      this.teamMembers = teamMembers.data.map((renner) => ({
        ...renner,
        selected: false,
      }));
    },
    async addRennerToTeam(renner) {
      const addRenner = axios
        .put(`${config.DEV_URL}cyclists/${renner}`, {
          team_id: this.team_id,
        })
        .then((response) => {
          if (response.status == 200 || response.status == 204) {
            this.$emit('close');
          } else {
            console.log('er is iets mis gegaan');
          }
        })
        .catch((error) => {
          return { error };
        });
    },
    toggleSelected(i) {
      this.teamMembers[i].selected = !this.teamMembers[i].selected;
    },
    addRennerToSelectie(renner, index) {
      if (this.rennerArray.includes(renner.cyclist_id)) {
        this.rennerArray.splice(index, 1);
      } else {
        this.rennerArray.push(renner.cyclist_id);
      }
      this.toggleSelected(index);
    },
    changeSelection() {
      this.rennerArray.forEach((cyclist) => {
        this.addRennerToTeam(cyclist);
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles.scss';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;

  h3 {
    margin-top: 0;
    color: $primary-color;
  }

  svg {
    cursor: pointer;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modalRenners {
  display: grid;
  grid-template-columns: 1fr 1fr;
  &__renner {
    margin: 0.2rem;
    background: $light-color;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    transition: 0.3s;
    cursor: pointer;

    &:hover,
    &:focus {
      background: darken($color: $light-color, $amount: 4);
      outline: 1px solid $primary-color;
    }

    &--icons {
      svg {
        margin: 0.2rem;
      }
    }
  }
  .selected {
    border: 1px solid darken($color: $succes-color, $amount: 4);
    background: $succes-color;
    color: white;

    svg {
      color: white;
    }
  }
}
</style>
