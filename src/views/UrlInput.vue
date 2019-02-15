<template>
  <el-row>
    <Rbreadcrumb></Rbreadcrumb>
    <el-row>
      <RurlInput v-model="test" placeholder="请输入监控链地址"></RurlInput>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "UrlInput",
  data() {
    return {
      test:
        "https://www.baidu.com/s?wd=Vue.%24watch&rsv_spt=1&rsv_iqid=0xb21b2b370003f058&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=12&rsv_sug1=7&rsv_sug7=101&rsv_sug2=0&inputT=3336&rsv_sug4=3336"
    };
  }
};
</script>
