<template>
<v-row justify="end" class="pa-3">
<v-btn color="error" class="ma-2" variant="outlined" @click="confirmDelete" name="DeleteButton">Excluir Manutencao</v-btn>
<v-btn color="primary" class="ma-2" @click="editaManutencao(form.id)" name="EditButton">Editar Manutencao</v-btn>
</v-row>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >

                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Tipo</v-label>
                        <VTextField  type="text" placeholder="tipo string" hide-details v-model='form.tipo' disabled name="Tipo"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Recorrência</v-label>
                        <VTextField  type="number" placeholder="recorrencia integer" hide-details v-model='form.recorrencia' disabled name="Recorrencia"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Status</v-label>
                        <VTextField  type="text" placeholder="status string" hide-details v-model='form.status' disabled name="status"></VTextField>
                    </v-col>
                    <v-col cols="12">
                        <v-label class="font-weight-medium mb-2">Itens</v-label>
                        <VTextField  type="text" placeholder="status string" hide-details v-model='form.itens[0]["tipo"]' disabled name="status"></VTextField>
                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>
    </form>
    <!-- Diálogo de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir esta Manutencao?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deletaManutencao" name="confirmDeleteButton">Confirmar</v-btn>
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
import ManutencaoService from '../../../services/requires/ManutencaoRequires';

import dayjs from 'dayjs';


const { list, remove, getById } = ManutencaoService();
const route = useRoute();
const params = route.params;
const router = useRouter();
const dialogDelete = ref(false);


const form = reactive({
    id: '',
    tipo: '',
    recorrencia: '',
    status: '',
    itens:''
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
    console.log(id);
    try {
        let response = await getById(id);
        Object.assign(form, response);
        console.log(form);


    } catch (error) {
        console.error(error);
    }
};


const page = ref({ title: 'Detalhes Manutencao' });

onMounted(async () => {
    //console.log(params)
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Detalhes Manutencao';
        breadcrumbs.value[1].text = page.value.title;
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

function editaManutencao(id) {
    router.push({ path: `/Manutencao/formManutencao/${id}` });
}

function confirmDelete() {
    dialogDelete.value = true;
}

const deletaManutencao = async () => {
    try {
        await remove(form.id);
        Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      router.push({ path: '/Manutencao/IndexManutencao' });
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