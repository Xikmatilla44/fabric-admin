<template>
  <v-app id="inspire">
    <v-navigation-drawer  v-model="drawer"  :clipped="$vuetify.breakpoint.lgAndUp" app >

      
      <v-btn min-width="200" @click="showAddInvoice()" class="nounderline mt-4 ml-5 font-weight-light" tile  color="info">Счет-фактура</v-btn>       
      <v-btn min-width="200" @click="showAddAct()" class="nounderline mt-4 ml-5 font-weight-light" tile  color="success">Акт</v-btn>       
       <!-- <v-btn min-width="200" to="/invoice"  class="mt-4 ml-5 font-weight-light" tile outlined color="success">
         <v-icon>mdi-plus</v-icon>
          Счет-фактура
        </v-btn>       -->
        <!-- <v-btn  min-width="200" to="/act"  class="mt-4 ml-5 font-weight-light" tile outlined color="indigo">
         <v-icon >mdi-plus</v-icon>
          Акт
        </v-btn>        -->
        

        <v-divider/>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading"   :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading"> {{ item.heading }} </v-subheader>
            </v-col>
            <!-- <v-col cols="6" class="text-center" >
              <a href="#!" class="body-2 black--text" >EDIT</a>
            </v-col> -->
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-light">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      
      
    <!-- <v-btn class="ma-2" outlined large fab color="indigo">
      <v-icon>mdi-pencil</v-icon>
    </v-btn> -->
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app  color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down font-weight-light">Фактура</span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-email-search-outline"
        label="Поиск документов..."
        class="hidden-lg-and-down"
      /> -->
      <!-- <v-spacer />
      <v-spacer /> -->
      <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Поиск документов..."
          single-line                    
          clearable
          append-icon="mdi-email-search-outline"
          color="white"          
          hide-details
          class="font-weight-light"
        />
        <v-spacer />
      <v-btn icon>
        <v-icon>mdi-web</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-message-outline</v-icon>
      </v-btn>      
      <v-btn icon to="/login">
        <v-icon>mdi-exit-to-app</v-icon>        
      </v-btn>            
    </v-app-bar>        
    <v-content >    
        <router-view></router-view>    
    </v-content>
  </v-app>
</template>

<script>
  import { router } from '../_helpers';
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'mdi-tablet-dashboard', text: 'Рабочий стол' },
        { icon: 'mdi-file-document-edit-outline', text: 'Договара' },
        { icon: 'mdi-email-receive-outline', text: 'Входящие' },
        { icon: 'mdi-email-send-outline', text: 'Отправленные' },
        { icon: 'mdi-file', text: 'Черновик' }       
      ],
    }),
    methods:{
         showAddInvoice() {
           router.push('/invoice');
         },
         showAddAct() {
           router.push('/act');
         },
    }
  }
</script>