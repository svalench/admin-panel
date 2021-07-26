<template>
<div>
<table-charactiristic-product></table-charactiristic-product>
</div>
</template>

<script>
import tableCharactiristicProduct from "~/components/tableCharactiristicProduct";


export default {
  middleware: 'auth',
  name: "characteristics",
  components:{
    tableCharactiristicProduct
  },
}
</script>

<style scoped>

</style>
