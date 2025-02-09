<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Tipo</v-label>
                        <VTextField  type="text" placeholder="tipo string" hide-details v-model='form.tipo' name="tipo"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Unidade de Medida</v-label>
                        <VTextField  type="number" placeholder="UnidadeDeMedida integer" hide-details v-model='form.unidadeDeMedida' name="UnidadeDeMedida"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">descricao</v-label>
                        <VTextField  type="text" placeholder="descricao string" hide-details v-model='form.descricao' name="descricao"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">quantidade</v-label>
                        <VTextField  type="number" placeholder="quantidade decimal" hide-details v-model='form.quantidade' name="quantidade"></VTextField>
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
import ItemService from '../../../services/requires/ItemRequires';

import dayjs from 'dayjs';


const { list, post, getById, update } = ItemService();
const route = useRoute();
const params = route.params;
const router = useRouter();


const form = reactive({
    id: '',
    tipo: '',
    unidadeDeMedida: '',
    descricao: '',
    quantidade: ''
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

            await update(form);
        } else {

            await post(form);
        }
        Swal.fire({
            title: "Salvo com sucesso!",
            icon: "success",
            confirmButtonColor: "#D3D3D3"
        }).then(()=>{
            router.push({ path: '/Item/IndexItem' });
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

const page = ref({ title: 'Cadastrar Item' });
const submitButtonText = ref('Cadastrar Item');

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Editar Item';
        breadcrumbs.value[1].text = page.value.title;
        submitButtonText.value = 'Editar Item';
    }



});

const breadcrumbs = ref([
    {
        text: 'Item',
        disabled: false,
        href: '/Item/IndexItem'
    },
    {
        text: page.value.title,
        disabled: true,
        href: '#'
    }
]);

const navigateBack = () => {
    router.push({ path: '/Item/IndexItem' });
};




</script>