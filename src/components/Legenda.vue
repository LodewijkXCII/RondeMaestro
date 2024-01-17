<template>
  <div class="legenda">
    <p>Dit betekenen de kleuren vóór de tabel rij:</p>
    <ul class="legenda-colors">
      <li class="accent">Rit is gereden en uitslag is bekend</li>
      <li class="accent-green">
        Rit is onderweg of gereden, de uitslag is nog niet bekend. Je kan niet
        meer invullen
      </li>
      <li class="secondary">Je kan je team nog invullen voor deze rit</li>
    </ul>
  </div>
</template>

<style>
.legenda-colors {
  list-style-type: none;
  position: relative;
}

.legenda-colors li::before {
  content: "";
  width: 12px;
  height: 20px;
  position: absolute;
  left: 0;
}
</style>
