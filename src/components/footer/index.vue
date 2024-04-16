<template>
  <div class="footer">
    <div class="footer-center">
      <el-affix position="bottom">
        <MoocSidebar />
      </el-affix>
      <!-- 底部链接 -->
      <ul class="footer-link">
        <li
          v-for="(item, index) in linkList"
          :key="index"
          class="footer-link-item"
        >
          <router-link
            :to="item.url"
            :target="item.target"
            :title="item.title"
            class="footer-link-item-link"
          >{{item.title}}</router-link>
        </li>
      </ul>

      <!-- 底部版权 -->
      <p class="footer-copyright">
        <span>© 2024 ke.video 京ICP备05035325号-7 </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #333; /* Background color for the footer */
}

.footer-center {
  width: 100%; /* Ensure the footer-center takes full width */
  display: flex; /* Use flexbox to align items */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  flex-direction: column; /* Align items vertically */
}

.el-affix {
  width: 100%; /* Make the sidebar fill the entire width */
  background-color: #73767a; /* Background color for the sidebar */
}

.footer-link {
  list-style: none; /* Remove default list styles */
  padding: 0; /* Remove default padding */
  margin: 5px 0; /* Add a small margin */
  display: flex; /* Use flexbox to align items */
}

.footer-link-item {
  margin-right: 20px; /* Add space between list items */
}

.footer-link-item-link {
  color: #ccc; /* Text color for the links */
  text-decoration: none; /* Remove default underline for links */
}

.footer-link-item-link:hover {
  text-decoration: underline; /* Underline links on hover */
}

.footer-copyright {
  font-size: 14px; /* Adjust font size for copyright */
  color: #ccc;
}
</style>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { getFooterLink } from '@/api/common'
import { FooterLinkConfig } from '@/types'
import { ERR_OK } from '@/api/config'
import MoocSidebar from '@/components/sidebar/index.vue'

export default defineComponent({
  name: 'Footer',
  components: { MoocSidebar },
  setup () {
    const linkList = ref<FooterLinkConfig[]>([])
    onBeforeMount(async () => {
      const { code, data } = await getFooterLink()
      if (code === ERR_OK && data) {
        linkList.value = data
      }
    })
    return { linkList }
  }
})
</script>
