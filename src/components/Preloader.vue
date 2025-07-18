<template>
    <div class="pulse"></div>
</template>


<style>
.pulse {
   width: 22.4px;
   height: 22.4px;
   border-radius: 50%;
   background: #9ba6b2;
   box-shadow: 0 0 0 0 rgba(155,166,178,0.5);
   animation: pulse-kefe91md 2.0999999999999996s infinite linear;
   position: relative;
}

.pulse:before,
.pulse:after {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: inherit;
   box-shadow: 0 0 0 0 rgba(155,166,178,0.5);
   animation: inherit;
   animation-delay: -0.7s;
}

.pulse:after {
   animation-delay: -1.4s;
}

@keyframes pulse-kefe91md {
   100% {
      box-shadow: 0 0 0 44.8px #0000;
   }
}
</style>