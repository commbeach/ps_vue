<template>
<v-row justify="end" class="pa-3">
<v-btn color="error" class="ma-2" variant="outlined" @click="confirmDelete" name="DeleteButton">Excluir Equipamento</v-btn>
<v-btn color="primary" class="ma-2" @click="editaEquipamento(form.Id)" name="EditButton">Editar Equipamento</v-btn>
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
                        <v-label class="font-weight-medium mb-2">HorimetroOuOdometro</v-label>
                        <VTextField  type="number" placeholder="HorimetroOuOdometro integer" hide-details v-model='form.HorimetroOuOdometro' disabled name="HorimetroOuOdometro"></VTextField>
                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Modelo</v-label>
                                        <v-select :items="ModeloOptions" item-title="Id" item-value="Id" placeholder="Select Modelo" hide-details v-model="form.ModeloId" disabled name="Modelo"></v-select>
                                    </v-col>

                </v-row>
            </v-card-text>
        </v-card>
    </form>
    <!-- Diálogo de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir esta Equipamento?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deletaEquipamento" name="confirmDeleteButton">Confirmar</v-btn>
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
import EquipamentoService from '../../../services/requires/EquipamentoRequires';
import ModeloService from '../../../services/requires/ModeloRequires';

import dayjs from 'dayjs';

const { list: listModelo } = ModeloService();

const { list, remove, getById } = EquipamentoService();
const route = useRoute();
const params = route.params;
const router = useRouter();
const dialogDelete = ref(false);

const ModeloOptions = ref([]);

const form = reactive({
    id: '',
    Tipo: '',
    HorimetroOuOdometro: '',
    ModeloId: ''
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


const page = ref({ title: 'Detalhes Equipamento' });

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Detalhes Equipamento';
        breadcrumbs.value[1].text = page.value.title;
    }

    let response;

                    response = await listModelo();
                    ModeloOptions.value = response.value;

});

const breadcrumbs = ref([
    {
        text: 'Equipamento',
        disabled: false,
        href: '/Equipamento/IndexEquipamento'
    },
    {
        text: page.value.title,
        disabled: true,
        href: '#'
    }
]);

const navigateBack = () => {
    router.push({ path: '/Equipamento/IndexEquipamento' });
};

function editaEquipamento(id) {
    router.push({ path: `/Equipamento/formEquipamento/${id}` });
}

function confirmDelete() {
    dialogDelete.value = true;
}

const deletaEquipamento = async () => {
    try {
        await remove(form.Id);
        Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      router.push({ path: '/Equipamento/IndexEquipamento' });
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