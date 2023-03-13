<template>
  <header>
    <CountDown class="count-down" />
    <!-- <span>Perdeu: {{ store.loser }}</span> -->
    <img v-show="!cardStatus && !loser" src="../assets/foca/Idle.gif" width="150">
    <img v-show="cardStatus == 'success'" src="../assets/foca/success.gif" width="150">
    <img v-show="cardStatus == 'error' || loser" src="../assets/foca/error.gif" width="150">
    <!-- <button @click="store.setAction('start')">INICIAR</button> -->
    <div class="button" @click="store.setAction('start')">
      INICIAR
    </div>
  </header>
</template>
<script setup>
import CountDown from './CountDown.vue'
import { useCountDown } from "../store"
import { storeToRefs } from 'pinia';
const store = useCountDown();
const { cardStatus, loser } = storeToRefs(store)
</script>
<style scoped>
header {
  width: 100%;
  border-bottom: solid 1px grey;
  padding: 2px 0px;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0px 1px 3px rgba(44, 204, 196, 0.4), inset 0px -1px 3px rgba(44, 204, 196, 0.4), 0px 3px 6px rgba(0, 0, 0, 0.3);
}

.count-down {
  margin-left: 16px;
}


.button {
  margin-right: 16px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background: rgba(44, 204, 196, 0.4);
  border-radius: 100px;
  border: 3px solid #fff;
  border-width: 3px 3px 3px 3px;
  box-shadow: inset 0px 1px 3px #55e9e8, inset 0px -1px 3px #35c9c8, 0px 3px 6px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 20px;
  /* font-family: Helvetica Neue; */
  font-weight: 900;
  font-style: normal;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);

}

.button:active {
  transform: translateY(1px) translateX(1px);
  box-shadow: inset 0px 1px 3px #399f9f, inset 0px -1px 3px #399f9f, 0px 3px 6px rgba(0, 0, 0, 0.3);
}

/* .button>div {
  color: #999;
  font-size: 10px;
  font-family: Helvetica Neue;
  font-weight: initial;
  font-style: normal;
  text-align: center;
  margin: 0px 0px 0px 0px
} */

/* .button>i {
  color: #fff;
  font-size: 1em;
  border-radius: 0px;
  border: 0px solid transparent;
  border-width: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
  position: static
} */

/* .button>.ld {
  font-size: initial
} */
</style>