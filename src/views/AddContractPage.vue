<script>
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseInput from "@/components/ui/BaseInput.vue"
import BaseSelect from "@/components/ui/BaseSelect.vue"
import BaseButton from "@/components/ui/BaseButton.vue"
import StatusBadge from "@/components/ui/StatusBadge.vue"

export default {
  name: "AddContractPage",
  components: {
    BaseCard,
    BaseInput,
    BaseSelect,
    BaseButton,
    StatusBadge,
  },
  data() {
    return {
      isEditing: false,
      editingId: null,
      form: {
        id: null,
        companyName: "",
        personalCode: "",
        address: "",
        email: "",
        contractNumber: "",
        status: "",
        telephoneNumber: "",
        bankAccountNumber: "",
        dateFrom: "",
      },
      feeOptions: [
        { label: "Active", value: "Active", isSelected: false },
        { label: "Suspended", value: "Suspended", isSelected: false },
        { label: "Expired", value: "Expired", isSelected: false },
        { label: "Error", value: "Error", isSelected: false },
      ],
      contractOptions: [
        { label: "CTR-1001", value: "CTR-1001", isSelected: false },
        { label: "CTR-1002", value: "CTR-1002", isSelected: false },
        { label: "CTR-1003", value: "CTR-1003", isSelected: false },
        { label: "CTR-1004", value: "CTR-1004", isSelected: false },
        { label: "CTR-1005", value: "CTR-1005", isSelected: false },
        { label: "CTR-1006", value: "CTR-1006", isSelected: false },
        { label: "CTR-1007", value: "CTR-1007", isSelected: false },
        { label: "CTR-1008", value: "CTR-1008", isSelected: false },
        { label: "CTR-1009", value: "CTR-1009", isSelected: false },
        { label: "CTR-1010", value: "CTR-1010", isSelected: false },
        { label: "CTR-1011", value: "CTR-1011", isSelected: false },
        { label: "CTR-1012", value: "CTR-1012", isSelected: false },
      ],
    }
  },
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      this.isEditing = true
      this.editingId = id
      const contracts = this.$store.getters.getContracts || []
      const c = contracts.find((x) => String(x.id) === String(id))
      if (c) {
        this.form = { ...c }
        console.log(this.form)
        console.log(this.form.contractNumber)
        console.log(this.contractOptions.map((o) => o.value))
      }
    }
  },
  methods: {
    async handleSignContract() {
      try {
        if (this.isEditing) {
          await this.$store.dispatch("updateContract", this.form)
        } else {
          if (!this.form.id) this.form.id = Date.now().toString()
          await this.$store.dispatch("addContract", this.form)
        }
        this.$router.push("/contracts")
      } catch (e) {
        console.error("Failed to save contract", e)
      }
    },
    handleBack() {
      this.$router.back()
    },
  },
}
</script>

<template>
  <section class="merchant-agreement">
    <h1 class="merchant-agreement__title">Merchant agreement</h1>
    <BaseCard class="merchant-agreement__card">
      <form @submit.prevent="handleSignContract" class="merchant-agreement__form">
        <div class="merchant-agreement__form-wrapper">
          <div class="merchant-agreement__column">
            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="companyName">Company name</label>
              <BaseInput
                name="companyName"
                v-model="form.companyName"
                type="text"
                placeholder="Feastly Delights"
                required
              />
            </div>
            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="personalCode">Personal code</label>
              <BaseInput
                name="personalCode"
                v-model="form.personalCode"
                type="text"
                placeholder="1250918711"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="address">Address</label>
              <BaseInput
                name="address"
                v-model="form.address"
                type="text"
                placeholder="229 Gordon Street, Los Angeles, California"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="email">Email</label>
              <BaseInput
                name="email"
                v-model="form.email"
                type="email"
                placeholder="jackson2_delight@gmail.com"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="contractNumber">Contract number</label>
              <BaseSelect
                name="contractNumber"
                v-model="form.contractNumber"
                placeholder="Select contract"
                :options="contractOptions"
                required
              />
            </div>
          </div>

          <div class="merchant-agreement__column">
            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="status">Status</label>
              <BaseSelect
                name="status"
                v-model="form.status"
                placeholder="Select status"
                :options="feeOptions"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="telephoneNumber"
                >Telephone number</label
              >
              <BaseInput
                name="telephoneNumber"
                v-model="form.telephoneNumber"
                type="text"
                placeholder="909-569-6098"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="bankAccountNumber"
                >Bank account number</label
              >
              <BaseInput
                name="bankAccountNumber"
                v-model="form.bankAccountNumber"
                type="text"
                placeholder="BTO91828281129I"
                required
              />
            </div>

            <div class="merchant-agreement__group">
              <label class="merchant-agreement__label" for="dateFrom">Date from</label>
              <BaseInput
                name="dateFrom"
                v-model="form.dateFrom"
                type="text"
                placeholder="9/13/2023"
                required
              />
            </div>
          </div>
        </div>
        <div class="merchant-agreement__actions">
          <BaseButton variant="primary" type="submit">
            {{ isEditing ? "Update contract" : "Create contract" }}
          </BaseButton>
          <BaseButton variant="secondary" @click="handleBack"> Back </BaseButton>
        </div>
      </form>
    </BaseCard>
  </section>
</template>

<style scoped>
.merchant-agreement {
  width: 100%;
  max-width: 1320px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.merchant-agreement__title {
  font-size: 30px;
  font-weight: 600;
}

.merchant-agreement__card {
  padding: 0px;
}

.merchant-agreement__form-wrapper {
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}

.merchant-agreement__column {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.merchant-agreement__group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.merchant-agreement__label {
  font-size: 14px;
  font-weight: 500;
}

.merchant-agreement__fee-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.merchant-agreement__actions {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  border-top: 1px solid var(--color-border-card);
  padding: 32px;
  margin-top: 82px;
}

@media (max-width: 768px) {
  .merchant-agreement__form-wrapper {
    grid-template-columns: 1fr;
  }

  .merchant-agreement__actions {
    flex-direction: column;
  }
}
</style>
