<template>
  <div>
    <h1>Record list</h1>

    <table class="record-table">
      <thead>
        <tr>
          <th colspan="8">
            <div class="table-filter">
              <button @click="handleFilterRecords" :class="activeFilter === 'all' ? 'active-filter': ''" value="all">All records</button>
              <button @click="handleFilterRecords" :class="activeFilter === 'valid' ? 'active-filter': ''" value="valid">Valid records</button>
              <button @click="handleFilterRecords" :class="activeFilter === 'invalid' ? 'active-filter': ''" value="invalid">Invalid records</button>
            </div>
            <p>Number of records {{ filteredRecords.length }}</p>
          </th>
        </tr>
        <tr>
          <th>Reference</th>
          <th>Name</th>
          <th>Phone number</th>
          <th>Subscription</th>
          <th>Amount</th>
          <th>Discount</th>
          <th>Total amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredRecords" :key="item.record.key">
          <td>{{ item.record.reference }} <ErrorPopover v-if="item.isUniqueReference !== true" :message="item.isUniqueReference" /></td>
          <td>{{ item.record.name }}</td>
          <td>{{ item.record.phoneNumber }}</td>
          <td>{{ item.record.subscription }}</td>
          <td>€ {{ item.record.startAmount }} <ErrorPopover v-if="item.isValidStartAmount !== true" :message="item.isValidStartAmount" /></td>
          <td>{{ Number.isInteger(item.record.discount) ? '€ ' + item.record.discount : item.record.discount * 100 + '%' }} <ErrorPopover v-if="item.isValidDiscount !== true" :message="item.isValidDiscount" /></td>
          <td>€ {{ item.record.totalAmount }} <ErrorPopover v-if="item.isValidTotalAmount !== true" :message="item.isValidTotalAmount" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ErrorPopover from './ErrorPopover';

export default {
  name: "RecordTable",
  props: ["records"],
  components: {
      ErrorPopover,
  },
  data() {
    return {
      activeFilter: "all",
      filteredRecords: this.records,
    };
  },
  methods: {
    handleFilterRecords(e) {
      const filter = e.target.value;

      if (filter === "all") {
        this.activeFilter = "all";
        this.filteredRecords = this.records;
      }
      if (filter === "valid") {
        this.activeFilter = "valid";
        this.filteredRecords = this.records.filter(
          (item) =>
            item.isUniqueReference === true && item.isValidTotalAmount === true
        );
      }
      if (filter === "invalid") {
        this.activeFilter = "invalid";
        this.filteredRecords = this.records.filter(
          (item) =>
            item.isUniqueReference !== true || item.isValidTotalAmount !== true
        );
      }
    },
  },
};
</script>

<style scoped>
.record-table {
    border-collapse: collapse;
    font-family: Arial,sans-serif;
    color: #222;
    margin: 20px;
  }

  .table-filter {
    float: right;
  }
  
  thead {
    background: #f9fafb;
  }
  
  td, th {
    border: 1px solid #ddd;
    padding: 0.7rem;
    text-align: left;
  }
  
  button {
    background-color: #e0e1e2;
    border-radius: 4px;
    border: 0;
    margin: 10px;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }

  button.active-filter {
    color: #e0e1e2;
    background-color: #333;
  }
</style>