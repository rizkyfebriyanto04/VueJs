<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH DATA</h4>
                        <hr>

                        <form @submit.prevent="store">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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

        //method store
        function store() {

            let nama   = Home.nama
            let nik = Home.nik
            let alamat = Home.alamat

            axios.post('http://localhost:8000/api/home', {
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
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>