<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DATA</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">Nama</label>
                                <input type="text" class="form-control" v-model="Home.nama" placeholder="Masukkan Nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="nik" class="font-weight-bold">NIK</label>
                                <input type="text" class="form-control" v-model="Home.nik" placeholder="Masukkan NIK">
                                <!-- validation -->
                                <div v-if="validation.nik" class="mt-2 alert alert-danger">
                                    {{ validation.nik[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="alamat" class="font-weight-bold">alamat</label>
                                <input type="text" class="form-control" v-model="Home.alamat" placeholder="Masukkan Alamat">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const Home = reactive({
            nama: '',
            nik: '',
            alamat: ''
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/home/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              Home.nama    = response.data.data.nama  
              Home.nik  = response.data.data.nik  
              Home.alamat  = response.data.data.alamat  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let nama   = Home.nama
            let nik = Home.nik
            let alamat = Home.alamat

            axios.put(`http://localhost:8000/api/home/${route.params.id}`, {
                nama: nama,
                nik: nik,
                alamat: alamat
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'home.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            Home,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>