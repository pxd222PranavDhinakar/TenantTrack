<template>
  <div id="app">
    <header>
      <img alt="TenantTrack logo" src="./assets/logo.png" class="logo">
      <nav>
        <router-link to="/" class="nav-button">Tracker</router-link>
        <!-- Additional navigation buttons can be added here -->
      </nav>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #e8f0fe; /* Light jean blue background for the app */
  color: #001429; /* Updated to new dark blue */
  min-height: 100vh;
  padding: 20px;
}

header {
  display: flex;
  align-items: center;
  background: #001429; /* Updated to new dark blue for header */
  padding: 20px;
  border-radius: 0 0 10px 10px;
  color: white;
}

.logo {
  height: 60px; /* Adjustable logo size */
  margin-right: 20px;
}

nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.nav-button {
  text-decoration: none;
  color: white;
  background-color: #C4D4AF; /* Fern green for buttons */
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  font-weight: bold;
}

main {
  background-color: #f0f9ff; /* Very light blue for main content area */
  border-radius: 10px;
  padding: 20px;
}
</style>
