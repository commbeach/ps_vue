<template>
<v-row justify="end" class="pa-3">
<v-btn color="error" class="ma-2" variant="outlined" @click="confirmDelete" name="DeleteButton">Excluir Item</v-btn>
<v-btn color="primary" class="ma-2" @click="editaItem(form.Id)" name="EditButton">Editar Item</v-btn>
</v-row>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">tipo</v-label>
                        <VTextField  type="text" placeholder="tipo string" hide-details v-model='form.Tipo' disabled name="Tipo"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">UnidadeDeMedida</v-label>
                        <VTextField  type="number" placeholder="UnidadeDeMedida integer" hide-details v-model='form.UnidadeDeMedida' disabled name="UnidadeDeMedida"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">descricao</v-label>
                        <VTextField  type="text" placeholder="descricao string" hide-details v-model='form.Descricao' disabled name="Descricao"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">quantidade</v-label>
                        <VTextField  type="number" placeholder="quantidade decimal" hide-details v-model='form.Quantidade' disabled name="Quantidade"></VTextField>
                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>
    </form>
    <!-- Diálogo de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir esta Item?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deletaItem" name="confirmDeleteButton">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ItemService from '../../../services/requires/ItemRequires';

import dayjs from 'dayjs';


const { list, remove, getById } = ItemService();
const route = useRoute();
const params = route.params;
const router = useRouter();
const dialogDelete = ref(false);


const form = reactive({
    id: '',
    Tipo: '',
    UnidadeDeMedida: '',
    Descricao: '',
    Quantidade: ''
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


const page = ref({ title: 'Detalhes Item' });

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Detalhes Item';
        breadcrumbs.value[1].text = page.value.title;
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

function editaItem(id) {
    router.push({ path: `/Item/formItem/${id}` });
}

function confirmDelete() {
    dialogDelete.value = true;
}

const deletaItem = async () => {
    try {
        await remove(form.Id);
        Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      router.push({ path: '/Item/IndexItem' });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar!",
        text: "Não foi possível apagar."
      });
    } finally {
        dialogDelete.value = false;
    }
};




</script>