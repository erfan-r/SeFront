<template>
    <v-layout justify-center align-center>
        <v-flex md6 xs12 justify-center>
            <h1 class="text-xs-center mb-4">نوع فعالیت مورد نظر را انتخاب کنید</h1>
            <v-card>
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="type in getTypes" :key="type.id" @click="setType(type)">
                            <v-list-item-title v-text="type.name" class="text-xs-right"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    layout: 'login',
    data () {
      return {
      }
    },
    computed: {
      getTypes () {
        let types
        if (this.$auth.user.level === 2) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            }
          ]
        }
        if (this.$auth.user.level === 3) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            },
            {
              name: 'مدیر گروه',
              id: 4
            }
          ]
        }
        if (this.$auth.user.level === 4) {
          types = [
            {
              name: 'استاد راهنما',
              id: 2
            },
            {
              name: 'داور',
              id: 3
            },
            {
              name: 'مدیر گروه',
              id: 4
            },
            {
              name: 'شورای دانشکده',
              id: 5
            }
          ]
        }
        return types
      }
    },
    methods: {
    },
    created () {
    }
  }
</script>
