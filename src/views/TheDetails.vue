<script>
import { mapGetters } from "vuex"
import StatsCard from "@/components/StatsCard.vue"
import * as echarts from "echarts"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseButton from "@/components/ui/BaseButton.vue"

export default {
  name: "TheDetails",
  components: {
    StatsCard,
    BaseCard,
    BaseButton,
  },
  data() {
    return {
      viewBy: "Days",
      chartInstance: null,
    }
  },
  computed: {
    getTips() {
      return this.$store.getters.getTips
    },
    tips() {
      return this.getTips || []
    },
    daysClass() {
      return this.viewBy === "Days" ? "primary" : "secondary"
    },
    monthClass() {
      return this.viewBy === "Month" ? "primary" : "secondary"
    },
    chartData() {
      if (!this.tips.length) return []

      const grouped = {}

      this.tips.forEach((tip) => {
        if (!tip.date || !tip.amount == null) return

        const dateObj = new Date(tip.date)
        if (isNaN(dateObj)) {
          return
        }

        let key

        if (this.viewBy === "Days") {
          const year = dateObj.getFullYear()
          const month = String(dateObj.getMonth() + 1).padStart(2, "0")
          const day = String(dateObj.getDate()).padStart(2, "0")

          key = `${year}-${month}-${day}`
        } else {
          const month = dateObj.getMonth() + 1
          const year = dateObj.getFullYear()
          key = `${year}-${month.toString().padStart(2, "0")}`
        }

        if (!grouped[key]) {
          grouped[key] = {
            total: 0,
            count: 0,
          }
        }

        grouped[key].total += parseFloat(tip.amount)
        grouped[key].count++
      })

      return Object.keys(grouped)
        .sort()
        .map((key) => ({
          date: key,
          value: +(grouped[key].total / grouped[key].count).toFixed(2),
        }))
    },
  },
  async mounted() {
    await this.$store.dispatch("fetchTips")
    this.initChart()
  },

  watch: {
    tips() {
      this.initChart()
    },
    viewBy() {
      this.initChart()
    },
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chart
      if (!chartDom) return
      if (this.chartInstance) {
        this.chartInstance.dispose()
      }

      this.chartInstance = echarts.init(chartDom)

      const categories = this.chartData.map((d) => d.date)
      const values = this.chartData.map((d) => d.value)
      const accentColor = "#fb8f42"
      const lightAccent = "rgba(251, 143, 66, 0.1)"
      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "transparent",
          textStyle: {
            color: "#fff",
          },
          padding: 12,
          borderRadius: 4,
        },
        legend: {
          data: ["Amount of tips transferred"],
          bottom: 0,
          textStyle: {
            color: "#565656",
          },
          itemGap: 16,
        },
        grid: {
          left: 60,
          right: 20,
          top: 40,
          bottom: 60,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: categories,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#e0e0e0",
            },
          },
          axisLabel: {
            color: "#888888",
            fontSize: 12,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#f0f0f0",
              type: "solid",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#888888",
            fontSize: 12,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#f0f0f0",
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "Amount of tips transferred",
            data: values,
            type: "line",
            smooth: true,
            itemStyle: {
              color: accentColor,
            },
            lineStyle: {
              color: accentColor,
              width: 2,
            },
            areaStyle: {
              color: lightAccent,
            },
            symbol: "none",
            emphasis: {
              itemStyle: {
                borderColor: accentColor,
                borderWidth: 2,
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(option)
    },
    changeView(mode) {
      this.viewBy = mode
    },
  },
}
</script>

<template>
  <section class="details">
    <h1 class="details__title">Details</h1>

    <BaseCard class="details__card">
      <div class="details__stats-cards">
        <StatsCard title="Username" value="Jackson_2" linkText="Edit profile" />
        <StatsCard title="Card" value="1921 0120 120 0120" linkText="See other cards" />
        <StatsCard title="Tips transferred" value="Jackson_2" linkText="View details" />
        <StatsCard
          title="Tips amount"
          value="10$"
          subValue="(2030-12-31)"
          linkText="View details"
        />
        <StatsCard title="GPT paid" value="20$" subValue="(2030-12-31)" linkText="View details" />
        <StatsCard
          title="Tips processing"
          value="20$"
          subValue="(2030-12-31)"
          linkText="View details"
        />
      </div>

      <div class="details__content">
        <div class="details__chart-card">
          <div class="details__chart-header">
            <h2 class="details__chart-title">Current price</h2>
            <div class="details__controls">
              <BaseButton :variant="daysClass" @click="changeView('Days')" class="details__button">
                Days
              </BaseButton>
              <BaseButton
                :variant="monthClass"
                @click="changeView('Month')"
                class="details__button"
              >
                Month
              </BaseButton>
            </div>
          </div>
          <div class="details__chart-wrapper">
            <div ref="chart" class="details__chart"></div>
          </div>
        </div>
        <div class="details__table">
          <div class="contracts__scroll">
            <div class="contracts-grid">
              <div class="contracts-grid__row contracts-grid__row--head">
                <div class="contracts-grid__cell">Date</div>
                <div class="contracts-grid__cell">Location</div>
                <div class="contracts-grid__cell">Amount of tips transferred</div>
              </div>
              <div class="contracts-grid__body">
                <div v-for="(tip, idx) in tips" :key="tip.id || idx" class="contracts-grid__row">
                  <div class="contracts-grid__cell">{{ tip.date || "-" }}</div>
                  <div class="contracts-grid__cell">{{ tip.location || "-" }}</div>
                  <div class="contracts-grid__cell">
                    {{ tip.amount ? `$${tip.amount}` : "-" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p v-if="tips.length === 0" class="no-data">No tips available.</p>
        </div>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
.details {
  width: 100%;
  max-width: 1320px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.details__title {
  font-weight: var(--weight-semi-bold);
  font-size: 30px;
  line-height: 45px;
}

.details__card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details__stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
}

.details__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.details__chart-card {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  background: var(--vt-c-white);
  border: 1px solid var(--color-border-card);
  border-radius: 12px;
}

.details__chart-wrapper {
  min-width: 500px;
  padding: 32px;
  border-top: 1px solid #cecece;
}

.details__chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
}

.details__chart-title {
  font-size: 120x;
  font-weight: var(--weight-semi-bold);
  color: #6b6b6b;
  margin: 0;
}

.details__chart {
  width: 100%;
  /* height: clamp(250px, 45vh, 500px); */
  height: 500px;
}
.details__button {
  padding: 8px 20px;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid #c0c0c0;
  border-radius: 0px;
  font-weight: var(--weight-semi-bold);
}

.details__button:focus,
.details__button:focus-visible {
  outline: none;
}

.details__button:first-child {
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.details__button:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.details__table {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-radius: 10px;
}

.contracts__card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contracts__scroll {
  width: 100%;
  min-width: 0;
  max-height: 674px;
  overflow: auto;
}

.contracts-grid {
  background: var(--vt-c-white);
  border: 1px solid var(--color-border-card);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
.contracts-grid__row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  align-items: center;
  min-height: 63px;
  border-bottom: 1px solid var(--color-border);
}

.contracts-grid__row:last-child {
  border: none;
}
.contracts-grid__cell {
  padding: 0 24px;
  font-size: 14px;
  color: var(--color-input-text);
}

.contracts-grid__row--head {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #fff9f9;
  border-bottom: 1px solid var(--color-border-card);
  font-weight: 600;
  color: #414141;
}

.contracts-grid__cell--number {
  text-align: left;
}

.contracts-grid__cell--actions {
  display: flex;
  gap: 8px;
}

.no-data {
  text-align: center;
  color: #888;
  margin-top: 16px;
}

@media (max-width: 1320px) {
  .details__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .details__chart {
    height: 220px;
  }

  .details__chart-card {
    padding: 16px;
  }

  .details__chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .contracts-grid {
    min-width: 600px;
  }
}
</style>
