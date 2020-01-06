<!-- eslint-disable -->
<template>
  <div>
    <v-app-bar app clipped-left color="primary" dark hide-on-scroll left>
      <v-toolbar-title>FAKTURA</v-toolbar-title>

      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="isSetting = !isSetting" icon v-on="on">
            <v-icon>settings</v-icon>
          </v-btn>
        </template>
        <span>{{'settings' | lang}}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="onThemeChange" class="yellow--text" icon v-on="on">
            <v-icon v-if="$vuetify.theme.dark">wb_sunny</v-icon>
            <v-icon v-else>brightness_3</v-icon>
          </v-btn>
        </template>
        <span v-if="$vuetify.theme.dark">{{'lightMode' | lang}}</span>
        <span v-else>{{'darkMode' | lang}}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="$router.push('/')" icon v-on="on">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>
        <span class="text_noWrap">{{'returnToLoginForm' | lang}}</span>
      </v-tooltip>
      <div class="pr-3"></div>
    </v-app-bar>

    <v-navigation-drawer fixed right temporary v-model="isSetting" width="400">
      <v-container>
        <div class="alignItems_center pt-1 px-3">
          <div class="text_noWrap pr-3 pb-2">{{'languageOfProgram' | lang}}</div>
          <v-select :items="langList" @change="onLangChanged" class="m-0 p-0" v-model="selectedLang" />
        </div>
        <v-divider />
      </v-container>
    </v-navigation-drawer>

    <v-navigation-drawer app clipped expand-on-hover fixed mini-variant-width="42" width="350">
      <template v-slot:prepend>
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon class="fs_45">account_circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="title">Turopov Nurpolat Ulug'bek o'g'li</v-list-item-title>
              <v-list-item-subtitle>turopoff.n@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group color="primary">
          <template v-for="(menu, key) in menus">
            <v-list-group :key="menu.key" :prepend-icon="menu.icon" no-action v-if="menu.children && menu.children.length">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{menu.title | lang}}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item :key="subMenu.title" :to="subMenu.url" v-for="subMenu in menu.children">
                <v-list-item-content>
                  <v-list-item-title>{{subMenu.title | lang}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item :key="key" :to="menu.url" v-else>
              <v-list-item-icon>
                <v-icon>{{menu.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{menu.title | lang}}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data: vm => ({
    isSetting: false,

    selectedLang: vm.$curentlang(),
    langList: [],

    menus: [
      {
        url: "/menu",
        icon: "home",
        title: "desktop"
      },
      {
        icon: "import_contacts",
        title: "createDocument",
        children: [
          // {
          //   url: "document",
          //   title: "document"
          // },
          {
            url: "documentInvoiceCreate",
            title: "invoice"
          }
        ]
      }
    ]
  }),

  created() {
    let isDark = this.$bStore.getLocal("$vuetify.theme.dark");
    this.$vuetify.theme.dark = isDark ? true : false;

    this.langList = Object.keys(this.ln.langList).map(x => ({
      text: this.ln.langList[x],
      value: x
    }));
  },

  methods: {
    onThemeChange() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$bStore.setLocal("$vuetify.theme.dark", this.$vuetify.theme.dark);
    },

    onLangChanged() {
      this.$store.dispatch("setIsLangChanging", true);
      localStorage.setItem("curLang", this.selectedLang);
      setTimeout(() => {
        this.$store.dispatch("setIsLangChanging", false);
      }, 1);
    }
  }
};
</script>

<style scoped>
.myContainer {
  padding-top: 61px;
}
</style>
