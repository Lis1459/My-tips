<script>
export default {
  name: "StatsCard",
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    linkText: { type: String, default: "" },
    linkUrl: { type: String, default: "#" },
  },
  methods: {
    handleLinkClick() {
      this.$emit("click", { url: this.linkUrl })
    },
  },
}
</script>
<template>
  <div class="stats-card">
    <div class="stats-card__body">
      <div class="stats-card__text">
        <span class="stats-card__title">{{ title }}</span>
        <div class="stats-card__value">{{ value }}</div>
      </div>
      <div class="stats-card__link-group">
        <a
          v-if="linkText"
          :href="linkUrl"
          class="stats-card__link"
          @click.prevent="handleLinkClick"
          >{{ linkText }}</a
        ><img src="../../assets/icons/ArrowIcon.svg" alt="Arrow icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: var(--vt-c-white);
  border: 1px solid var(--color-border-card);
  border-radius: 5px;
  padding: 16px 0px 16px 24px;
  display: flex;
  flex-direction: column;
  min-width: 160px;
}
.stats-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.stats-card__title {
  font-size: 14px;
  line-height: 150%;
  font-weight: var(--weight-medium);
  color: #959595;
}
.stats-card__link-group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.stats-card__link {
  font-size: 14px;
  line-height: 150%;
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.stats-card__link:hover {
  opacity: 0.8;
}
.stats-card__value {
  line-height: 150%;
  font-weight: var(--weight-medium);
  color: var(--vt-c-black-soft);
}
</style>
