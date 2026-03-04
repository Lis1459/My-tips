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
      form: {
        companyName: "",
        personalCode: "",
        address: "",
        email: "",
        contractNumber: "",
        terminalMonthlyFee: "",
        telephoneNumber: "",
        bankAccountNumber: "",
        dateFrom: "",
      },
      feeOptions: [
        { label: "Active", value: "active", isSelected: false },
        { label: "Suspended", value: "suspended", isSelected: false },
        { label: "Expired", value: "expired", isSelected: false },
        { label: "Error", value: "error", isSelected: false },
      ],
      contractOptions: [
        { label: "0292912811919289", value: "0292912811919289", isSelected: false },
        { label: "1234567890123456", value: "1234567890123456", isSelected: false },
        { label: "9876543210987654", value: "9876543210987654", isSelected: false },
      ],
    }
  },
  methods: {
    handleSignContract() {
      console.log("Contract form submitted:", this.form)
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
        <div class="merchant-agreement__column">
          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Company name</label>
            <BaseInput v-model="form.companyName" type="text" placeholder="Feastly Delights" />
          </div>
          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Personal code</label>
            <BaseInput v-model="form.personalCode" type="text" placeholder="1250918711" />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Address</label>
            <BaseInput
              v-model="form.address"
              type="text"
              placeholder="229 Gordon Street, Los Angeles, California"
            />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Email</label>
            <BaseInput v-model="form.email" type="email" placeholder="jackson2_delight@gmail.com" />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Contract number</label>
            <BaseSelect
              v-model="form.contractNumber"
              placeholder="0292912811919289"
              :options="contractOptions"
            />
          </div>
        </div>

        <div class="merchant-agreement__column">
          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Status</label>
            <BaseSelect
              v-model="form.terminalMonthlyFee"
              placeholder="Select status"
              :options="feeOptions"
            />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Telephone number</label>
            <BaseInput v-model="form.telephoneNumber" type="text" placeholder="909-569-6098" />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Bank account number</label>
            <BaseInput v-model="form.bankAccountNumber" type="text" placeholder="BTO91828281129I" />
          </div>

          <div class="merchant-agreement__group">
            <label class="merchant-agreement__label">Date from</label>
            <BaseInput v-model="form.dateFrom" type="text" placeholder="9/13/2023" />
          </div>
        </div>
      </form>

      <div class="merchant-agreement__actions">
        <BaseButton variant="primary" type="submit" @click="handleSignContract">
          Sign contract
        </BaseButton>
        <BaseButton variant="secondary" @click="handleBack"> Back </BaseButton>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
.merchant-agreement {
  width: 100%;
  max-width: 1280px;
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

.merchant-agreement__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  margin: 32px;
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
  .merchant-agreement__form {
    grid-template-columns: 1fr;
  }

  .merchant-agreement__actions {
    flex-direction: column;
  }
}
</style>
