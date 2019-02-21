<template>
  <nav class="navbar is-fixed-top has-background-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-white">
        <strong>SensorTag UI</strong>
      </router-link>
    </div>

    <!--   <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div> -->

    <div class="navbar-menu">

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/calibrate" class="button is-light">
              <strong>Calibrate</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>

export default {
  name: 'nav-bar',
  components: {
  }
}
</script>

<style>
 .navbar-menu a.navbar-item.has-text-white:hover {
  color: #000 !important;;
} 
</style>
