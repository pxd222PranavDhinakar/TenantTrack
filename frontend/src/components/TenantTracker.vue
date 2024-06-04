<template>
  <div>
    <h2>Property and Tenant Management</h2>
    <!-- Property Management Section -->
    <div>
      <h3>Add a New Property</h3>
      <input v-model="newProperty.address" placeholder="Address">
      <button @click="addNewProperty">Add Property</button>
    </div>

    <!-- List of Properties -->
    <div>
      <h3>Current Properties</h3>
      <ul>
        <li v-for="property in properties" :key="property.id">
          {{ property.address }}
          <button @click="removeProperty(property.id)">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Tenant Management Section -->
    <div>
      <h3>Add a New Tenant</h3>
      <input v-model="newTenant.name" placeholder="Tenant Name">
      <select v-model="newTenant.propertyId">
        <option disabled value="">Please select a property</option>
        <option v-for="property in properties" :key="property.id" :value="property.id">
          {{ property.address }}
        </option>
      </select>
      <input v-model="newTenant.rent" placeholder="Monthly Rent">
      <input type="date" v-model="newTenant.dueDate" placeholder="Rent Due Date">
      <button @click="addNewTenant">Add Tenant</button>
    </div>

    <!-- List of Tenants -->
    <div>
      <h3>Current Tenants</h3>
      <ul>
      <li v-for="tenant in tenants" :key="tenant.id">
        {{ tenant.name }} - Rent: ${{ tenant.rent }} - Property: {{ findPropertyAddress(tenant.propertyId) }}
        - Next Due Date: {{ tenant.dueDate }} - Current Due: ${{ tenant.currentDue }}
        - Status: <span :class="{'paid-status': tenant.paymentStatus === 'Paid', 'overdue-status': tenant.paymentStatus === 'Overdue'}">{{ tenant.paymentStatus }}</span>
        <div>
          <input type="number" v-model.number="paymentAmount" placeholder="Enter payment amount">
          <button @click="recordPayment(tenant.id, paymentAmount)">Record Payment</button>
          <div v-if="tenant.payments.length">
            <h4>Payment History:</h4>
            <ul>
              <li v-for="payment in tenant.payments" :key="payment.date">
                Amount: ${{ payment.amount }} - Date: {{ payment.date }}
              </li>
              </ul>
            </div>
          </div>
          <button @click="removeTenant(tenant.id)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newProperty: {
        address: ''
      },
      newTenant: {
        name: '',
        propertyId: '',
        rent: '',
        dueDate: ''
      },
      paymentAmount: 0
    };
  },
  computed: {
    ...mapState(['properties', 'tenants'])
  },
  methods: {
    addNewProperty() {
      this.$store.dispatch('addProperty', { ...this.newProperty });
      this.newProperty.address = '';
    },
    removeProperty(id) {
      this.$store.dispatch('removeProperty', id);
    },
    addNewTenant() {
      if (!this.newTenant.propertyId) {
        alert('Please select a property for the tenant.');
        return;
      }
      this.$store.dispatch('addTenant', { ...this.newTenant });
      this.newTenant.name = '';
      this.newTenant.propertyId = '';
      this.newTenant.rent = '';
      this.newTenant.dueDate = '';
    },
    recordPayment(tenantId, amount) {
      if (!amount || amount <= 0) {
        alert('Enter a valid payment amount');
        return;
      }
      this.$store.dispatch('recordPayment', {
        tenantId,
        amount
      });
      this.paymentAmount = 0; // Reset payment amount field after recording
    },
    removeTenant(id) {
      this.$store.dispatch('removeTenant', id);
    },
    findPropertyAddress(propertyId) {
      const property = this.properties.find(p => p.id === propertyId);
      return property ? property.address : 'No address found';
    }
  }
}
</script>




<style scoped>
/* Base styling for consistency */
* {
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
}

/* Main container styling */
div {
  margin-bottom: 20px;
}

/* Main titles styling */
h2, h3 {
  color: #001429; /* Updated to new dark blue */
  padding: 10px 0;
}

/* Form elements styling */
input, select, button {
  padding: 10px;
  margin: 5px 0;
  border-radius: 8px;
  border: 1px solid #001429; /* Updated to new dark blue */
  background-color: white; /* White background for inputs and buttons */
}

/* Button specific styling */
button {
  background-color: #001429; /* Updated to new dark blue */
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #000a1a; /* Slightly darker shade for hover effect */
}

/* List styling */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 8px;
  background-color: #f0f9ff; /* Very light blue for list items */
  border-radius: 5px;
  border: 1px solid #001429; /* Updated to new dark blue */
}

.paid-status {
  color: green;
}

.overdue-status {
  color: red;
}
</style>
