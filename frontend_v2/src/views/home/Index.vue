<template>
    
    <div class="container mt-5">
        <div class="text-center">
            <h2 class="mb-4 text-center">Vue Toast Alert Notification Examples</h2>
            <button class="btn btn-primary me-3" @click="open">
                Show Notification
            </button>
            <button class="btn btn-danger me-3" @click="error">
                Show Error
            </button>
            <button class="btn btn-warning me-3" @click="warning">
                Show Warning
            </button>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA</h4>
                        <hr>
                        <router-link :to="{name: 'home.create'}" class="btn btn-md btn-success">Tambah</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">NIK</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(hom, index) in Home" :key="index">
                                    <td>{{ hom.nama }}</td>
                                    <td>{{ hom.nik }}</td>
                                    <td>{{ hom.alamat }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'home.edit', params:{id: hom.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="postDelete(hom.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification';

export default {


    setup() {

        let Home = ref([])
        const toast = useToast();

        onMounted(() => {

            axios.get('http://localhost:8000/api/home')
            .then(response => {
              
              Home.value = response.data.data
              
            }).catch(error => {
                console.log(error.response.data)
            })

        })

        function postDelete(id) {
            
            axios.delete(`http://localhost:8000/api/home/${id}`)
            .then(() => {
                
                const index = Home.value.findIndex(home => home.id === id);
                if (index !== -1) {
                    Home.value.splice(index, 1);
                    toast.success('Item berhasil dihapus');
                } else {
                    console.error('Data Tidak Ada!');
                }
         
             }).catch(error => {
                 console.log(error.response.data)
                 toast.error('Terjadi kesalahan saat menghapus item');
             })
         
         }

        //return
        return {
            Home,
            postDelete
        }

    },

    methods: {
        open() {
            this.$toast.open({
                message: "Good Morning! User",
                type: "success",
                duration: 1000 * 10,
                dismissible: true
            })
        },
        error() {
            this.$toast.error("Your have got the error.", {
                type: "error",
                duration: 1000 * 10,
                dismissible: true,
                position: 'top-right',
            })
        },
        warning() {
            this.$toast.warning("Account renewal date is near.", {
                type: "warning",
                duration: 1000 * 10,
                dismissible: true,
                position: 'bottom-left',
            })
        },
    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>