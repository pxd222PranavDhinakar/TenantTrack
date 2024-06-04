import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  state: {
    properties: [],
    tenants: []
  },
  mutations: {
    addProperty(state, property) {
      const newId = state.properties.length + 1;
      state.properties.push({ id: newId, address: property.address });
    },
    removeProperty(state, propertyId) {
      state.properties = state.properties.filter(property => property.id !== propertyId);
      state.tenants = state.tenants.filter(tenant => tenant.propertyId !== propertyId); // Also remove tenants of the deleted property
    },
    addTenant(state, tenant) {
      const newId = state.tenants.length + 1;
      state.tenants.push({
        id: newId,
        name: tenant.name,
        propertyId: tenant.propertyId,
        rent: parseInt(tenant.rent, 10), // Ensure rent is stored as an integer
        dueDate: tenant.dueDate,
        currentDue: parseInt(tenant.rent, 10), // Initialize current due with the rent amount
        payments: [],
        paymentStatus: 'Overdue'
      });
    },
    recordPayment(state, { tenantId, amount }) {
      const tenant = state.tenants.find(t => t.id === tenantId);
      if (tenant && amount > 0) {
        tenant.payments.push({
          amount,
          date: new Date().toISOString()
        });
        tenant.currentDue -= amount; // Subtract the payment from current due
        if (tenant.currentDue <= 0) {
          tenant.paymentStatus = 'Paid';
          let dueDate = new Date(tenant.dueDate);
          dueDate.setMonth(dueDate.getMonth() + 1); // Move to next month
          tenant.dueDate = dueDate.toISOString().split('T')[0];
          tenant.currentDue = tenant.rent; // Reset the due for next period
        } else {
          tenant.paymentStatus = 'Overdue';
        }
      }
    },
    removeTenant(state, tenantId) {
      state.tenants = state.tenants.filter(tenant => tenant.id !== tenantId);
    }
  },
  actions: {
    addProperty({ commit }, property) {
      commit('addProperty', property);
    },
    removeProperty({ commit }, propertyId) {
      commit('removeProperty', propertyId);
    },
    addTenant({ commit }, tenant) {
      if (!tenant.rent || isNaN(parseInt(tenant.rent, 10))) {
        alert('Rent must be a valid number');
        return; // Prevent adding tenant if rent is not a valid number
      }
      commit('addTenant', tenant);
    },
    recordPayment({ commit }, paymentDetails) {
      if (!paymentDetails.amount || isNaN(parseInt(paymentDetails.amount, 10))) {
        alert('Payment must be a valid number');
        return; // Validate payment amount
      }
      commit('recordPayment', paymentDetails);
    },
    removeTenant({ commit }, tenantId) {
      commit('removeTenant', tenantId);
    }
  },
  plugins: [vuexLocal.plugin]
});
