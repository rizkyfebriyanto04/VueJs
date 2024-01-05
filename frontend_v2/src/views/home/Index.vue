<template>
    <div class="container mt-5">
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

export default {

    setup() {

        //reactive state
        let Home = ref([])

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/home')
            .then(response => {
              
              //assign state posts with response data
              Home.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        function postDelete(id) {
            
            //delete data post by ID
            axios.delete(`http://localhost:8000/api/home/${id}`)
            .then(() => {
                
                const index = Home.value.findIndex(home => home.id === id);
                if (index !== -1) {
                    // Splice the post using the found index
                    Home.value.splice(index, 1);
                } else {
                    console.error('Data Tidak Ada!');
                }
         
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

        //return
        return {
            Home,
            postDelete
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>