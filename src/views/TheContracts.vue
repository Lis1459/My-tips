<script>
import { mapGetters, mapActions } from "vuex"
import BaseButton from "@/components/ui/BaseButton.vue"
import StatusBadge from "@/components/ui/StatusBadge.vue"

export default {
  name: "TheContracts",
  components: {
    BaseButton,
    StatusBadge,
  },
  computed: {
    ...mapGetters(["getContracts"]),
    contracts() {
      return this.getContracts || []
    },
  },
  async mounted() {
    await this.fetchContracts()
  },
  methods: {
    ...mapActions(["fetchContracts", "deleteContract"]),
    handleEdit(contract) {
      this.$router.push(`/${contract.id}/edit`)
    },
    async handleDelete(contract) {
      if (!confirm(`Delete contract ${contract.contractNumber}?`)) return
      try {
        await this.deleteContract(contract.id)
      } catch (e) {
        console.error("Failed to delete contract", e)
      }
    },
    handleAdd() {
      this.$router.push("/add")
    },
  },
}
</script>

<template>
  <section class="contracts">
    <h1 class="contracts__title">Contracts</h1>

    <div class="contracts__card">
      <BaseButton @click="handleAdd" class="card__add-button">Add contract</BaseButton>
      <div class="contracts__scroll">
        <div class="contracts-grid">
          <div class="contracts-grid__row contracts-grid__row--head">
            <div class="contracts-grid__cell contracts-grid__cell--number">Number</div>
            <div class="contracts-grid__cell">Contract number</div>
            <div class="contracts-grid__cell">Status</div>
            <div class="contracts-grid__cell">Date from</div>
            <div class="contracts-grid__cell">Action</div>
          </div>
          <div class="contracts-grid__body">
            <div
              v-for="(contract, idx) in contracts"
              :key="contract.id"
              class="contracts-grid__row"
            >
              <div class="contracts-grid__cell contracts-grid__cell--number">
                {{ idx + 1 }}
              </div>

              <div class="contracts-grid__cell">
                {{ contract.contractNumber }}
              </div>

              <div class="contracts-grid__cell">
                <StatusBadge :status="contract.status" />
              </div>

              <div class="contracts-grid__cell">
                {{ contract.dateFrom }}
              </div>

              <div class="contracts-grid__cell contracts-grid__cell--actions">
                <BaseButton variant="accent" @click="handleEdit(contract)" class="action-button">
                  <img
                    src="../assets/icons/EditIcon.svg"
                    alt="Edit icon"
                    class="action-buttons__icon"
                /></BaseButton>
                <BaseButton variant="accent" @click="handleDelete(contract)" class="action-button">
                  <img
                    src="../assets/icons/DeleteIcon.svg"
                    alt="Delete icon"
                    class="action-buttons__icon"
                  />
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="contracts.length === 0">No contracts available.</p>
  </section>
</template>

<style scoped>
.contracts {
  width: 100%;
  max-width: 1320px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
}

.action-button {
  padding: 5px;
}

.card__add-button {
  align-self: flex-end;
}

.action-buttons__icon {
  display: block;
}

.contracts__title {
  font-weight: 600;
  font-size: 30px;
  line-height: 45px;
}

.contracts__card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contracts__scroll {
  width: 100%;
  overflow-x: auto;
}

.contracts-grid {
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 800px;
}
.contracts-table__head {
  background: #fff9f9;
}

.contracts-grid__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  align-items: center;
  min-height: 63px;
  border-bottom: 1px solid #ececec;
}

.contracts-grid__body .contracts-grid__row:nth-child(even) {
  background: #f9f9f9;
}

.contracts-grid__row--head {
  background: #fff9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  color: #414141;
}

.contracts-grid__cell {
  padding: 0 24px;
  font-size: 14px;
  color: #565656;
}

.contracts-grid__cell--number {
  text-align: left;
}

.contracts-grid__cell--actions {
  display: flex;
  gap: 8px;
}
</style>
