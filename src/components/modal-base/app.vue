<template>
  <div class="modal-base" key="modal-base">
    <div class="modal-base__background" @click="$emit('close-modal')"></div>
    <div class="modal-base__container">
      <div class="icon-close" @click="$emit('close-modal')">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.9375 0.9375L9.0625 9.0625M9.0625 0.9375L0.9375 9.0625L9.0625 0.9375Z"
            stroke="#656565"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-base",
};
</script>

<style scoped lang="scss">
.modal-base {
  z-index: 10;

  &__background {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.8;
    width: 100vw;
    height: 100vh;
    z-index: 20;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    background-color: #fff;
    border-radius: 8px;
    top: 30%;
    left: 40%;
    margin: auto;
    opacity: 1;
    z-index: 21;
    padding: 12px;
    box-sizing: border-box;
    min-height: 50px;
    width: 250px;
    @media (max-width: 769px) {
      left: 30%;
    }
    @media (max-width: 550px) {
      left: 15%;
    }
    .icon-close {
      position: absolute;
      right: 12px;
      top: 12px;
      width: 13px;
      height: 13px;
      cursor: pointer;
    }
  }
}
</style>
