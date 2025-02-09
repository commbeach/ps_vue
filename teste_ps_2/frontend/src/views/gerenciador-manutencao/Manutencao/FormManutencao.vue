<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">ID Item</v-label>
                        <VTextField  type="number" placeholder="recorrencia integer" hide-details v-model='form.idItem' name="recorrencia"></VTextField>
                    </v-col>
                  
                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn type="button" color="primary" variant="outlined" class="mr-3" @click='navigateBack' name="NavBackButton">Voltar</v-btn>
                        <v-btn type="submit" color="primary" flat name="SubmitButton">{{ submitButtonText }}</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </form>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ManutencaoService from '../../../services/requires/ManutencaoRequires';

import dayjs from 'dayjs';


const { list, post, getById, update, addItem } = ManutencaoService();
const route = useRoute();
const params = route.params;
const router = useRouter();


const form = reactive({
    id: '',
    idItem: ''
});


const verificaArrayParams = () => {
    if (typeof params.id === 'string') {
        return params.id;
    } else if (Array.isArray(params.id)) {
        return params.id[0];
    }
    return '';
};

const getPost = async (id: any) => {
    try {
        let response = await getById(id);
        Object.assign(form, response.value[0]);


    } catch (error) {
        console.error(error);
    }
};

const onSubmit = async () => {
    try {
        if (params.id) {

            form.id = verificaArrayParams()

            await addItem(form.id,form.idItem);
        } else {

            await addItem(form.id,form.idItem);
        }
        Swal.fire({
            title: "Salvo com sucesso!",
            icon: "success",
            confirmButtonColor: "#D3D3D3"
        }).then(()=>{
            router.push({ path: '/Manutencao/IndexManutencao' });
        }
        );

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro ao salvar!",
            confirmButtonColor: "#D3D3D3"
        });
    }
};

const page = ref({ title: 'Adicionar Item' });
const submitButtonText = ref('Adicionar Item');

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Adicionar Item';
        breadcrumbs.value[1].text = page.value.title;
        submitButtonText.value = 'Adicionar Item';
    }



});

const breadcrumbs = ref([
    {
        text: 'Manutencao',
        disabled: false,
        href: '/Manutencao/IndexManutencao'
    },
    {
        text: page.value.title,
        disabled: true,
        href: '#'
    }
]);

const navigateBack = () => {
    router.push({ path: '/Manutencao/IndexManutencao' });
};




</script>